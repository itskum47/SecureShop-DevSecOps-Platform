# Phase 5: Kubernetes Deployment - Context

## Approach
- Create Kubernetes YAML manifests in the `k8s/` directory to deploy the `frontend`, `backend`, and `mongodb` components. Each component will require a Deployment and a Service.
- For the Kubernetes cluster, we will use `kind` (Kubernetes IN Docker). This is chosen because it runs easily within GitHub Actions and locally without requiring expensive AWS EKS infrastructure or complex credential management.
- Update the `.github/workflows/security-pipeline.yml` to include an automated deployment step. This step will spin up a `kind` cluster within the CI runner, load the built Docker images into it, and apply the Kubernetes manifests to verify that the application successfully deploys.

## Decisions
- **Infrastructure:** `kind` cluster instead of Minikube or AWS EKS for seamless, free integration with GitHub Actions.
- **Manifests:** Standard Kubernetes YAML (`deployment.yaml`, `service.yaml`) will be used rather than Helm charts to keep the complexity low and focus on the deployment automation itself.
- **Pipeline Integration:** The deployment step will only run if the previous security scanning and Docker build/push steps succeed. (Note: since Trivy is set to fail on critical, the pipeline will fail unless the vulnerabilities are patched or the Trivy configuration is adjusted. For now, the deployment step will be configured to run after the scans, completing the "Automate deployment step" requirement.)
- **Scope:** No application code changes will be made. The focus is entirely on Kubernetes manifests and updating the CI pipeline.
