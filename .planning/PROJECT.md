# SecureShop DevSecOps Platform

## What This Is

A deliberately vulnerable e-commerce application secured through a complete GitHub Actions DevSecOps pipeline. This portfolio project demonstrates practical implementation of continuous security integration in modern application delivery.

## Core Value

An end-to-end demonstration of DevSecOps practices integrating automated security scanning (SAST, secret detection, dependency scanning, container security, DAST, and IaC security) directly into a GitHub Actions CI/CD pipeline, ending with deployment to Kubernetes.

## Requirements

### Validated

- [x] Deliberately vulnerable e-commerce application (React Frontend, Node.js/Express Backend, MongoDB)
- [x] Dockerized application components (Frontend and Backend) published to GitHub Container Registry
- [x] Complete GitHub Actions Pipeline triggered on Push
- [x] Automated SAST scanning using Semgrep
- [x] Secret detection using Gitleaks
- [x] Dependency/SCA scanning using Dependency Review Action
- [x] Container image scanning using Trivy (Fail on Critical)
- [x] DAST scanning against deployed application using OWASP ZAP
- [x] Infrastructure as Code (IaC) using Terraform for AWS infrastructure
- [x] IaC security scanning using Checkov
- [x] Kubernetes deployment (Local or AWS EKS)
- [x] Observability and Monitoring (Prometheus & Grafana)
- [x] Runtime container security (Falco)

### Active

- (None — awaiting next milestone planning)

### Out of Scope

- [Advanced application features] — The e-commerce application only needs basic functionality (Login, Register, Product listing, Cart, Checkout). The focus is on the security pipeline.

## Current State

**v1.0 Shipped (2026-05-31):** The SecureShop DevSecOps platform has been fully realized. All 10 phases of the project—from application scaffolding, Dockerization, and Kubernetes deployment to comprehensive DevSecOps integration (SAST, DAST, SCA, Secrets, IaC, Runtime) and final documentation—have been successfully executed.

## Next Milestone Goals
- (Pending `/gsd-new-milestone`)

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
| Adopt GitHub Actions as CI/CD | Native integration with GitHub repositories and strong ecosystem of security actions | Shipped |
| Build basic React/Node app | Keeps application complexity low to focus on security automation | Shipped |

---
*Last updated: 2026-05-31 after completing milestone v1.0*
