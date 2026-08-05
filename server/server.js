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


const app = express();


// Connect Database
connectDB();


// Middleware
app.use(cors());

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





// ==============================
// Test Route
// ==============================


app.get("/", (req, res) => {

  res.send(
    "🚀 Unique Healthcare API is Running..."
  );

});





// ==============================
// Start Server
// ==============================


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );

});