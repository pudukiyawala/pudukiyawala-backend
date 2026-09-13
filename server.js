const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const orders = [];

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "PudukiyaWala backend is running"
  });
});

app.post("/api/orders", (req, res) => {
  const order = {
    id: Date.now().toString(),
    ...req.body,
    status: "New",
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  res.status(201).json({
    success: true,
    message: "Order received",
    order
  });
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.patch("/api/orders/:id", (req, res) => {
  const order = orders.find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found"
    });
  }

  order.status = req.body.status || order.status;

  res.json({
    success: true,
    order
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`PudukiyaWala backend running on port ${PORT}`);
});
