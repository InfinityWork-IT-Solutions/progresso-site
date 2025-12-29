# Progreso Consultants Website

## Overview

This is a consulting business website for Progreso Consultants, a South African company focused on transforming survivalist enterprises into sustainable assets. The application is a single-page marketing website with a contact form that sends emails via the Brevo API. It's built as a full-stack TypeScript application with React frontend and Express backend, designed for deployment on both Replit and Netlify.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS v4 with custom theme configuration
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query for server state

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx for development, esbuild for production
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Email Service**: Brevo (Sendinblue) transactional email API

### Build System
- **Development**: Vite dev server with HMR on port 5000
- **Production Build**: Custom build script using esbuild for server bundling and Vite for client
- **Output**: Server compiled to `dist/index.cjs`, client assets to `dist/public`

### Database
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts`
- **Current Usage**: Basic user schema defined but primarily using in-memory storage
- **Migration Tool**: Drizzle Kit with `db:push` command

### Project Structure
```
├── client/           # React frontend
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── email.ts      # Brevo email integration
│   └── storage.ts    # In-memory data storage
├── shared/           # Shared types and schemas
├── netlify/functions/  # Netlify serverless functions
└── attached_assets/  # Generated images and assets
```

## External Dependencies

### Email Service
- **Provider**: Brevo (formerly Sendinblue)
- **Integration**: HTTP API v3 for transactional emails
- **Required Environment Variables**:
  - `BREVO_API_KEY` - API key for Brevo
  - `BREVO_SENDER_EMAIL` - Verified sender email address
  - `CONTACT_EMAIL` - Recipient for contact form submissions

### Database
- **Provider**: PostgreSQL (when DATABASE_URL is configured)
- **Connection**: Via `DATABASE_URL` environment variable
- **Fallback**: In-memory storage when database not configured

### Deployment Platforms
- **Primary**: Replit with autoscale deployments
- **Alternative**: Netlify with serverless functions
- **Netlify Functions**: Contact form handler in `netlify/functions/contact.ts`

### Third-Party Libraries
- **UI Primitives**: Radix UI (dialogs, dropdowns, tooltips, etc.)
- **Carousel**: Embla Carousel with autoplay plugin
- **Date Utilities**: date-fns
- **Fonts**: Google Fonts (Inter, Playfair Display)