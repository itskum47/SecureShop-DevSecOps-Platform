# Phase 10: Documentation - Context

## Approach
- Write a comprehensive `README.md` at the root of the project explaining the SecureShop DevSecOps Platform.
- Create architectural, threat modeling, and CI/CD flow diagrams using Mermaid syntax inside a new `docs/` folder.
- Compile a mock `docs/SECURITY_FINDINGS.md` report summarizing the intentional vulnerabilities injected into the project and how the CI/CD pipeline caught them.

## Decisions
- **Documentation Format:** We will use standard Markdown and Mermaid JS for all diagrams to ensure they are rendered directly and natively on GitHub. This is the best approach for a portfolio project.
- **Content Focus:** The documentation will clearly emphasize that this is a *deliberately vulnerable* application created to demonstrate DevSecOps automation, catering specifically to technical recruiters and hiring managers.
- **Deliverables:**
  - `README.md` (Project overview, setup, tech stack)
  - `docs/ARCHITECTURE.md` (Mermaid system architecture diagram)
  - `docs/THREAT_MODEL.md` (Mermaid trust boundaries and threat vectors)
  - `docs/CI_CD_FLOW.md` (Mermaid sequence/flowchart of the GitHub Actions pipeline)
  - `docs/SECURITY_FINDINGS.md` (Summary of vulnerabilities detected by Gitleaks, Semgrep, Trivy, ZAP, and Checkov)
