# Phase 4: GitHub Actions Pipeline - Context

## Approach
- Create a `.github/workflows/security-pipeline.yml` file to handle continuous integration, security scanning, and container building.
- The pipeline will trigger on `push` and `pull_request` to the `main` branch.
- The workflow will implement the following steps:
  1. **Secret Scanning:** Use Gitleaks or TruffleHog to detect hardcoded secrets.
  2. **SAST:** Use Semgrep for static application security testing.
  3. **Dependency Scanning:** Use GitHub's Dependency Review action.
  4. **Docker Build & Scan:** Build the frontend and backend Docker images, then scan them using Trivy. As per the roadmap, Trivy must be configured to fail the build on "CRITICAL" severity findings.
  5. **Docker Push:** If all scans pass and the event is a push to `main`, push the built images to the GitHub Container Registry (GHCR).

## Decisions
- **Vulnerabilities:** The application contains deliberate vulnerabilities (XSS, NoSQLi, hardcoded AWS keys). The scanners (Semgrep, Gitleaks, Trivy) are expected to catch these. We will configure them according to standard practices (e.g., fail on critical for Trivy) to demonstrate real-world DevSecOps enforcement, even if it means the build intentionally fails.
- **Authentication:** Use `secrets.GITHUB_TOKEN` for authentication to `ghcr.io`.
- **Scope:** This phase focuses purely on configuring the GitHub Actions YAML workflow. No application code changes will be made.
