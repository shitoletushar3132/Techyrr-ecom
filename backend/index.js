const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const router = require("./routes/index");
var cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: "https://ecom-techyrr-project.onrender.com",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use("/api", router);

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
  });
});
