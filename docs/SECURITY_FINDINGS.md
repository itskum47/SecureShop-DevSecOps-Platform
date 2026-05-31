# Security Findings Report

This is a mock report summarizing the intentional vulnerabilities injected into the SecureShop project and the pipeline tools responsible for detecting them.

## 1. Hardcoded Secrets
- **Vulnerability:** A dummy AWS Access Key was hardcoded in the `backend/config/aws.js` file.
- **Detection Tool:** **Gitleaks**
- **Impact:** Attackers gaining access to the source code could extract these keys to compromise cloud infrastructure.
- **Pipeline Behavior:** Gitleaks runs during the CI pipeline and flags the hardcoded secret, normally failing the build to prevent the secret from being merged.

## 2. NoSQL Injection
- **Vulnerability:** The backend login route `POST /api/auth/login` takes user input directly into the MongoDB query without proper sanitization (e.g., using `$ne` operators).
- **Detection Tool:** **Semgrep (SAST)**
- **Impact:** An attacker can bypass the authentication mechanism by injecting NoSQL operators into the login payload.
- **Pipeline Behavior:** Semgrep analyzes the static source code and identifies the dangerous pattern where user input flows into a database query unescaped.

## 3. Cross-Site Scripting (XSS)
- **Vulnerability:** The frontend application renders user-supplied product reviews directly into the DOM using `dangerouslySetInnerHTML` without proper encoding.
- **Detection Tool:** **Semgrep (SAST)** and **OWASP ZAP (DAST)**
- **Impact:** An attacker can inject malicious JavaScript that will execute in the browser of any user viewing the reviews, potentially stealing session tokens.
- **Pipeline Behavior:** 
  - Semgrep detects the use of dangerous React props in the static code.
  - ZAP actively injects XSS payloads into the running application and observes the reflection.

## 4. Vulnerable Base Images
- **Vulnerability:** The Dockerfiles for the frontend and backend utilize outdated base images (e.g., `node:14`) which contain known CVEs.
- **Detection Tool:** **Trivy**
- **Impact:** Container escapes or exploitation of known system libraries within the container environment.
- **Pipeline Behavior:** Trivy scans the built Docker images before they are pushed to the registry, identifying critical vulnerabilities in the OS packages and dependencies.

## 5. Infrastructure Misconfigurations
- **Vulnerability:** Kubernetes deployments lack proper security contexts (e.g., running as root, missing resource limits) and Terraform scripts expose overly permissive security groups.
- **Detection Tool:** **Checkov**
- **Impact:** Increases the blast radius if a container is compromised, allowing privilege escalation or lateral movement.
- **Pipeline Behavior:** Checkov scans the `k8s/` and `terraform/` directories in the CI pipeline, highlighting deviations from infrastructure best practices.
