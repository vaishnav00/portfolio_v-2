# Interactive Personal Portfolio with Games

## Overview

This is a modern, single-page personal portfolio website built with React and TypeScript. The application features advanced animations, interactive elements, and embedded mini-games. The project uses a full-stack architecture with Express.js backend, Vite for frontend tooling, and is designed for deployment on platforms like Replit.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### Enhanced Space Theme Animation System (July 25, 2025)
- Applied seamless black space theme across all sections without visible borders
- Dramatically expanded animated background with comprehensive space elements:
  - Shooting stars with realistic trails and glow effects
  - Comet formations with dynamic head and tail animations
  - Nebula clouds with color-shifting gradients
  - Twinkling star field with varied opacity and scale
  - Asteroid belt with irregular shapes and orbital motion
  - Solar flares with organic flame-like movement
  - Energy waves radiating from center points
  - Floating debris with random movement patterns
  - Plasma bursts with colorful gradient explosions
  - Meteor showers with authentic trail effects
  - Mini galaxy spirals with rotating arms
  - Cosmic dust clouds with subtle drift animation
  - Pulsating black holes with event horizons and accretion disks
- Optimized particle counts and timing for immersive experience
- Maintained consistent animations across all portfolio sections

### Unicorn Studio Integration
- Embedded 3D animation from Unicorn Studio (Project ID: fcvCpXXYd1Gs62j0K6IQ)
- Used exact dimensions (1440px x 900px) for optimal display
- Integrated seamlessly with enhanced space background animations

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for smooth animations and scroll-triggered effects
- **State Management**: TanStack Query for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL storage

### Development Setup
- **Hot Reload**: Vite dev server with HMR
- **Development Database**: Uses environment variables for database connection
- **Build Process**: TypeScript compilation with esbuild for production

## Key Components

### Frontend Components
1. **Hero Section**: Interactive animation using Unicorn Studio embed
2. **Portfolio Sections**: About, Projects, Skills, and Contact with scroll animations
3. **Interactive Games**: 
   - Tic-Tac-Toe with clean, minimalist design
   - Snake game with Tron-like aesthetic and canvas rendering
4. **UI Components**: Comprehensive set of accessible components from Shadcn/ui
5. **Particle Background**: Custom canvas-based animated background

### Backend Components
1. **Express Server**: Main application server with middleware setup
2. **Route Handler**: Centralized route registration system
3. **Storage Interface**: Abstracted storage layer supporting both memory and database storage
4. **Database Schema**: User management schema with Drizzle ORM

### Styling System
- **Dark Theme**: Deep charcoal background with electric blue accent colors
- **Typography**: Clean, modern sans-serif fonts
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animation Library**: Framer Motion for component and scroll animations

## Data Flow

1. **Client Requests**: React Router handles client-side navigation
2. **API Communication**: TanStack Query manages server state and caching
3. **Database Operations**: Drizzle ORM provides type-safe database queries
4. **Session Management**: Express sessions stored in PostgreSQL
5. **Real-time Updates**: HMR during development for instant feedback

## External Dependencies

### Core Technologies
- **React Ecosystem**: React, React DOM, TanStack Query
- **Backend**: Express.js, Drizzle ORM, PostgreSQL drivers
- **Build Tools**: Vite, esbuild, TypeScript
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer

### UI and Animation Libraries
- **Component Library**: Radix UI primitives with Shadcn/ui styling
- **Animation**: Framer Motion for advanced animations
- **Icons**: Lucide React for consistent iconography
- **Form Handling**: React Hook Form with Zod validation

### External Services
- **Database**: Neon Database (serverless PostgreSQL)
- **Animation Platform**: Unicorn Studio for hero section animation
- **Development Platform**: Replit with specialized plugins

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild compiles server code to `dist/index.js`
- **Database**: Drizzle migrations handle schema updates

### Environment Configuration
- **Development**: Uses local Vite dev server with Express API
- **Production**: Serves static files from Express with API routes
- **Database**: Environment variable-based configuration for connection strings

### Platform-Specific Features
- **Replit Integration**: Special plugins for development environment
- **Error Handling**: Runtime error overlay in development
- **Hot Reload**: Full-stack hot reload with Vite middleware

The application follows modern web development practices with a focus on performance, accessibility, and developer experience. The modular architecture allows for easy extension and maintenance while providing a smooth user experience across devices.