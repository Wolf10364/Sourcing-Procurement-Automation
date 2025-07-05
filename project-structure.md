# Project Structure - LogiConnect Platform

## 📁 Root Directory Structure

```
logiconnect-platform/
├── 📁 server/                 # Backend API (Node.js + Express)
├── 📁 client/                 # Web Application (React + TypeScript)
├── 📁 mobile/                 # Mobile Apps (React Native)
├── 📁 shared/                 # Shared utilities and types
├── 📁 docs/                   # Documentation
├── 📁 scripts/                # Build and deployment scripts
├── 📁 tests/                  # End-to-end tests
├── 📄 package.json            # Root package.json
├── 📄 README.md               # Project overview
├── 📄 AGILE_TASKS.md          # Agile development tasks
└── 📄 .gitignore              # Git ignore rules
```

## 🖥️ Server Structure (Backend)

```
server/
├── 📁 src/
│   ├── 📁 controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── userController.js
│   │   ├── vehicleController.js
│   │   ├── paymentController.js
│   │   └── analyticsController.js
│   ├── 📁 models/             # Database models
│   │   ├── User.js
│   │   ├── Booking.js
│   │   ├── Vehicle.js
│   │   ├── Payment.js
│   │   └── Analytics.js
│   ├── 📁 routes/             # API routes
│   │   ├── auth.js
│   │   ├── bookings.js
│   │   ├── users.js
│   │   ├── vehicles.js
│   │   ├── payments.js
│   │   └── analytics.js
│   ├── 📁 middleware/         # Custom middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   ├── 📁 services/           # Business logic
│   │   ├── matchingService.js
│   │   ├── paymentService.js
│   │   ├── notificationService.js
│   │   ├── trackingService.js
│   │   └── analyticsService.js
│   ├── 📁 utils/              # Utility functions
│   │   ├── database.js
│   │   ├── logger.js
│   │   ├── email.js
│   │   └── helpers.js
│   ├── 📁 config/             # Configuration files
│   │   ├── database.js
│   │   ├── redis.js
│   │   ├── stripe.js
│   │   └── environment.js
│   └── 📁 websocket/          # Real-time features
│       ├── socketServer.js
│       └── eventHandlers.js
├── 📁 migrations/             # Database migrations
├── 📁 seeds/                  # Database seed data
├── 📁 tests/                  # Backend tests
├── 📄 package.json
├── 📄 server.js
└── 📄 .env.example
```

## 🌐 Client Structure (Web Application)

```
client/
├── 📁 public/
│   ├── 📄 index.html
│   ├── 📄 favicon.ico
│   └── 📁 assets/
├── 📁 src/
│   ├── 📁 components/         # Reusable components
│   │   ├── 📁 common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Loading.tsx
│   │   ├── 📁 layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── 📁 forms/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegistrationForm.tsx
│   │   │   └── BookingForm.tsx
│   │   └── 📁 dashboard/
│   │       ├── BookingCard.tsx
│   │       ├── VehicleCard.tsx
│   │       └── AnalyticsCard.tsx
│   ├── 📁 pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Bookings.tsx
│   │   ├── Vehicles.tsx
│   │   ├── Analytics.tsx
│   │   └── Profile.tsx
│   ├── 📁 hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useBookings.ts
│   │   ├── useVehicles.ts
│   │   └── useWebSocket.ts
│   ├── 📁 services/           # API services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── bookingService.ts
│   │   ├── vehicleService.ts
│   │   └── paymentService.ts
│   ├── 📁 store/              # State management
│   │   ├── index.ts
│   │   ├── authSlice.ts
│   │   ├── bookingSlice.ts
│   │   └── vehicleSlice.ts
│   ├── 📁 utils/              # Utility functions
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── validation.ts
│   ├── 📁 types/              # TypeScript types
│   │   ├── user.ts
│   │   ├── booking.ts
│   │   ├── vehicle.ts
│   │   └── payment.ts
│   ├── 📁 styles/             # Styling
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── components.css
│   ├── 📄 App.tsx
│   ├── 📄 index.tsx
│   └── 📄 setupTests.ts
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 .env.example
```

## 📱 Mobile Structure (React Native)

```
mobile/
├── 📁 android/                # Android specific files
├── 📁 ios/                    # iOS specific files
├── 📁 src/
│   ├── 📁 components/         # Mobile components
│   │   ├── 📁 common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Loading.tsx
│   │   ├── 📁 screens/
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── BookingScreen.tsx
│   │   │   ├── TrackingScreen.tsx
│   │   │   └── ProfileScreen.tsx
│   │   └── 📁 navigation/
│   │       ├── AppNavigator.tsx
│   │       ├── AuthNavigator.tsx
│   │       └── TabNavigator.tsx
│   ├── 📁 services/           # Mobile services
│   │   ├── api.ts
│   │   ├── location.ts
│   │   ├── notifications.ts
│   │   └── storage.ts
│   ├── 📁 hooks/              # Mobile hooks
│   │   ├── useLocation.ts
│   │   ├── useNotifications.ts
│   │   └── useOffline.ts
│   ├── 📁 utils/              # Mobile utilities
│   │   ├── permissions.ts
│   │   ├── location.ts
│   │   └── navigation.ts
│   ├── 📁 types/              # Mobile types
│   │   ├── navigation.ts
│   │   └── location.ts
│   └── 📄 App.tsx
├── 📄 package.json
├── 📄 metro.config.js
└── 📄 .env.example
```

## 🔧 Shared Structure

```
shared/
├── 📁 types/                  # Shared TypeScript types
│   ├── user.ts
│   ├── booking.ts
│   ├── vehicle.ts
│   └── payment.ts
├── 📁 utils/                  # Shared utilities
│   ├── validation.ts
│   ├── constants.ts
│   └── helpers.ts
└── 📁 config/                 # Shared configuration
    ├── api.ts
    └── constants.ts
```

## 📚 Documentation Structure

```
docs/
├── 📁 api/                    # API documentation
│   ├── authentication.md
│   ├── bookings.md
│   ├── vehicles.md
│   └── payments.md
├── 📁 deployment/             # Deployment guides
│   ├── production.md
│   ├── staging.md
│   └── docker.md
├── 📁 development/            # Development guides
│   ├── setup.md
│   ├── contributing.md
│   └── testing.md
└── 📁 architecture/           # Architecture documents
    ├── system-design.md
    ├── database-schema.md
    └── api-design.md
```

## 🧪 Testing Structure

```
tests/
├── 📁 e2e/                    # End-to-end tests
│   ├── booking-flow.spec.ts
│   ├── payment-flow.spec.ts
│   └── user-registration.spec.ts
├── 📁 integration/            # Integration tests
│   ├── api-tests/
│   └── database-tests/
└── 📁 performance/            # Performance tests
    ├── load-tests/
    └── stress-tests/
```

## 🚀 Scripts Structure

```
scripts/
├── 📁 build/                  # Build scripts
│   ├── build-web.sh
│   ├── build-mobile.sh
│   └── build-all.sh
├── 📁 deploy/                 # Deployment scripts
│   ├── deploy-production.sh
│   ├── deploy-staging.sh
│   └── rollback.sh
└── 📁 database/               # Database scripts
    ├── setup-db.sh
    ├── migrate.sh
    └── seed.sh
```

## 📋 Key Files to Create

### Sprint 1 Priority Files:
1. **TASK-001**: `.gitignore` - Git ignore rules
2. **TASK-002**: `server/package.json` - Backend dependencies
3. **TASK-003**: `client/package.json` - Frontend dependencies
4. **TASK-004**: `mobile/package.json` - Mobile dependencies
5. **TASK-005**: `server/src/config/database.js` - Database configuration
6. **TASK-006**: `server/src/models/` - Database models
7. **TASK-007**: `client/src/components/` - Basic UI components
8. **TASK-008**: `docs/api/` - API documentation structure

### Environment Files:
- `server/.env.example`
- `client/.env.example`
- `mobile/.env.example`

### Configuration Files:
- `server/tsconfig.json`
- `client/tsconfig.json`
- `mobile/tsconfig.json`
- `server/.eslintrc.js`
- `client/.eslintrc.js`
- `mobile/.eslintrc.js`

## 🎯 Development Workflow

1. **Feature Development**: Create feature branches from `develop`
2. **Code Review**: All changes require pull request review
3. **Testing**: Unit, integration, and e2e tests required
4. **Deployment**: Automated deployment to staging/production
5. **Monitoring**: Real-time monitoring and logging

## 📊 Database Schema Overview

### Core Tables:
- `users` - User accounts and profiles
- `vehicles` - Vehicle information and availability
- `bookings` - Logistics bookings and status
- `payments` - Payment transactions and history
- `analytics` - Platform analytics and metrics

### Relationship Tables:
- `user_vehicles` - User-vehicle relationships
- `booking_vehicles` - Booking-vehicle assignments
- `user_roles` - User role assignments

This structure follows Agile methodology and provides a scalable foundation for the logistics platform. 