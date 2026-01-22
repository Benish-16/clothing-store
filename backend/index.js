require("dotenv").config();
const connectTOMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectTOMongo();
const app = express();


const PORT =  5000;

const allowedOrigins = [
  "https://clothing-store-frontchh.onrender.com",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
  })
);

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/product'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/order', require('./routes/order'));
app.use('/api/type', require('./routes/type'));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/subscribe", require("./routes/subscription"));


app.get("/health", (req, res) => res.send("OK"));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
