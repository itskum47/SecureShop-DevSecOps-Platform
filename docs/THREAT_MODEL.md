# Threat Model

This diagram illustrates the trust boundaries, threat actors, and potential attack vectors within the SecureShop application. As an intentionally vulnerable application, these vectors are left open to demonstrate security detection capabilities.

```mermaid
flowchart TD
    %% Threat Actors
    ExternalAttacker(("External Attacker"))
    InternalThreat(("Malicious Insider"))

    %% Application Components
    subgraph "Trust Boundary: Application Network"
        Frontend[React Frontend]
        Backend[Node.js API]
        Database[(MongoDB)]
        SourceCode[Source Code Repository]
    end

    %% Attack Vectors
    ExternalAttacker -- "1. XSS (Cross-Site Scripting)" --> Frontend
    ExternalAttacker -- "2. NoSQL Injection" --> Backend
    ExternalAttacker -- "3. Privilege Escalation / Shell Execution" --> Backend
    
    Backend -- "Injected NoSQL Queries" --> Database
    
    InternalThreat -- "4. Hardcoded Secrets (AWS Keys)" --> SourceCode
    InternalThreat -- "5. IaC Misconfigurations" --> SourceCode

    classDef threatActor fill:#ffcccc,stroke:#ff0000,stroke-width:2px;
    class ExternalAttacker,InternalThreat threatActor;
    
    classDef boundary fill:none,stroke:#0000ff,stroke-width:2px,stroke-dasharray: 5 5;
    class "Trust Boundary: Application Network" boundary;
```

## Potential Attack Vectors Explained
1. **XSS (Cross-Site Scripting):** Malicious scripts can be injected into the frontend due to improper sanitization of user inputs.
2. **NoSQL Injection:** The Node.js API fails to properly validate inputs, allowing attackers to manipulate MongoDB queries.
3. **Hardcoded Secrets:** Sensitive information like AWS keys are committed directly to the source code repository.
4. **IaC Misconfigurations:** Kubernetes and Terraform files may expose unnecessary ports or lack proper security constraints.
5. **Runtime Anomalies:** Attackers might exploit vulnerabilities to gain a shell inside the container, violating runtime security policies.
