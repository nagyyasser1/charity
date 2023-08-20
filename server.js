const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const caseRouter = require("./routes/case.router");
const dependentRouter = require("./routes/dependent.router");
const boxRouter = require("./routes/box.route");
const { errorHandler } = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const rateLimiter = require("./middleware/rateLimit");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

app.use(rateLimiter);
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use("/api/v1/case", caseRouter);
app.use("/api/v1/dependent", dependentRouter);
app.use("/api/v1/box", boxRouter);

app.get("/api/v1/caseadd", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/add.html"));
});

app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server runing... on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
