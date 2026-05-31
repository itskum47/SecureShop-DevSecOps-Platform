# Phase 6: DAST Scanning - Context

## Approach
- Update the `.github/workflows/security-pipeline.yml` to include a Dynamic Application Security Testing (DAST) job using OWASP ZAP.
- This new step will run *after* the Kubernetes application has been deployed to the `kind` cluster (from Phase 5).
- The pipeline will run the OWASP ZAP Baseline Scan (or Full Scan) against the deployed application running in the CI runner to detect runtime vulnerabilities like XSS, NoSQLi/SQLi, and missing security headers.

## Decisions
- **Network Configuration:** Since the application is deployed to a `kind` cluster in the CI runner, we will need to use `kubectl port-forward` to map the frontend service to `localhost:8080` on the runner.
- **ZAP Target:** The ZAP action (`zaproxy/action-baseline` or `zaproxy/action-full-scan`) will target `http://localhost:8080`.
- **Reporting:** The scan will detect the deliberate XSS and potentially the NoSQLi logic, as well as missing security headers. The action should be configured to generate an HTML or Markdown report and can be allowed to fail to demonstrate security enforcement.
- **Scope:** The only file being modified is the `.github/workflows/security-pipeline.yml`. No application code is changed.
