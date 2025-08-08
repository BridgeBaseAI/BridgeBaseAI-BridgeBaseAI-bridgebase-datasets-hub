# BridgeHub - Web3 Data & AI Intelligence Platform

## Overview

BridgeHub is a full-stack web application that provides access to curated Web3 datasets and AI-powered insights for DeFi, NFTs, DAOs, and blockchain analytics. The platform combines real-time data from trusted sources with intelligent analysis powered by DeepSeek AI through OpenRouter API. Users can explore comprehensive datasets covering DeFi protocols, NFT marketplaces, DAO governance, and blockchain metrics while interacting with an AI assistant for deeper insights and analysis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: Radix UI primitives with custom styling for accessibility and customization

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for REST API
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Data Storage**: In-memory storage with interface abstraction for future database integration
- **Schema Validation**: Zod for runtime type checking and data validation
- **Session Management**: Express session middleware with PostgreSQL session store support

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Database**: PostgreSQL (Neon serverless) for production data persistence
- **Schema**: Centralized schema definitions in shared directory for type consistency
- **Migrations**: Drizzle Kit for database schema migrations and version control

### AI Integration
- **Provider**: OpenRouter API for accessing multiple AI models
- **Model**: DeepSeek Chat for Web3 domain expertise and cost-effective inference
- **Query Storage**: Persistent storage of user questions and AI responses for analytics
- **Context**: Maintains conversation context for improved user experience

### API Design
- **Endpoints**: RESTful API with `/api/datasets` for data access and `/api/ask` for AI queries
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Logging**: Request/response logging with performance metrics
- **Validation**: Input validation using Zod schemas for data integrity

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL for production data storage
- **Connection**: Environment-based DATABASE_URL configuration
- **Session Store**: connect-pg-simple for PostgreSQL session persistence

### AI Services
- **OpenRouter**: Multi-model AI API gateway for flexible model access
- **Authentication**: API key-based authentication with environment variables
- **Models**: DeepSeek Chat model for specialized Web3 knowledge

### Development Tools
- **Replit Integration**: Development environment with live preview and debugging
- **Vite Plugins**: Runtime error overlay and development cartographer for enhanced DX
- **TypeScript**: Strict type checking with path aliases for clean imports

### UI Libraries
- **Radix UI**: Comprehensive component primitives for accessibility
- **Embla Carousel**: Touch-friendly carousel components
- **Lucide React**: Modern icon library with consistent styling
- **React Icons**: Additional icon sets for brand and social icons

### Data Sources
- **DeFiLlama**: Real-time DeFi protocol TVL and analytics data
- **DappRadar**: NFT marketplace trading volumes and statistics
- **DeepDAO**: DAO governance metrics and treasury analytics
- **CoinGecko**: Cryptocurrency market data and price feeds
- **Dune Analytics**: Custom blockchain query results and dashboards