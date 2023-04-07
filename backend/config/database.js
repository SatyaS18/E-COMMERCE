const mongoose = require("mongoose");

//connect to mongodb
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      //the following lines are deprecated

      // useCreateIndexes: true,
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
  // .catch((err) => {
  //   console.log(err);
  // });
  //we commented it so that error will be unhandled when promise is rejected
};

module.exports = connectDatabase;
