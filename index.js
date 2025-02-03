// Import required modules
const express = require("express");
const app = express();
const morgan = require("morgan");
const swaggerJSDoc = require("./swagger");
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Logging middleware
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :remote-addr :user-agent :referrer"
  )
);

// Sample product database
const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
];

// Orders and Payments storage
const orders = [];
const payments = [];

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Welcome message
 */
app.get("/", (req, res) => {
  res.send("Welcome to the Ecommerce QA API");
});

// GET /products - Fetch all products
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Fetch all products
 *     responses:
 *       200:
 *         description: Success
 */
app.get("/products", (req, res) => {
  res.json(products);
});

// POST /orders - Create an order
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: number
 *                 description: ID of the product
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product
 *             example:
 *               productId: 1
 *               quantity: 2
 *     responses:
 *       201:
 *         description: Created
 *       404:
 *         description: Product not found
 *
 */
app.post("/orders", (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const order = {
    id: orders.length + 1,
    productId,
    quantity,
    total: product.price * quantity,
  };
  orders.push(order);
  res.status(201).json(order);
});

// POST /payments - Make a payment
/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Make a payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - amount
 *             properties:
 *               orderId:
 *                 type: number
 *                 description: ID of the order
 *               amount:
 *                 type: number
 *                 description: Amount of the payment
 *     responses:
 *       200:
 *         description: Payment successful
 *       404:
 *         description: Order not found
 *       400:
 *         description: Insufficient payment amount/Payment amount exceeds order total
 */
app.post("/payments", (req, res) => {
  const { orderId, amount } = req.body;
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (amount < order.total) {
    return res.status(400).json({ error: "Insufficient payment amount" });
  }

  if (amount > order.total) {
    return res.status(400).json({
      error: "Payment amount exceeds order total, please pay " + order.total,
    });
  }

  payments.push({ orderId, amount, status: "Paid" });
  res.json({ message: "Payment successful", orderId, amount });
});

// Initialize Swagger documentation
swaggerJSDoc(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
