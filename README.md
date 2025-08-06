# Backend API Server

This is the backend API server that powers my personal website and web applications, including the Valorant Fantasy League platform and spatial notepad app. Built with Node.js to provide secure, scalable REST API endpoints with robust authentication and data management.

This is to demonstrate backend development expertise with focus on scalability, security, and performance optimization across multiple application domains.
## Valorant Fantasy League API

Backend services for the fantasy sports platform, managing tournament data, player statistics, and dynamic valuations.

### Features

- **ELO Rating System**: Complex algorithm processing historical match data to calculate dynamic player values
- **Tournament Management**: Swiss-stage bracket generation and double-elimination playoff tree management
- **Player Statistics**: Comprehensive player performance tracking and analytics
- **Secure User Management**: JWT-based authentication with Auth0 integration

### API Endpoints
- **Players**: CRUD operations for player management and statistics
- **Tournaments**: Tournament creation, bracket management, and result tracking
- **Teams**: Fantasy team creation and roster management
- **Authentication**: Secure user session handling

## Notepad App API

Backend services for the spatial note-taking application, handling note persistence. Clustering of the notes is handled in web worker on the front-end to minimize load on server.

### Features

- **Note Management**: Full CRUD operations for spatial notes with position tracking
- **Advanced Search**: Server-side text search across user note collections
- **AI Clustering Pipeline**: 
  - TF-IDF vectorization for content analysis
  - K-means clustering for semantic grouping
  - Particle simulation algorithms for spatial arrangement
- **User Data Privacy**: Secure note storage with user isolation
- **Performance Optimization**: Efficient database queries and caching strategies

### API Endpoints

- **Notes**: Create, read, update, delete operations with spatial positioning

## Tech Stack

- **Runtime**: Node.js with Express.js framework
- **Database**: Sequelize and SQLite with custom query optimization
- **Authentication**: Auth0 JWT verification and user management
- **Process Management**: PM2 for production deployment and monitoring
- **Testing**: Jest with comprehensive unit and integration tests
- **Security**: CORS configuration, rate limiting, and input validation
- **Hosting**: Linode VPS with reverse proxy configuration

## Development Features

- **Environment Configuration**: Separate dev/staging/production environments
- **Database Migrations**: Sequelize controlled schema management
- **API Documentation**: Comprehensive endpoint documentation
- **Error Handling**: Structured error responses and logging
- **Performance Monitoring**: Request timing and database query optimization

## Available Scripts

### `npm start`
Starts the development server on localhost

### `npm test`
Runs the Jest test suite.

### `node migrate.js up`
Runs any pending Sequelize migrations.

### `node migrate.js down`
Rolls back the latest Sequelize migration.

### `node migrate.js up seed`
Runs database seeders after applying migrations.

## API Security

- **JWT Authentication**: Secure token-based authentication via Auth0
- **Rate Limiting**: Request throttling to prevent abuse
- **Input Validation**: Comprehensive request validation and sanitization
- **CORS Configuration**: Secure cross-origin resource sharing setup
- **Environment Variables**: Sensitive configuration stored securely


## Todo
- Improve coverage of unit tests
- Update VL App to support stage 2
