# Deployment Instructions

This project is containerized using Docker and Nginx, compatible with Google Cloud Run.

## Prerequisites

- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) installed and authenticated.
- Docker installed (optional, for local testing).

## Local Testing

To build and run the container locally:

```bash
# Build the image
docker build -t portfolio .

# Run the container (mapping port 8080)
docker run -p 8080:8080 portfolio
```

Visit `http://localhost:8080` to see the site.

## Deploy to Cloud Run

1.  **Authenticate with Google Cloud:**
    ```bash
    gcloud auth login
    gcloud config set project YOUR_PROJECT_ID
    ```

2.  **Deploy:**
    Run the following command. It will build the image remotely (using Cloud Build) and deploy it to Cloud Run.

    ```bash
    gcloud run deploy portfolio \
      --source . \
      --port 8080 \
      --allow-unauthenticated \
      --region us-central1
    ```

    *Replace `us-central1` with your preferred region if needed.*

3.  **Verify:**
    The command will output a Service URL. Open it in your browser.

## File Explanations

- **`Dockerfile`**: Defines the multi-stage build process.
    - Stage 1 (Builder): Uses Node.js to install dependencies and run `npm run build` (generating the `out` folder).
    - Stage 2 (Runner): Uses Nginx to serve the content from the `out` folder.
- **`nginx.conf`**: Configuration for Nginx.
    - Listens on port 8080 (Cloud Run requirement).
    - Serves static files from the build output.
    - Handles Single Page Application (SPA) routing (redirects 404s to `index.html`).
- **`next.config.mjs`**: Updated with `output: 'export'` to generate a purely static site suitable for Nginx serving without a Node.js backend.
