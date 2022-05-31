const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/user");
const productsRoute = require("./routes/product");
const cartsRoute = require("./routes/cart");
const ordersRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

//connect to mongodb database
mongoose.connect(process.env.MONGO_URL).then(() => console.log("db connections successfull")
).catch((e) => console.log(e));

app.use(cors());
app.use(express.json());//enable app to pass json
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/checkout", stripeRoute);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
  
}

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});