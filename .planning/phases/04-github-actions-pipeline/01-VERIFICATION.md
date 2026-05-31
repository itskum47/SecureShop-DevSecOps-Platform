# Phase 04 Verification

## Goal
Implement the core CI pipeline and static security scans.

## Verification of must_haves

- [x] `.github/workflows/security-pipeline.yml` is created.
- [x] The pipeline includes Gitleaks secret scanning.
- [x] The pipeline includes Semgrep SAST.
- [x] The pipeline includes GitHub's Dependency Review Action.
- [x] The pipeline includes Docker image build steps for both frontend and backend.
- [x] The pipeline includes Trivy scanning for both Docker images, failing the build on CRITICAL severity (`exit-code: '1'`, `severity: 'CRITICAL'`).
- [x] The pipeline includes steps to push the built Docker images to `ghcr.io` using `secrets.GITHUB_TOKEN` on pushes to the `main` branch.

All acceptance criteria and must_haves have been met successfully. The pipeline is correctly configured.
