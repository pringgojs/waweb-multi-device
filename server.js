const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error");
// const connectDB = require("./config/db");
const client = require("./utils/client");

// Load env vars
dotenv.config({
  path: "./config/config.env",
});

// Connect to database
// connectDB();
// Route files
const whatsapp = require("./routes/whatsapp");

const app = express();

// Body parser
app.use(express.json());
// Logging in middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/whatsapp", whatsapp);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `App listening in ${process.env.NODE_ENV} mode n port ${PORT}!`.yellow.bold
  );
});

// Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  // Close server & exit process
  server.close(() => process.exit(1));
});
