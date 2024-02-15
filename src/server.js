require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const caseRouter = require("./routes/case.router");
const caseMonthlyRouter = require("./routes/case.monthly.router");
const caseRoofRouter = require("./routes/case.roof.router");
const caseLoanRouter = require("./routes/case.loan.router");
const caseDebtRouter = require("./routes/case.debt.router");
const caseTreatmentRouter = require("./routes/case.treatment.router");
const caseFurnitureRouter = require("./routes/case.furniture.router");
const caseOperationRouter = require("./routes/case.operation.router");
const storeRouter = require("./routes/store.router");
const townRouter = require("./routes/town.router");
const { errorHandler } = require("./middleware/system/errorHandler");
const notFound = require("./middleware/system/notFound");
const rateLimiter = require("./middleware/system/rateLimit");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// serve case routes
app.use("/api/v1/case/monthly", caseMonthlyRouter);
app.use("/api/v1/case/roof", caseRoofRouter);
app.use("/api/v1/case/loan", caseLoanRouter);
app.use("/api/v1/case/debt", caseDebtRouter);
app.use("/api/v1/case/treatment", caseTreatmentRouter);
app.use("/api/v1/case/furniture", caseFurnitureRouter);
app.use("/api/v1/case/operation", caseOperationRouter);
app.use("/api/v1/case", caseRouter);

// serve store routes
app.use("/api/v1/store", storeRouter);

// serve towns routes
app.use("/api/v1/town", townRouter);

app.use(notFound);
app.use(errorHandler);

const port = 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server runing... on port  ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
