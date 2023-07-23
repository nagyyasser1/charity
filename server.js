const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const caseRouter = require("./routes/case.router");
const dependentRouter = require("./routes/dependent.router");
const { errorHandler } = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const rateLimiter = require("./middleware/rateLimit");
const morgan = require("morgan");
const cors = require("cors");
const expressFileUpload = require("express-fileupload");
const path = require("path");

app.use(rateLimiter);
app.use(morgan("dev"));
app.use(cors());
app.use(expressFileUpload());
app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use("/api/v1/case", caseRouter);
app.use("/api/v1/dependent", dependentRouter);

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
