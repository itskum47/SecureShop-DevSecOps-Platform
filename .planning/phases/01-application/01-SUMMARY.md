---
phase: 01-application
plan: 01
subsystem: backend
tags: [nodejs, express, mongodb, mongoose, vulnerable]

# Dependency graph
requires: []
provides:
  - Node.js/Express backend setup
  - MongoDB connection using Mongoose
  - Intentionally vulnerable auth route (NoSQLi, unhashed passwords)
  - Intentionally vulnerable product route (NoSQLi)
  - Hardcoded AWS key for secret scanning detection
affects: [02-repository, 03-docker]

# Tech tracking
tech-stack:
  added: [express, mongoose, cors, dotenv]
  patterns: [intentionally-vulnerable-backend]

key-files:
  created: [backend/server.js, backend/config/db.js, backend/routes/auth.js, backend/routes/products.js, backend/models/User.js, backend/models/Product.js]
  modified: [backend/package.json, backend/.env.example]

key-decisions:
  - "Decided to keep MongoDB connect options minimal as modern Mongoose handles defaults well"
  - "Intentionally disabled password hashing to fulfill the DevSecOps vulnerable code requirement"
  - "Injected a hardcoded AWS key as a dummy variable to trigger future Gitleaks scans"

patterns-established:
  - "Intentionally Vulnerable Code: Left inputs unsanitized and secrets hardcoded for DevSecOps pipelines"

requirements-completed:
  - Build Node.js/Express backend
  - Setup MongoDB connection
  - Implement intentionally vulnerable code (NoSQLi, hardcoded secrets)

# Metrics
duration: 3min
completed: 2026-05-31
---

# Phase 1 Plan 1: Application - Backend & Database Plan Summary

**Node.js Express backend with MongoDB featuring deliberate NoSQLi and hardcoded secrets for DevSecOps testing**

## Performance

- **Duration:** 3 min
- **Started:** 2026-05-31T08:07:09Z
- **Completed:** 2026-05-31T08:10:00Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments
- Initialized Express backend with CORS and dotenv
- Created MongoDB connection using Mongoose
- Implemented user and product models without password hashing
- Created auth and product routes with deliberate NoSQL Injection vulnerabilities
- Included hardcoded AWS secret for pipeline testing

## Task Commits

Each task was committed atomically:

1. **Task 1: Initialize the backend project in the backend directory** - `3f532e4` (feat)
2. **Task 2: Set up MongoDB connection and Models** - `01f75f7` (feat)
3. **Task 3: Implement Authentication and Product Routes with deliberate vulnerabilities** - `10040dd` (feat)

## Files Created/Modified
- `backend/package.json` - Node project config and dependencies
- `backend/server.js` - Express app entry point
- `backend/.env.example` - Example environment variables including hardcoded secret
- `backend/config/db.js` - MongoDB connection handler
- `backend/models/User.js` - User schema (vulnerable: plaintext password)
- `backend/models/Product.js` - Product schema
- `backend/routes/auth.js` - Login route (vulnerable: NoSQLi)
- `backend/routes/products.js` - Search route (vulnerable: NoSQLi) and hardcoded AWS key

## Decisions Made
- Used `npm install --no-package-lock` after a corrupted cache issue, to ensure dependencies installed correctly.
- Skipped modern `useNewUrlParser` and `useUnifiedTopology` options in mongoose connect as they are deprecated and no longer necessary in Mongoose 6+.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] npm install failed due to corrupt cache**
- **Found during:** Task 1 (Initialize backend)
- **Issue:** `npm install` failed with corrupted cache for `cors` package
- **Fix:** Retried `npm install` with `--no-package-lock` which succeeded.
- **Files modified:** `backend/package.json`
- **Verification:** Packages installed successfully
- **Committed in:** `3f532e4`

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** None, just a temporary local setup hiccup.

## Issues Encountered
- `npm install` failed initially due to a corrupted cache entry. Resolved by running the install without package lock to bypass the local cache glitch.

## User Setup Required

None - no external service configuration required at this stage.

## Next Phase Readiness
- Application backend is complete and intentionally vulnerable. Ready for Phase 2 (Repository structure & GitHub Actions setup).

---
*Phase: 01-application*
*Completed: 2026-05-31*
