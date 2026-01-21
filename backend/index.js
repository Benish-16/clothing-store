require('dotenv').config();
const connectTOMongo=require('./db');
const express=require('express');
const cors=require('cors');
const passport = require("passport");
const jwt = require("jsonwebtoken");
connectTOMongo();
const app=express();
const PORT =  5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());


const corsOptions = {
  origin: "https://clothing-store-frontchh.onrender.com",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
  credentials: true,
};

app.use(cors(corsOptions));





app.use('/api/auth',require('./routes/auth'))
app.use('/api/product',require('./routes/product'))
app.use('/api/cart',require('./routes/cart'))
app.use('/api/order',require('./routes/order'))
app.use('/api/type',require('./routes/type'))
app.use("/api/contact", require("./routes/contact"));
app.use("/api/subscribe", require("./routes/subscription"));

