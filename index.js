const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const router = require("./router/router");
const mongoose = require("mongoose");
const cors = require("cors");

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.DATABASE_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Sccessfully Connected");
  } catch (error) {
    console.log({ error });
  }
}

connectToMongoDB();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/", router);

app.listen(port, "0.0.0.0", () => {
  console.log(`server is running on port ${port}`);
});
