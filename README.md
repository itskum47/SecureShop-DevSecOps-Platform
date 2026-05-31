# SecureShop DevSecOps Platform

**⚠️ IMPORTANT: INTENTIONALLY VULNERABLE ⚠️**
This application is deliberately designed with security vulnerabilities (such as NoSQL injection, XSS, hardcoded secrets, and misconfigurations) for the purpose of demonstrating DevSecOps automation, security scanning, and pipeline integration. **DO NOT** deploy this in a production environment.

## Overview
SecureShop is a mock e-commerce platform built to showcase a complete DevSecOps lifecycle. It serves as a practical demonstration for technical recruiters and hiring managers to evaluate my skills in integrating security into continuous integration and continuous deployment (CI/CD) pipelines, infrastructure as code (IaC), containerization, and runtime observability.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js / Express
- **Database:** MongoDB
- **Infrastructure:** Kubernetes, Docker, Terraform
- **Monitoring:** Prometheus, Grafana, Falco

## Security Pipeline Tools
This project integrates the following security scanners into a GitHub Actions pipeline:
- **Gitleaks:** Secret detection (e.g., hardcoded AWS keys)
- **Semgrep:** Static Application Security Testing (SAST) for source code vulnerabilities (NoSQLi, XSS)
- **Trivy:** Container vulnerability scanning
- **Checkov:** Infrastructure as Code (IaC) scanning for Terraform and Kubernetes misconfigurations
- **OWASP ZAP:** Dynamic Application Security Testing (DAST) for runtime vulnerabilities

## Setup Instructions
To run this project locally for demonstration purposes:

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd secureshop
   ```

2. **Run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Access the Application:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

4. **Deploy to local Kubernetes (Kind/Minikube):**
   ```bash
   kubectl apply -f k8s/
   ```

*Note: For the full pipeline execution, fork the repository and trigger the GitHub Actions workflow.*
