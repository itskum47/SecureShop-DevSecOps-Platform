# CI/CD Flow and Security Pipeline

The following flowchart details the GitHub Actions pipeline implemented for the SecureShop application, highlighting the various security scanning stages.

```mermaid
flowchart TD
    Start((Developer Push/PR)) --> Build[Build Stage]
    
    subgraph "CI Security Pipeline"
        Build --> Gitleaks[Gitleaks: Secret Detection]
        Build --> Semgrep[Semgrep: SAST for XSS/NoSQLi]
        Build --> Checkov[Checkov: IaC Scan (K8s/Terraform)]
        
        Gitleaks --> DepCheck[Dependency Review]
        Semgrep --> DepCheck
        Checkov --> DepCheck
    end
    
    DepCheck --> DockerBuild[Docker Build Images]
    
    DockerBuild --> Trivy[Trivy: Container Vulnerability Scan]
    
    Trivy --> PushRegistry[Push to ghcr.io]
    PushRegistry --> Deploy[Deploy to Kubernetes]
    
    Deploy --> ZAP[OWASP ZAP: DAST Scan]
    
    ZAP --> End((Pipeline Complete))

    classDef scan fill:#ffd54f,stroke:#f57f17,stroke-width:2px;
    class Gitleaks,Semgrep,Checkov,DepCheck,Trivy,ZAP scan;
    
    classDef deploy fill:#81c784,stroke:#388e3c,stroke-width:2px;
    class DockerBuild,PushRegistry,Deploy deploy;
```
