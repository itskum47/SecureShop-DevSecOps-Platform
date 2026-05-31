#!/bin/bash

# Exit on error
set -e

# Configuration
GHCR_USERNAME="${GHCR_USERNAME:-your-username}"
GHCR_PAT="${GHCR_PAT:-your-personal-access-token}"
REPO_NAME="${REPO_NAME:-secureshop}"
REGISTRY="ghcr.io"

echo "Logging into GitHub Container Registry..."
echo "${GHCR_PAT}" | docker login ${REGISTRY} -u "${GHCR_USERNAME}" --password-stdin

# Build and Push Backend
echo "Building backend image..."
docker build -t ${REGISTRY}/${GHCR_USERNAME}/${REPO_NAME}-backend:latest -f Dockerfile.backend .
echo "Pushing backend image..."
docker push ${REGISTRY}/${GHCR_USERNAME}/${REPO_NAME}-backend:latest

# Build and Push Frontend
echo "Building frontend image..."
docker build -t ${REGISTRY}/${GHCR_USERNAME}/${REPO_NAME}-frontend:latest -f Dockerfile.frontend .
echo "Pushing frontend image..."
docker push ${REGISTRY}/${GHCR_USERNAME}/${REPO_NAME}-frontend:latest

echo "Successfully built and pushed images to GHCR."
