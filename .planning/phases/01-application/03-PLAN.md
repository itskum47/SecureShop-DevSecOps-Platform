---
wave: 1
depends_on: [01-PLAN.md, 02-PLAN.md]
files_modified: 
  - backend/models/User.js
  - backend/routes/auth.js
  - backend/models/Cart.js
  - backend/routes/cart.js
  - backend/models/Order.js
  - backend/routes/checkout.js
  - backend/server.js
  - frontend/src/App.jsx
  - frontend/src/components/Register.jsx
  - frontend/src/components/Login.jsx
autonomous: true
gap_closure: true
---

# Phase 01: Application Gap Closure Plan

## Phase Goal
Address missing table stakes from the application phase: Sign up with email/password, Checkout process, and backend Cart logic.

## Must-Haves
- `backend/models/User.js` supports an `email` field.
- `backend/routes/auth.js` has a `POST /register` endpoint.
- `backend/models/Cart.js` and `backend/routes/cart.js` implement backend cart storage.
- `backend/models/Order.js` and `backend/routes/checkout.js` implement checkout functionality.
- `frontend/src/components/Register.jsx` exists and connects to the backend.
- `frontend/src/App.jsx` and cart components are wired to call backend Cart and Checkout APIs.

## Tasks

```xml
<task>
  <id>1</id>
  <title>Implement Backend Registration and Update User Model</title>
  <description>Update the User schema to require email and implement the registration endpoint.</description>
  <read_first>
    - backend/models/User.js
    - backend/routes/auth.js
  </read_first>
  <action>
    1. Edit `backend/models/User.js` to add `email: { type: String, required: true, unique: true }`. Ensure `password: { type: String, required: true }` remains.
    2. Edit `backend/routes/auth.js` to add a `POST /register` endpoint. It must accept `email`, `username`, and `password` from `req.body`. 
    3. The `POST /register` endpoint must create a new User document using `User.create({ email, username, password })` (do NOT hash the password).
    4. On success, respond with `res.status(201).json({ _id: user._id, email: user.email, token: 'dummy-token' })`.
  </action>
  <acceptance_criteria>
    - `grep -q "email:" backend/models/User.js`
    - `grep -q "router.post('/register'" backend/routes/auth.js`
  </acceptance_criteria>
</task>

<task>
  <id>2</id>
  <title>Implement Backend Cart Logic</title>
  <description>Create a Cart model and route to manage a user's cart in the database.</description>
  <read_first>
    - backend/server.js
  </read_first>
  <action>
    1. Create `backend/models/Cart.js`. It must export a Mongoose model named "Cart" with schema `{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] }`.
    2. Create `backend/routes/cart.js`. It must define an Express router with:
       - `GET /:userId` to fetch a cart by `userId` and populate `items`. Return `res.json(cart)`.
       - `POST /add` to add a product to the cart. Accept `userId` and `productId` in `req.body`. Use `Cart.findOneAndUpdate({ userId }, { $push: { items: productId } }, { upsert: true, new: true })`. Return `res.json(cart)`.
       - `POST /remove` to remove an item. Accept `userId` and `productId` in `req.body`.
    3. Edit `backend/server.js` to require `backend/routes/cart.js` and mount it: `app.use('/api/cart', require('./routes/cart'));`.
  </action>
  <acceptance_criteria>
    - `test -f backend/models/Cart.js`
    - `test -f backend/routes/cart.js`
    - `grep -q "app.use('/api/cart'" backend/server.js`
  </acceptance_criteria>
</task>

<task>
  <id>3</id>
  <title>Implement Backend Checkout Logic</title>
  <description>Create an Order model and checkout route.</description>
  <read_first>
    - backend/server.js
  </read_first>
  <action>
    1. Create `backend/models/Order.js`. Export a Mongoose model named "Order" with schema `{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], status: { type: String, default: 'Pending' } }`.
    2. Create `backend/routes/checkout.js`. Define an Express router with `POST /`. 
       - Accept `userId` from `req.body`.
       - Find the user's cart via `Cart.findOne({ userId })`.
       - Create a new Order via `Order.create({ userId, items: cart.items })`.
       - Clear the user's cart via `Cart.findOneAndUpdate({ userId }, { items: [] })`.
       - Return `res.status(201).json({ message: 'Order placed successfully', orderId: order._id })`.
    3. Edit `backend/server.js` to require and mount it: `app.use('/api/checkout', require('./routes/checkout'));`.
  </action>
  <acceptance_criteria>
    - `test -f backend/models/Order.js`
    - `test -f backend/routes/checkout.js`
    - `grep -q "app.use('/api/checkout'" backend/server.js`
  </acceptance_criteria>
</task>

<task>
  <id>4</id>
  <title>Implement Frontend Registration</title>
  <description>Add a sign-up form and integrate it with the frontend.</description>
  <read_first>
    - frontend/src/components/Login.jsx
    - frontend/src/App.jsx
  </read_first>
  <action>
    1. Create `frontend/src/components/Register.jsx`. It must render a form with inputs for `email`, `username`, and `password`.
    2. On form submit, `fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, username, password }) })`.
    3. On success, call `props.setToken(data.token)` and `props.setUserId(data._id)`.
    4. Edit `frontend/src/components/Login.jsx` to ensure it also sets userId: `props.setUserId(data._id)`.
    5. Edit `frontend/src/App.jsx` to manage `userId` state (`const [userId, setUserId] = useState(null)`).
    6. In `App.jsx`, add a state `const [showRegister, setShowRegister] = useState(false)`. Render `<Register>` if `showRegister` is true and no token, else render `<Login>`.
  </action>
  <acceptance_criteria>
    - `test -f frontend/src/components/Register.jsx`
    - `grep -q "setUserId(data._id)" frontend/src/components/Login.jsx`
    - `grep -q "setShowRegister" frontend/src/App.jsx`
  </acceptance_criteria>
</task>

<task>
  <id>5</id>
  <title>Integrate Cart & Checkout Frontend</title>
  <description>Modify App.jsx to use the backend API for Cart and Checkout.</description>
  <read_first>
    - frontend/src/App.jsx
  </read_first>
  <action>
    1. Edit `frontend/src/App.jsx`.
    2. Update `addToCart`: make a POST request to `/api/cart/add` with `{ userId, productId: product._id }`. Then update `cartItems` locally or refetch.
    3. Update `checkout`: make a POST request to `/api/checkout` with `{ userId }`. Then `setCartItems([])` and `alert('Checkout successful!')`.
  </action>
  <acceptance_criteria>
    - `grep -q "api/cart/add" frontend/src/App.jsx`
    - `grep -q "api/checkout" frontend/src/App.jsx`
  </acceptance_criteria>
</task>
```
