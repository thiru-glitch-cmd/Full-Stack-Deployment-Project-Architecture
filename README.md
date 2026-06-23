# 🛒 ShopSphere

ShopSphere is a premium, modern, responsive e-commerce web application built using **React** and **Vite**. It provides a complete online shopping experience including product browsing, detailed product views, a persistent cart system, and a simulated secure checkout process.

---

##  Features

- **Dynamic Product Catalog**: Browse products with live filtering/searching capabilities.
- **Detailed Product Views**: View key specifications, pricing, and description for individual products.
- **Persistent Shopping Cart**: Managed with React Context API and synced automatically with `localStorage` so items remain even after a page refresh.
- **Secure Checkout Experience**: A simulated checkout form validating card information (16-digit card number, CVV, expiry date format) and calculating subtotal, GST (18%), shipping, and grand total.
- **Modern UI & Responsive Design**: Designed with glassmorphism, responsive grid layouts, custom buttons, and elegant micro-animations.

---

##  Tech Stack

- **Core**: React 19, JavaScript (ES6+)
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **State Management**: React Context API
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid)

---

##  Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Navigate to the `shopsphere` folder:
   ```bash
   cd shopsphere
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local address (typically `http://localhost:5173`).

---

##  Building for Production

To build the project for production, run:
```bash
npm run build
```
This generates a static `dist/` directory ready to be deployed to any hosting provider (Vercel, Netlify, GitHub Pages, etc.).

---

##  Deployment Configuration

Because this application uses client-side routing (`react-router-dom`), ensure you configure your hosting provider to redirect all requests to `index.html` to prevent `404 Not Found` errors on page refresh:

- **Vercel**: Add a `vercel.json` in the root:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- **Netlify**: Add a `_redirects` file in the `public/` directory:
  ```text
  /*    /index.html   200
  ```
