const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToMongo = () => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(process.env.db_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Welcome to MongoDB!!");
    })
    .catch((err) => {
      console.log(err);
    });
};
// mongoose.connection.once("open", async() => {
//     console.log("Connected to MongoDB Cluster");
//     // try {
//     //   const data = await batchData.find({});
//     //   console.log(data);
//     // } catch (error) {
//     //   console.log(error);
//     // }
// });
// mongoose.connection.on("error", (error) => {
//   console.log(error.message);
// });
// mongoose.connection.on("disconnected", () => {
//   console.log("Disconnected for MongoDB Cluster");
// });

module.exports = connectToMongo;