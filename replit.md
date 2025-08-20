# Interactive Personal Portfolio with Games

## Overview

This is a modern, single-page personal portfolio website built with React and TypeScript. The application features advanced animations, interactive elements, and embedded mini-games. The project uses a full-stack architecture with Express.js backend, Vite for frontend tooling, and is designed for deployment on platforms like Replit.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### Contact Message System with Google Sheets Integration (July 30, 2025)
- Implemented complete contact form backend with database storage
- Created contact_messages table for persistent message storage
- Added API endpoints: POST /api/contact (submit) and GET /api/contact (retrieve)
- Built dedicated /messages page for viewing all contact submissions
- Contact form now saves real data instead of showing alerts
- Messages include name, email, message content, and timestamp
- Added SendGrid email notifications: automatic emails sent to vaishnavchandran00@gmail.com when someone contacts through portfolio
- Email includes sender details, message content, timestamp, and link to view all messages
- Integrated Google Sheets API with dual-tab functionality:
  - "Contact Form Submissions" tab: automatic logging of all contact form data
  - "Dino Game Leaderboard" tab: automatic logging of all game scores
- Created GOOGLE_SHEETS_SETUP.md with detailed configuration instructions
- System gracefully handles missing Google Sheets credentials with fallback to database-only storage
- Both contact submissions and dino game scores sync to Google Sheets in real-time

### Social Media Integration (July 30, 2025)
- Added authentic social media links: LinkedIn, GitHub, and Twitter
- Links appear in both About section and footer with hover animations
- All links open in new tabs with proper security attributes
- URLs: LinkedIn (vaishnav-s-chandran-374b241bb), GitHub (vaishnav00), Twitter (vaishnav_vsc)

### Google Dino Game with Leaderboard (July 25, 2025)
- Replaced Snake game with Google Dino game featuring authentic jump mechanics
- Implemented PostgreSQL database with dino_scores table for persistent leaderboard
- Created complete API endpoints for score submission and retrieval
- Added player name input system for leaderboard entries
- Designed minimal animated dino icon trigger (no container box)
- Game includes collision detection, scoring system, and real-time leaderboard display

### Clean WebGL Aesthetic Design (July 25, 2025)
- Removed all complex space animations (comets, asteroids, nebula) for minimal design
- Applied matte black background with subtle geometric WebGL-style animations
- Maintained clean white/gray accent colors throughout portfolio
- Streamlined particle system for optimal performance and visual clarity

### Unicorn Studio Integration
- Embedded 3D animation from Unicorn Studio (Project ID: o91Mszogrc6tA7SO1wXQ)
- Used exact dimensions with scaled/cropped positioning from bottom
- Hero section displays clean animation without text overlay per user preference

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