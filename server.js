const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const caseRouter = require("./routes/case.router");
const { errorHandler } = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const rateLimiter = require("./middleware/rateLimit");
const morgan = require("morgan");

app.use(rateLimiter);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/case", caseRouter);
app.use("/", (req, res, next) => {
  res.send("running");
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
