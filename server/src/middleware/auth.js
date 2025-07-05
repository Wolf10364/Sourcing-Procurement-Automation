const jwt = require('jsonwebtoken');

/**
 * @desc    Verify JWT token and protect routes
 * @access  Private
 */
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Add user info to request
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication.'
    });
  }
};

/**
 * @desc    Verify admin role
 * @access  Private/Admin
 */
const admin = async (req, res, next) => {
  try {
    // First verify authentication
    await auth(req, res, () => {});

    // Check if user has admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in admin verification.'
    });
  }
};

/**
 * @desc    Verify specific account type
 * @access  Private
 */
const requireAccountType = (allowedTypes) => {
  return async (req, res, next) => {
    try {
      // First verify authentication
      await auth(req, res, () => {});

      // Check if user has required account type
      if (!allowedTypes.includes(req.user.accountType)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required account types: ${allowedTypes.join(', ')}`
        });
      }

      next();
    } catch (error) {
      console.error('Account type middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error in account type verification.'
      });
    }
  };
};

/**
 * @desc    Optional authentication (doesn't fail if no token)
 * @access  Optional
 */
const optionalAuth = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token provided, continue without authentication
      req.user = null;
      return next();
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.substring(7);

    if (!token) {
      // No token provided, continue without authentication
      req.user = null;
      return next();
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Add user info to request
      req.user = decoded;
      next();
    } catch (error) {
      // Invalid token, continue without authentication
      req.user = null;
      next();
    }

  } catch (error) {
    console.error('Optional auth middleware error:', error);
    // Continue without authentication on error
    req.user = null;
    next();
  }
};

/**
 * @desc    Rate limiting middleware
 * @access  Public
 */
const rateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old requests
    if (requests.has(ip)) {
      requests.set(ip, requests.get(ip).filter(timestamp => timestamp > windowStart));
    } else {
      requests.set(ip, []);
    }

    const userRequests = requests.get(ip);

    if (userRequests.length >= max) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }

    userRequests.push(now);
    next();
  };
};

module.exports = {
  auth,
  admin,
  requireAccountType,
  optionalAuth,
  rateLimit
}; 