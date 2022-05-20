const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

dotenv.config();
//connect to mongodb database
mongoose.connect(process.env.MONGO_URL).then(() => console.log("db connections successfull")
).catch((e) => console.log(e));

app.use(express.json());//enable app to pass json
app.use("/api/auth", authRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});