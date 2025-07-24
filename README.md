# CODE THE FUCK UP - Satirical Developer Platform

A brutal, no-bullshit platform for developers who are tired of tech industry lies and want to share their real experiences.

## Features

- **Real Dev Stories**: Authentic developer experiences, failures, and breakthroughs
- **Tech Lies Exposed**: Calling out industry bullshit and marketing hype
- **Cringe Gallery**: Hall of shame for LinkedIn influencers and tech cringe
- **Hot Rants**: Uncensored developer rage and honest takes
- **Fuck It Mode**: Extreme mode with enhanced rage content and red theme
- **Interactive Tools**: Confession booth, resume builder, daily fuckup generator

## Tech Stack

- **Frontend**: React with Vite, TypeScript, TailwindCSS
- **Backend**: Express.js with TypeScript
- **Database**: Configurable storage (memory/PostgreSQL)
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query
- **UI Components**: Shadcn/UI components
- **Styling**: TailwindCSS with custom theme

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## GitHub Pages Deployment

This application can be deployed to GitHub Pages with some modifications since it's a full-stack app. Here are the steps:

### Option 1: Static Build (Frontend Only)
For a static deployment without backend functionality:

1. **Create a static build script** in `package.json`:
```json
{
  "scripts": {
    "build:static": "vite build --outDir dist",
    "preview": "vite preview"
  }
}
```

2. **Build the static version**:
```bash
npm run build:static
```

3. **Configure GitHub Pages**:
   - Go to your repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose the branch containing your `dist` folder
   - Set folder to `/dist` or `/docs` depending on your setup
   - If you cannot run the build locally, you can commit a basic `docs/index.html`
     placeholder so GitHub Pages has an `index.html` to serve while the workflow
     builds the real site.

4. **GitHub Actions workflow** (`.github/workflows/static.yml`) is already included:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build:static
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Option 2: Full-Stack Deployment (Recommended)
For full functionality including backend features:

1. **Use GitHub Codespaces or external hosting** like:
   - **Vercel**: Connect your GitHub repo to Vercel for automatic deployments
   - **Netlify**: Similar to Vercel, supports full-stack apps
   - **Railway**: Specifically good for full-stack Node.js apps
   - **Render**: Free tier available for small projects

2. **For Vercel deployment**:
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the Vite configuration
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Environment variables can be set in Vercel dashboard

3. **Environment Variables**:
   Make sure to set any required environment variables in your hosting platform.

### Important Notes:
- GitHub Pages only supports static sites, so backend API calls won't work
- For full functionality, use a platform that supports Node.js backends
- The static version will use mock data instead of dynamic backend features
- All interactive features requiring backend will show placeholder messages

### Custom Domain (Optional):
1. Add a `CNAME` file to your `dist` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable custom domain in GitHub Pages settings

## Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── sections/     # Homepage sections
│   │   └── lib/          # Utilities and data
├── server/               # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage layer
└── shared/               # Shared types and schemas
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your contributions maintain the satirical tone and brutal honesty that makes this platform unique.

## License

MIT License - Feel free to use this code to build your own platform for calling out tech industry bullshit.