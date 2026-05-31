# Requirements

## Authentication
**Table stakes:**
- Sign up with email/password
- Login

## Core Application
**Table stakes:**
- Product listing
- Shopping cart
- Checkout process
- Intentionally vulnerable code (SQLi, XSS)

## Continuous Integration & Security (Pipeline)
**Table stakes:**
- GitHub Actions pipeline triggered on push
- Semgrep SAST scanning (SQLi, XSS, hardcoded secrets)
- Gitleaks secret detection
- Dependency Review Action
- Trivy container security (Fail build on Critical)

## Infrastructure & Deployment
**Table stakes:**
- Dockerize frontend and backend
- Publish images to GitHub Container Registry (ghcr.io)
- Deploy to Kubernetes (Local Kind/Minikube or AWS EKS)
- Terraform IaC for VPC, EC2, Security Groups
- Checkov IaC scanning (open ports, weak policies, public resources)

## Runtime & Observability
**Table stakes:**
- OWASP ZAP DAST scan against deployed application (XSS, SQLi, security headers)
- Prometheus and Grafana for monitoring (CPU, Memory, Pod Restarts, Response Time)
- Falco for runtime security (Shell inside container, Privilege escalation, Suspicious processes)

## Documentation
**Table stakes:**
- README.md
- Architecture Diagram
- Threat Model
- Security Findings
- CI/CD Flow
