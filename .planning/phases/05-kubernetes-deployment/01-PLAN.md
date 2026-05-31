---
wave: 1
depends_on: []
files_modified:
  - k8s/mongodb-deployment.yaml
  - k8s/mongodb-service.yaml
  - k8s/backend-deployment.yaml
  - k8s/backend-service.yaml
  - k8s/frontend-deployment.yaml
  - k8s/frontend-service.yaml
  - .github/workflows/security-pipeline.yml
autonomous: true
---

# Phase 05: Kubernetes Deployment Plan

## Verification Criteria
- [ ] MongoDB deployment and service manifests exist in `k8s/`
- [ ] Backend deployment and service manifests exist in `k8s/`
- [ ] Frontend deployment and service manifests exist in `k8s/`
- [ ] The GitHub Actions pipeline (`security-pipeline.yml`) includes a job/step to set up a `kind` cluster.
- [ ] The GitHub Actions pipeline includes a job/step to deploy the Kubernetes manifests to the `kind` cluster.

## Must Haves
- The Kubernetes manifests must be syntactically valid YAML.
- The workflow must use a standard method to spin up a `kind` cluster in the runner.
- The pipeline must deploy the components using `kubectl apply -f k8s/` after the docker images are successfully built and pushed.
- The backend deployment must reference the MongoDB service via environment variables (e.g., `MONGO_URI`).

## Wave 1: Create Kubernetes Manifests

<task>
  <id>1</id>
  <title>Create MongoDB Kubernetes Manifests</title>
  <read_first>k8s/.gitkeep</read_first>
  <action>Create `k8s/mongodb-deployment.yaml` and `k8s/mongodb-service.yaml` to deploy MongoDB. The deployment should use the `mongo:latest` image and expose port 27017. The service should expose port 27017 and be named `mongodb-service` so the backend can connect to it. Do not set strong authentication to fulfill the vulnerable code requirement.</action>
  <acceptance_criteria>
    - `k8s/mongodb-deployment.yaml` exists and contains a valid Deployment for MongoDB.
    - `k8s/mongodb-service.yaml` exists and contains a valid Service exposing port 27017.
  </acceptance_criteria>
</task>

<task>
  <id>2</id>
  <title>Create Backend Kubernetes Manifests</title>
  <read_first>k8s/.gitkeep</read_first>
  <action>Create `k8s/backend-deployment.yaml` and `k8s/backend-service.yaml` to deploy the backend. The deployment should use the `ghcr.io/${{ github.repository }}/backend:latest` image (to be substituted by CI or assumed if public), expose the backend port (e.g., 5000), and set the `MONGO_URI` environment variable to `mongodb://mongodb-service:27017/secureshop`. The service should expose port 5000 and be of type ClusterIP or NodePort.</action>
  <acceptance_criteria>
    - `k8s/backend-deployment.yaml` exists and contains a valid Deployment for the backend.
    - `k8s/backend-service.yaml` exists and contains a valid Service exposing the backend port 5000.
  </acceptance_criteria>
</task>

<task>
  <id>3</id>
  <title>Create Frontend Kubernetes Manifests</title>
  <read_first>k8s/.gitkeep</read_first>
  <action>Create `k8s/frontend-deployment.yaml` and `k8s/frontend-service.yaml` to deploy the frontend. The deployment should use the `ghcr.io/${{ github.repository }}/frontend:latest` image. Expose the frontend port (e.g., 80) and set up the Service as a NodePort exposing port 80.</action>
  <acceptance_criteria>
    - `k8s/frontend-deployment.yaml` exists and contains a valid Deployment for the frontend.
    - `k8s/frontend-service.yaml` exists and contains a valid Service exposing the frontend port 80.
  </acceptance_criteria>
</task>

## Wave 2: Update CI/CD Pipeline

<task>
  <id>4</id>
  <title>Integrate Kubernetes Deployment into GitHub Actions</title>
  <read_first>.github/workflows/security-pipeline.yml</read_first>
  <action>Modify `.github/workflows/security-pipeline.yml` to add a new job or append steps to deploy to a `kind` cluster. Use an action like `helm/kind-action@v1.4.0` to set up the cluster. Then, use `kubectl apply -f k8s/` to apply all manifests. Use `envsubst` or sed if necessary to inject the repository name into the YAML manifests before applying them, or ensure the image names in the YAMLs are valid. Verify the pods come up successfully using `kubectl wait --for=condition=ready pod --all --timeout=120s`.</action>
  <acceptance_criteria>
    - `.github/workflows/security-pipeline.yml` is updated with steps to create a `kind` cluster.
    - The pipeline applies the Kubernetes manifests from the `k8s/` directory.
    - The pipeline waits for the pods to become ready.
  </acceptance_criteria>
</task>
