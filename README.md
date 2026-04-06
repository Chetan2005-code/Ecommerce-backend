🛒 Mini E-commerce Backend API

A scalable backend system for an e-commerce platform built using Node.js, Express.js, and MongoDB.
This project implements authentication, product management, cart system, and order processing with a clean and modular architecture.

---

🚀 Features

- 🔐 User Authentication (JWT-based login & register)
- 👤 Role-based Access (User / Admin)
- 📦 Product Management (CRUD APIs)
- 🛒 Cart System (Add / Remove items)
- 📑 Order Management (Place & track orders)
- ✅ Input Validation using Express Validator
- 🛡️ Secure APIs with Middleware
- 🧪 API Testing using Jest & Supertest

---

🧠 Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT (JSON Web Tokens)
- Validation: Express Validator
- Testing: Jest, Supertest

---

📁 Project Structure

src/
 ├── config/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── utils/
 ├── validations/
 ├── tests/
 ├── app.js
 └── server.js

---

⚙️ Installation & Setup

1. Clone the repository

git clone https://github.com/your-username/ecommerce-backend.git
cd ecommerce-backend

2. Install dependencies

npm install

3. Create ".env" file

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Run the server

npm run dev

---

🔑 API Endpoints

🔐 Auth Routes

POST   /api/auth/register   → Register user
POST   /api/auth/login      → Login user

📦 Product Routes

GET    /api/products        → Get all products
GET    /api/products/:id    → Get single product
POST   /api/products        → Create product (Admin)
PUT    /api/products/:id    → Update product
DELETE /api/products/:id    → Delete product

🛒 Cart Routes

POST   /api/cart            → Add to cart
GET    /api/cart            → Get user cart
DELETE /api/cart/:id        → Remove item

📑 Order Routes

POST   /api/orders          → Place order
GET    /api/orders          → Get user orders

---

🛡️ Middleware Used

- Authentication Middleware (JWT verification)
- Error Handling Middleware
- Validation Middleware

---

🧪 Testing

Run tests using:

npm test

---

🔥 Future Improvements

- 💳 Payment Integration (Razorpay / Stripe)
- 📸 Product Image Upload (Cloudinary)
- 📊 Admin Dashboard
- 🔍 Advanced Search & Filtering
- ⚡ Microservices Architecture

---

📌 Learning Outcomes

- Built RESTful APIs with Express.js
- Implemented authentication & authorization
- Designed scalable backend architecture
- Learned testing & validation best practices

---

👨‍💻 Author

Chaitanya Verma

---

⭐ If you like this project, give it a star!