---
wave: 2
depends_on:
  - 01-PLAN.md
files_modified:
  - frontend/package.json
  - frontend/vite.config.js
  - frontend/src/App.jsx
  - frontend/src/components/ProductList.jsx
  - frontend/src/components/Cart.jsx
  - frontend/src/components/Login.jsx
autonomous: true
---

# Phase 1: Application - Frontend Plan

## Goal
Build the intentionally vulnerable React frontend for the SecureShop DevSecOps platform.

## Requirements Addressed
- Build React frontend
- Implement basic features (Login, Register, Product list, Cart, Checkout)
- Implement intentionally vulnerable code (XSS)

## Tasks

<task>
<action>
Initialize the React frontend using Vite.
1. Run `npm create vite@latest frontend -- --template react` from the project root.
2. Inside `frontend`, run `npm install`.
3. Install `axios` for API calls: `npm install axios`.
4. Update `frontend/vite.config.js` to configure a proxy for `/api` requests to `http://localhost:5000`.
</action>
<read_first>
- backend/server.js
</read_first>
<acceptance_criteria>
- `frontend/package.json` exists.
- `frontend/vite.config.js` contains a proxy configuration pointing to port 5000.
</acceptance_criteria>
</task>

<task>
<action>
Implement basic components with deliberate XSS vulnerabilities.
1. Create `frontend/src/components/Login.jsx` with a simple login form. It doesn't need real validation since the backend is vulnerable.
2. Create `frontend/src/components/ProductList.jsx` to fetch and display products. 
3. *Vulnerability Requirement*: In `ProductList.jsx`, render the product description using `dangerouslySetInnerHTML={{ __html: product.description }}` to make it vulnerable to XSS. This will be caught by DAST (ZAP) later.
4. Create `frontend/src/components/Cart.jsx` for basic state management of the shopping cart.
</action>
<read_first>
- frontend/src/App.jsx
</read_first>
<acceptance_criteria>
- `frontend/src/components/ProductList.jsx` contains the exact string `dangerouslySetInnerHTML`.
- `frontend/src/components/Login.jsx` and `frontend/src/components/Cart.jsx` exist and export React components.
</acceptance_criteria>
</task>

<task>
<action>
Assemble the main application structure.
1. Update `frontend/src/App.jsx` to render the `Login`, `ProductList`, and `Cart` components. A simple conditional rendering for state (e.g., logged in or not) is sufficient; no need for complex routers for this minimalist setup.
2. Ensure the API calls point to `/api/products` and `/api/login` so they use the Vite proxy.
</action>
<read_first>
- frontend/src/components/ProductList.jsx
- frontend/src/components/Login.jsx
</read_first>
<acceptance_criteria>
- `frontend/src/App.jsx` imports `ProductList`, `Login`, and `Cart`.
</acceptance_criteria>
</task>

## Verification
### must_haves
- The React application builds successfully.
- The `ProductList.jsx` explicitly uses `dangerouslySetInnerHTML` to introduce an XSS vulnerability.
