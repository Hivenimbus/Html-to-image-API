# Deployment Guide for EasyPanel

This guide explains how to deploy the HTML-to-Image API on EasyPanel.

## Prerequisites

- Docker installed locally (for testing)
- EasyPanel account and access
- GitHub repository with the code
- API token for authentication

## Quick Start

### 1. Local Testing with Docker

Build and test the application locally:

```bash
# Build the Docker image
npm run docker:build

# Run with docker-compose
npm run docker:compose

# Check logs
npm run docker:compose:logs

# Stop the service
npm run docker:compose:down
```

### 2. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `API_TOKEN`: Your secure authentication token
- `LOG_LEVEL`: Logging level (info, debug, warn, error)

## EasyPanel Deployment Methods

### Method 1: Deploy from GitHub (Recommended)

#### Step 1: Prepare Repository
1. Commit all files to your GitHub repository:
   ```bash
   git add .
   git commit -m "Add EasyPanel compatibility"
   git push origin main
   ```

#### Step 2: Deploy in EasyPanel
1. Log into your EasyPanel dashboard
2. Click **"Create New Project"**
3. Choose **"From GitHub"**
4. Select repository: `Html-to-image-API`
5. Branch: `main`
6. Use the provided `easypanel.json` configuration file

#### Step 3: Configure Environment Variables
In EasyPanel dashboard, set these environment variables:
```
API_TOKEN=your-secure-token-here
LOG_LEVEL=info
```

The following are pre-configured:
```
NODE_ENV=production
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

### Method 2: Deploy from Docker Registry

#### Step 1: Build and Push Image
```bash
# Build image locally
docker build -t your-registry/html-to-image-api:latest .

# Push to your registry
docker push your-registry/html-to-image-api:latest
```

#### Step 2: Deploy in EasyPanel
1. Use the `easypanel-docker.json` configuration
2. Update the image name in the file to match your registry
3. Import the configuration in EasyPanel

### Method 3: Manual Configuration

If you prefer to configure manually in EasyPanel:

**Source Configuration:**
- Repository: `https://github.com/jpcb2020/Html-to-image-API`
- Branch: `main`
- Build Context: `/`
- Dockerfile: `Dockerfile`

**Service Configuration:**
- Container Port: 3000
- Health Check Path: `/api/html-to-image`
- Health Check Interval: 30s

**Resource Configuration:**
- Memory Request: 512Mi
- Memory Limit: 1Gi
- CPU Request: 250m
- CPU Limit: 500m

**Security Configuration:**
- Run as Non-Root: No (required for Chrome)
- Add Capabilities: SYS_ADMIN

## API Usage

### Health Check
```bash
curl https://your-domain.com/api/html-to-image
```

### Convert HTML to PNG
```bash
curl -X POST https://your-domain.com/api/html-to-image \
  -H "Authorization: Bearer your-api-token" \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<html><body><h1>Hello World</h1></body></html>",
    "width": 800,
    "height": 600,
    "quality": 90
  }' \
  --output image.png
```

## Troubleshooting

### Common Issues

1. **Puppeteer Chrome Not Found**
   - Ensure `PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser` is set
   - Check that the Dockerfile includes Chromium installation

2. **Memory Issues**
   - Increase memory allocation in EasyPanel
   - Consider using `fullPage: false` for large HTML content

3. **Permission Errors**
   - Verify the container runs with proper capabilities
   - Check that SYS_ADMIN capability is granted for Chrome

### Monitoring

Monitor your application using:
- EasyPanel dashboard logs
- Health check endpoint responses
- API response times and error rates

## Security Notes

- Always use a strong API token
- Consider rate limiting in production
- Monitor resource usage to prevent abuse
- Keep the Docker image updated for security patches