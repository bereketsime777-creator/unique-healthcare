const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const messageRoutes = require("./routes/messageRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");


const app = express();


// ==============================
// Connect Database
// ==============================

connectDB();


// ==============================
// Middleware
// ==============================

const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ].filter(Boolean)
);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, curl, server-to-server)
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    console.warn(`CORS blocked origin: ${origin}`);
    callback(null, false);
  },
  credentials: true
}));

app.use(express.json());



// ==============================
// API Routes
// ==============================


// Authentication
app.use(
  "/api/auth",
  authRoutes
);


// Products
app.use(
  "/api/products",
  productRoutes
);


// Orders
app.use(
  "/api/orders",
  orderRoutes
);


// Admin Dashboard
app.use(
  "/api/dashboard",
  dashboardRoutes
);


// Chapa Payment
app.use(
  "/api/payment",
  paymentRoutes
);


// Messages / Contact
app.use(
  "/api/messages",
  messageRoutes
);

// Newsletter
app.use(
  "/api/newsletter",
  newsletterRoutes
);



// ==============================
// Test Route
// ==============================

app.get("/", (req, res) => {

  res.send(
    "🚀 Unique Healthcare API is Running..."
  );

});



// ==============================
// Start Server (Render Ready)
// ==============================

const PORT = process.env.PORT || 5000;


app.listen(PORT, "0.0.0.0", () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});