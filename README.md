# 🛒 E-Commerce Platform (React + Zustand + Tailwind)

Multi-role e-commerce web app built with **React**.  
Supports **User**, **Seller**, and **Admin** roles with role-based routing, product management, order flows, and API integration.  

---

## 🚀 Features

### 👤 User
- Browse & search products
- Product detail page
- Cart → Checkout flow
- Order history & status tracking
- Infinite scroll + skeleton loading

### 🏪 Seller
- Seller profile (edit avatar, store info, contact)
- Manage products (CRUD local/dummy)
- Dashboard with sales/order stats
- Order management (status update)

### 👑 Admin
- Admin dashboard
- Manage users (ban/unban)
- Manage stores & products
- Full moderation across the platform

---

## 🧱 Tech Stack
- **React + React Router**
- **Zustand** (state management + auth)
- **Tailwind CSS + Bootstrap** (styling & grid)
- **Lucide React & Font Awesome** (icons)
- **react-toastify** (notifications)
- **react-loading-skeleton** (loading states)
- **Recharts** (dashboard charts)
- **jspdf-autotable** (PDF export)

---

## 🔐 Authentication
- Auth state persisted in **localStorage**
- **Role-based access**: `user`, `seller`, `admin`
- Guards: `PrivateRoute` + `RoleRoute`

---

## 📂 Project Structure
src/
├── assets/ # images, icons
├── components/ # shared components (Navbar, Footer, etc.)
├── pages/ # route pages (Home, Products, About, Contact, FAQ, etc.)
├── seller/ # seller dashboard pages
├── admin/ # admin dashboard pages
├── store/ # zustand stores (auth, etc.)
├── utils/ # helpers, API hooks (useRemote, etc.)
├── App.js # main router
└── main.jsx # entrypoint

yaml
Copy code

---

## 🧪 Dummy Data
- `users.json` — sample users (`user`, `seller`, `admin`)
- `stores.json` — store data (linked to seller)
- `products.json` — product catalog
- `orders.json` — user orders  

Stored in `/public/data/` or seeded into **localStorage**.

---

## 🌐 API Integration
- Products & categories fetched from **Dummy JSON API**
- LocalStorage fallback for:
  - `orders` (checkout)
  - `auth` (login/register)

---

## ⚡ Setup & Run

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
2. Install dependencies
bash
Copy code
npm install
3. Run dev server
bash
Copy code
npm run dev
App runs on http://localhost:5173/ (Vite default)

📊 Roadmap / Phases
Phase 1 — Foundation
React + Router setup

Zustand store

Auth (login/register/logout)

Static pages (About, Contact, FAQ)

Phase 2 — User Features
Product listing + detail

Cart & checkout

Order history

Phase 3 — Seller Features
Seller dashboard

Manage products

Sales statistics

Phase 4 — Admin Features
Admin dashboard

User & store management

Product moderation

Phase 5 — UI/UX Enhancements
Dark mode

Skeleton loading

Infinite scroll

Responsive navbar & footer

Toast notifications

Phase 6 — API Integration
Fetch products/categories via API

LocalStorage fallback for unsupported data

📝 License

Vrz License © 2025 — EFWAN RIZALDI


---
