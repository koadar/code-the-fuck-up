# Rest Express App

This project is an Express server with a React client bundled via Vite. It uses Drizzle ORM for database access and Tailwind CSS for styling.

## Prerequisites

- Node.js and npm installed
- A PostgreSQL database
- Set the `DATABASE_URL` environment variable for Drizzle migrations and runtime database connections.

## Development

Install dependencies and start the development server with hot reloading:

```bash
npm install
npm run dev
```

The server listens on port **5000** by default.

## Building and Starting

Build the client and server:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Ensure that `DATABASE_URL` is defined in your environment before running migrations or the server.
