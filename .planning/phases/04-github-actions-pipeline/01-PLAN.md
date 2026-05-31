---
wave: 1
depends_on: []
files_modified:
  - ".github/workflows/security-pipeline.yml"
autonomous: true
---

# Phase 4: GitHub Actions Pipeline Plan 1

## Objective
Implement the core CI pipeline and static security scans using GitHub Actions.

## Tasks

<task>
  <id>1</id>
  <description>Create the GitHub Actions workflow file with triggers, Secret Scanning, SAST, and Dependency Scanning.</description>
  <action>Create `.github/workflows/security-pipeline.yml`. Define triggers for `push` and `pull_request` on the `main` branch. Add jobs for Secret Scanning (using Gitleaks), SAST (using Semgrep), and Dependency Scanning (using GitHub's dependency-review-action).</action>
  <read_first>
    - .planning/phases/04-github-actions-pipeline/CONTEXT.md
  </read_first>
  <acceptance_criteria>
    - `ls -l .github/workflows/security-pipeline.yml` returns the file.
    - `grep "on:" .github/workflows/security-pipeline.yml` confirms triggers.
    - `grep -i "gitleaks" .github/workflows/security-pipeline.yml` finds the secret scanning job.
    - `grep -i "semgrep" .github/workflows/security-pipeline.yml` finds the SAST job.
    - `grep -i "dependency-review" .github/workflows/security-pipeline.yml` finds the dependency review job.
  </acceptance_criteria>
</task>

<task>
  <id>2</id>
  <description>Add Docker Build, Trivy Scan, and Docker Push jobs to the workflow.</description>
  <action>Update `.github/workflows/security-pipeline.yml` to include a job that builds the frontend and backend Docker images. Add a Trivy container scanning step for both images, explicitly configured to fail the build on `CRITICAL` severity findings (e.g., `--severity CRITICAL --exit-code 1`). Add a final step to push the built images to `ghcr.io` if the event is a push to `main`, authenticating with `secrets.GITHUB_TOKEN`.</action>
  <read_first>
    - .planning/phases/04-github-actions-pipeline/CONTEXT.md
  </read_first>
  <acceptance_criteria>
    - `grep -i "docker build" .github/workflows/security-pipeline.yml` finds the build steps.
    - `grep -i "trivy" .github/workflows/security-pipeline.yml` finds the container scanning steps.
    - `grep -i "CRITICAL" .github/workflows/security-pipeline.yml` confirms Trivy is configured to fail on critical.
    - `grep -i "ghcr.io" .github/workflows/security-pipeline.yml` finds the push steps.
    - `grep -i "GITHUB_TOKEN" .github/workflows/security-pipeline.yml` finds the registry authentication.
  </acceptance_criteria>
</task>

## Verification
- Verify that `.github/workflows/security-pipeline.yml` exists and is well-formed YAML.
- Verify that all specified tools (Gitleaks, Semgrep, Dependency Review, Trivy) are included as jobs/steps in the workflow.
- Verify that Trivy is set to exit with a non-zero code when critical vulnerabilities are found.
- Verify that image pushing to `ghcr.io` is conditioned on a push to the main branch.

## must_haves
- `.github/workflows/security-pipeline.yml` is created.
- The pipeline includes Gitleaks secret scanning.
- The pipeline includes Semgrep SAST.
- The pipeline includes GitHub's Dependency Review Action.
- The pipeline includes Docker image build steps for both frontend and backend.
- The pipeline includes Trivy scanning for both Docker images, failing the build on CRITICAL severity.
- The pipeline includes steps to push the built Docker images to `ghcr.io` using `secrets.GITHUB_TOKEN`.
