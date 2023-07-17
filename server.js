const app = require("express")();
require("dotenv").config();
const connectDB = require("./config/db");
const caseRouter = require("./routes/case.router");

app.use("/api/v1/case", caseRouter);
app.get("/", (req, res, next) => {
  next({ message: "/ not recommended" }); // Express will catch this on its own.
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went Worng!";
  console.error(err.stack);
  res.status(500).json({
    status,
    message,
  });
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server runing... on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
