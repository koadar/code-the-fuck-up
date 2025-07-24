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

On Windows, make sure your environment variables work by using `cross-env` (already
included in the project). Running the above commands from PowerShell or CMD will
work out of the box.

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

Both development and production scripts set the `NODE_ENV` variable using
`cross-env` so they run correctly on Windows, macOS and Linux.

Ensure that `DATABASE_URL` is defined in your environment before running migrations or the server.

## Deploying to GitHub Pages

To host the static frontend on GitHub Pages:

1. Edit `vite.config.ts` and set the `base` option to the repository name:

   ```ts
   export default defineConfig({
     base: "/code-the-fuck-up/",
     // ...
   })
   ```

2. Commit your changes and push to the `main` branch.
3. GitHub Actions will build the project and deploy the files from `dist/public` to the `gh-pages` environment.
4. Enable GitHub Pages in your repository settings and choose **GitHub Actions** as the source.

