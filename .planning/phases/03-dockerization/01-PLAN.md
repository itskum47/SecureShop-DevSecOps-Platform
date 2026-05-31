---
wave: 1
depends_on: ["02-repository-structure"]
files_modified:
  - "Dockerfile.frontend"
  - "Dockerfile.backend"
  - "docker-compose.yml"
  - "docker/build-and-push.sh"
autonomous: true
---

# Phase 3: Dockerization Plan

## Goal
Containerize the React frontend and Node.js backend applications and create orchestration and build scripts for easy deployment.

## Must Haves
- `Dockerfile.frontend` must exist and utilize a multi-stage build.
- `Dockerfile.backend` must exist and expose port 5000.
- `docker-compose.yml` must exist and orchestrate frontend, backend, and MongoDB services.
- `docker/build-and-push.sh` must exist and build/push images to GHCR.

## Tasks

<task>
<id>create-backend-dockerfile</id>
<action>Create `Dockerfile.backend` for the Node.js API</action>
<read_first>backend/package.json</read_first>
<acceptance_criteria>
- `Dockerfile.backend` exists in the root directory.
- It uses a lightweight Node.js base image (e.g., `node:20-alpine`).
- Port 5000 is exposed.
- Application code is copied and dependencies are installed.
</acceptance_criteria>
</task>

<task>
<id>create-frontend-dockerfile</id>
<action>Create `Dockerfile.frontend` for the React app using a multi-stage build</action>
<read_first>frontend/package.json, frontend/vite.config.js</read_first>
<acceptance_criteria>
- `Dockerfile.frontend` exists in the root directory.
- It uses a Node base image to build the static assets.
- It uses an Nginx base image (e.g., `nginx:alpine`) to serve the built assets.
</acceptance_criteria>
</task>

<task>
<id>create-docker-compose</id>
<action>Create `docker-compose.yml` to orchestrate all services</action>
<read_first>Dockerfile.frontend, Dockerfile.backend</read_first>
<acceptance_criteria>
- `docker-compose.yml` exists in the root directory.
- It defines `frontend`, `backend`, and `mongodb` services.
- Services are connected to a shared Docker network.
</acceptance_criteria>
</task>

<task>
<id>create-build-script</id>
<action>Create `docker/build-and-push.sh` script to build and push images</action>
<read_first>.planning/phases/03-dockerization/CONTEXT.md</read_first>
<acceptance_criteria>
- `docker/build-and-push.sh` exists.
- The script contains commands to `docker build` both frontend and backend.
- The script contains commands to `docker push` images to `ghcr.io`.
- The script uses variables or placeholders for GHCR credentials/repo name.
</acceptance_criteria>
</task>

## Verification
- Run `ls -la Dockerfile.frontend Dockerfile.backend docker-compose.yml docker/build-and-push.sh` to confirm all files are created.
- Review Dockerfiles to ensure vulnerabilities from Phase 1 are not patched.
