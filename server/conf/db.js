const mongoose = require("mongoose");
require("dotenv").config();

const confDB = {
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  cluster: process.env.CLUSTER,
  database: process.env.DATEBASE,
  getMongoURL: function () {
    return `mongodb+srv://${this.username}:${this.password}@${this.cluster}/${this.database}`;
  },
};

const connectDB = async () => {
  try {
    await mongoose.connect(confDB.getMongoURL(), {
      retryWrites: true,
      w: "majority",
    });
    console.log("DB Connection Successful!");
  } catch (err) {
    console.error("DB Connection Failed:", err);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("DB Disconnected Successful!");
  } catch (err) {
    console.error("DB Disconnection Failed:", err);
  }
};

module.exports = {
  confDB,
  connectDB,
  disconnectDB,
};
