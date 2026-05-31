---
wave: 1
depends_on: []
files_modified:
  - ".github/workflows/security-pipeline.yml"
autonomous: true
---

# Phase 06: DAST Scanning

## Verification Criteria
- [ ] `zaproxy/action-full-scan` is added to the GitHub Actions workflow.
- [ ] DAST step runs after pods are ready.
- [ ] DAST step sets up `kubectl port-forward svc/frontend-service 8080:80 &` to access the application locally on the runner.
- [ ] ZAP is configured to scan `http://localhost:8080`.

## Plan

<task>
  <read_first>
    - .github/workflows/security-pipeline.yml
  </read_first>
  <action>
    Append DAST testing steps at the end of the `deploy-kind` job in `.github/workflows/security-pipeline.yml`. Since the `kind` cluster is local to the GitHub runner running the `deploy-kind` job, the DAST scan must be run within the same job after the pods are ready.
    1. Add a step named "Port Forward Frontend" that runs `kubectl port-forward svc/frontend-service 8080:80 &` and `sleep 5` to forward local port 8080 to the deployed `frontend-service` and wait for it to be ready.
    2. Add a step named "OWASP ZAP Full Scan" using `uses: zaproxy/action-full-scan@v0.12.0`.
    3. Configure the ZAP step to target `http://localhost:8080` using `with: target: 'http://localhost:8080'`.
    4. Configure the ZAP step with `fail_action: false` so that the scan generates a report but does not fail the pipeline if vulnerabilities are found (since the app is intentionally vulnerable).
  </action>
  <acceptance_criteria>
    - `grep "kubectl port-forward svc/frontend-service" .github/workflows/security-pipeline.yml` matches.
    - `grep "zaproxy/action-full-scan" .github/workflows/security-pipeline.yml` matches.
    - `grep "target: 'http://localhost:8080'" .github/workflows/security-pipeline.yml` matches.
  </acceptance_criteria>
</task>

## Goal-Backward Verification
- [ ] `must_have: The DAST scan runs in the same job as the Kind cluster creation so it has access to the cluster.`
- [ ] `must_have: The frontend-service is port-forwarded to localhost on the GitHub Actions runner.`
- [ ] `must_have: OWASP ZAP targets the correct forwarded port (8080).`
