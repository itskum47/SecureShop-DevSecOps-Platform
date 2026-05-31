# Phase 3: Dockerization - Context

## Approach
- Create `Dockerfile.frontend` and `Dockerfile.backend` to containerize the React and Express applications. These will be placed in the root directory (or `docker/` directory) for easy context resolution.
- Create a `docker-compose.yml` file to orchestrate the frontend, backend, and MongoDB database for local development and testing.
- Create a script `docker/build-and-push.sh` to handle building the Docker images and pushing them to the GitHub Container Registry (GHCR). This fulfills the "Push images to GitHub Container Registry" requirement manually before the GitHub Actions pipeline (Phase 4) is built.

## Decisions
- **Base Images:** Use `node:20-alpine` (or similar) to keep images lightweight.
- **Frontend Container:** Use a multi-stage build for the frontend: build the Vite static assets with Node, then serve them using an `nginx:alpine` image.
- **Backend Container:** Standard Node.js Dockerfile exposing port 5000.
- **Network:** Use a shared Docker network in `docker-compose.yml` so the frontend can route API requests to the backend, and the backend can connect to MongoDB.
- **Vulnerabilities:** Ensure the Dockerfiles do NOT inadvertently patch the deliberate vulnerabilities introduced in Phase 1.
