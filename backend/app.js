require('dotenv').config();

const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const { userRouter } = require("./routes/userRoutes");
const { adminRouter } = require("./routes/adminRoutes");

// application middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Database connection
mongoose
  .connect("mongodb://localhost:27017/React_UMS")
  .then(() => {
    console.log("data base connected successfully");
  })
  .catch((error) => {
    console.log("Database Connection failed ", error);
  });

app.use("/api/users", userRouter);

app.use("/api/admin",adminRouter);

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`server started at http://localhost:${port}`);
});
