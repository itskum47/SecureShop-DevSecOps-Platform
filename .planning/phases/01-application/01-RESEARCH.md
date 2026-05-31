## RESEARCH COMPLETE

### Phase 1: Application - Research & Planning Insights

To successfully plan and execute Phase 1 (Building the vulnerable e-commerce application), we need to address the following technical and architectural considerations:

#### 1. Tech Stack Selection
*   **Frontend**: React (Vite recommended for faster builds).
*   **Backend**: Node.js with Express.
*   **Database**: MongoDB (Mongoose ORM or native driver).

#### 2. Deliberate Vulnerabilities Strategy
Since this is a DevSecOps project, the code *must* be vulnerable to trigger pipeline security scans (Semgrep, ZAP, etc.):
*   **XSS (Cross-Site Scripting)**: 
    *   *Implementation*: React dangerouslySetInnerHTML used in the product descriptions or displaying user reviews.
*   **Injection (NoSQL Injection / SQLi)**: 
    *   *Implementation*: Instead of properly sanitizing inputs in the `Login` or `Product Search` endpoints, pass raw user input (like `req.body.username`) directly into the MongoDB query object.
*   **Hardcoded Secrets**: 
    *   *Implementation*: Hardcode a dummy AWS Access Key, JWT secret, or database password in a configuration file or directly in the backend code to ensure tools like Gitleaks and Semgrep catch it.

#### 3. Core Features Scope (Minimalist Approach)
The roadmap emphasizes keeping the application simple to focus on the pipeline:
*   **Auth (Register/Login)**: Unhashed or poorly hashed passwords, susceptible to NoSQLi.
*   **Product List**: Fetch products from MongoDB. Allow searching (vulnerable to injection) and display descriptions (vulnerable to XSS).
*   **Cart & Checkout**: Simple state management in React, passing order details to the backend without strict validation (Insecure Direct Object Reference or lack of input validation).

#### 4. Setup & Integration
*   Ensure both frontend and backend can be run locally for testing before moving to Phase 2 (Repository Structure) and Phase 3 (Dockerization).
*   Mock data: Include a database seeding script to populate initial products so the application is immediately usable.

This research provides the necessary constraints and security anti-patterns required to write a detailed technical plan for Phase 1.
