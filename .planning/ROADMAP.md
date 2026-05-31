# Roadmap

## Phase 1: Application (In Progress)

Build the intentionally vulnerable e-commerce application.

- [ ] Build React frontend
- [x] Build Node.js/Express backend
- [x] Setup MongoDB connection
- [x] Implement intentionally vulnerable code (NoSQLi, hardcoded secrets)
- [ ] Implement basic features (Login, Register, Product list, Cart, Checkout)

**Progress:** 1/x plans completed.

## Phase 2: Repository Structure

Set up the project file structure.

- Create frontend and backend directories
- Create k8s directory with deployment manifests
- Create terraform directory
- Create docker directory
- Create security/zap and security/semgrep directories
- Create .github/workflows directory

## Phase 3: Dockerization

Containerize the application.

- Write Dockerfile.frontend
- Write Dockerfile.backend
- Push images to GitHub Container Registry

## Phase 4: GitHub Actions Pipeline

Implement the core CI pipeline and static security scans.

- Create security-pipeline.yml
- Add Semgrep SAST step
- Add Gitleaks secret detection step
- Add Dependency Review Action
- Add Trivy container scanning (fail on critical)
- Automate Docker build and push

## Phase 5: Kubernetes Deployment

Deploy the application to a Kubernetes cluster.

- Setup local Kind/Minikube cluster or AWS EKS
- Deploy Frontend, Backend, and MongoDB pods
- Automate deployment step in the pipeline

## Phase 6: DAST Scanning

Dynamic testing of the deployed application.

- Add OWASP ZAP scan to pipeline
- Target deployed application to detect XSS, SQLi, and security headers

## Phase 7: IaC Security

Provision infrastructure and scan configuration.

- Write Terraform configuration (VPC, EC2, Security Groups)
- Integrate Checkov into the pipeline to scan Terraform files

## Phase 8: Monitoring

Deploy observability stack.

- Deploy Prometheus
- Deploy Grafana
- Configure metrics collection for CPU, Memory, Pod Restarts, Response Time

## Phase 9: Runtime Security

Deploy runtime protection.

- Deploy Falco to the Kubernetes cluster
- Configure detection rules for shell execution, privilege escalation, and suspicious processes

## Phase 10: Documentation

Finalize portfolio deliverables.

- Write README.md
- Create Architecture Diagram
- Create Threat Model
- Compile Security Findings report
- Document CI/CD Flow
