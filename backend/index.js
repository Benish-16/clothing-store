require('dotenv').config();
const connectTOMongo=require('./db');
const express=require('express');
const cors=require('cors');
const passport = require("passport");
const jwt = require("jsonwebtoken");
connectTOMongo();
const app=express();
const port=5000
app.use(express.json());


const corsOptions = {
  origin: "https://clothing-store-frontcheck.onrender.com",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use('/api/auth',require('./routes/auth'))
app.use('/api/product',require('./routes/product'))
app.use('/api/cart',require('./routes/cart'))
app.use('/api/order',require('./routes/order'))
app.use('/api/type',require('./routes/type'))
app.use("/api/contact", require("./routes/contact"));
app.use("/api/subscribe", require("./routes/subscription"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
