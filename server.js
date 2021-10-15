const app = require("./backend/app");
const dotenv = require('dotenv')
const connectDatabase = require("./backend/config/database");



// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: __dirname + '/.env' });
}



// Connecting to database
connectDatabase();

const PORT = process.env.PORT || 5000;


const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});