# System Architecture

The following diagram illustrates the high-level architecture of the SecureShop DevSecOps platform, highlighting the interaction between the React frontend, Node.js backend, and MongoDB database, all deployed within a Kubernetes environment.

```mermaid
flowchart TD
    subgraph Kubernetes Cluster
        subgraph Frontend Pod
            UI[React Frontend]
            Nginx[Nginx Reverse Proxy]
            UI --- Nginx
        end

        subgraph Backend Pod
            API[Node.js / Express API]
        end

        subgraph Database Pod
            DB[(MongoDB)]
        end

        Nginx -- "/api/*" --> API
        API -- "Mongoose (NoSQL)" --> DB
    end

    User((User/Attacker)) -->|HTTP/HTTPS| Nginx
    
    classDef pod fill:#f9f,stroke:#333,stroke-width:2px;
    class Frontend Pod,Backend Pod,Database Pod pod;
```
