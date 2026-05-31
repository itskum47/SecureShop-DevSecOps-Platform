---
wave: 1
depends_on: []
files_modified:
  - backend/package.json
  - backend/server.js
  - backend/config/db.js
  - backend/routes/products.js
  - backend/routes/auth.js
  - backend/models/Product.js
  - backend/models/User.js
  - backend/.env.example
autonomous: true
---

# Phase 1: Application - Backend & Database Plan

## Goal
Build the intentionally vulnerable Node.js/Express backend and MongoDB connection for the SecureShop DevSecOps platform.

## Requirements Addressed
- Build Node.js/Express backend
- Setup MongoDB connection
- Implement intentionally vulnerable code (NoSQLi, hardcoded secrets)

## Tasks

<task>
<action>
Initialize the backend project in the `backend` directory.
1. Create `backend` directory.
2. Run `npm init -y` inside `backend`.
3. Install dependencies: `express`, `mongoose`, `cors`, `dotenv`.
4. Create `backend/server.js` with a basic Express app setup listening on port 5000 and enabling CORS.
5. Create `backend/.env.example` with `MONGO_URI=mongodb://localhost:27017/secureshop` and a hardcoded vulnerable secret: `JWT_SECRET=supersecret_admin_key_123` to trigger secret scanners later.
</action>
<read_first>
- .planning/phases/01-application/01-RESEARCH.md
</read_first>
<acceptance_criteria>
- `backend/package.json` exists and contains express and mongoose.
- `backend/server.js` exists and listens on port 5000.
- `backend/.env.example` contains the exact string `JWT_SECRET=supersecret_admin_key_123`.
</acceptance_criteria>
</task>

<task>
<action>
Set up MongoDB connection and Models.
1. Create `backend/config/db.js` that connects to MongoDB using Mongoose and `process.env.MONGO_URI`.
2. Create `backend/models/User.js` with a Mongoose schema containing `username` and `password` (stored in plain text, unhashed).
3. Create `backend/models/Product.js` with a Mongoose schema containing `name`, `description`, and `price`.
</action>
<read_first>
- backend/server.js
</read_first>
<acceptance_criteria>
- `backend/config/db.js` exports a connection function.
- `backend/models/User.js` defines a schema without password hashing.
</acceptance_criteria>
</task>

<task>
<action>
Implement Authentication and Product Routes with deliberate vulnerabilities.
1. Create `backend/routes/auth.js` with a POST `/login` endpoint. To make it vulnerable to NoSQL Injection, pass `req.body` directly to `User.findOne(req.body)` without validation.
2. Create `backend/routes/products.js` with a GET `/` endpoint that fetches all products, and a GET `/search` endpoint that passes `req.query` directly into `Product.find(req.query)` (also vulnerable to NoSQLi).
3. Include a dummy hardcoded AWS key directly in `backend/routes/products.js` as a comment or unused variable: `const AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE";` to ensure tools like Gitleaks flag it.
4. Mount both routers in `backend/server.js`.
</action>
<read_first>
- backend/models/User.js
- backend/models/Product.js
- backend/server.js
</read_first>
<acceptance_criteria>
- `backend/routes/auth.js` contains `User.findOne(req.body)`.
- `backend/routes/products.js` contains the exact string `AKIAIOSFODNN7EXAMPLE`.
- `backend/server.js` imports and uses the auth and product routes.
</acceptance_criteria>
</task>

## Verification
### must_haves
- The backend successfully connects to a local MongoDB (when running).
- Vulnerable NoSQLi logic is explicitly implemented in the auth route.
- A hardcoded secret (`AKIAIOSFODNN7EXAMPLE`) is present in the codebase.
