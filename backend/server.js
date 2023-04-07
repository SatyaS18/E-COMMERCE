const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//HANDLING UNCAUGHT EXCEPTION
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server dur to Uncaught Exception`);
  process.exit(1);
});

//config

dotenv.config({ path: "backend/config/config.env" }); //it loads the environment variable from the config.env file and puts it in the process.env object

//connecting to database
connectDatabase();

//creating a server

const server = app.listen(process.env.PORT, (err) => {
  if (err) console.log(`Error: ${err}`);
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//UNHANDLED PROMISE REJECTION
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
