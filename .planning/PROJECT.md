# SecureShop DevSecOps Platform

## What This Is

A deliberately vulnerable e-commerce application secured through a complete GitHub Actions DevSecOps pipeline. This portfolio project demonstrates practical implementation of continuous security integration in modern application delivery.

## Core Value

An end-to-end demonstration of DevSecOps practices integrating automated security scanning (SAST, secret detection, dependency scanning, container security, DAST, and IaC security) directly into a GitHub Actions CI/CD pipeline, ending with deployment to Kubernetes.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Deliberately vulnerable e-commerce application (React Frontend, Node.js/Express Backend, MongoDB)
- [ ] Dockerized application components (Frontend and Backend) published to GitHub Container Registry
- [ ] Complete GitHub Actions Pipeline triggered on Push
- [ ] Automated SAST scanning using Semgrep
- [ ] Secret detection using Gitleaks
- [ ] Dependency/SCA scanning using Dependency Review Action
- [ ] Container image scanning using Trivy (Fail on Critical)
- [ ] DAST scanning against deployed application using OWASP ZAP
- [ ] Infrastructure as Code (IaC) using Terraform for AWS infrastructure
- [ ] IaC security scanning using Checkov
- [ ] Kubernetes deployment (Local or AWS EKS)
- [ ] Observability and Monitoring (Prometheus & Grafana)
- [ ] Runtime container security (Falco)

### Out of Scope

- [Advanced application features] — The e-commerce application only needs basic functionality (Login, Register, Product listing, Cart, Checkout). The focus is on the security pipeline.

## Context

- The project simulates a real-world DevSecOps workflow incorporating modern security tooling.
- It highlights skills requested by recruiters for DevOps/Security roles.
- Documentation at the end (README, Architecture Diagram, Threat Model, Security Findings, CI/CD Flow) is critical to presenting a professional portfolio project.

## Constraints

- Primary CI/CD tool is GitHub Actions.
- Target deployment environment is Kubernetes.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Adopt GitHub Actions as CI/CD | Native integration with GitHub repositories and strong ecosystem of security actions | — Pending |
| Build basic React/Node app | Keeps application complexity low to focus on security automation | — Pending |

---
*Last updated: 2026-05-31 after initialization*
