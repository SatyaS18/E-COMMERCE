const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//config

dotenv.config({ path: "backend/config/config.env" });

//connectiong to database

connectDatabase();

//creating a server

app.listen(process.env.PORT, (err) => {
  if (err) console.log(`Error: ${err}`);
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
