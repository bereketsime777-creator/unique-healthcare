const mongoose = require("mongoose");
const dns = require("dns");


// Google DNS (helps with MongoDB SRV issues)
dns.setServers([
  "8.8.8.8",
  "8.8.4.4"
]);


const connectDB = async () => {

  try {

    const conn = await mongoose.connect(
      process.env.MONGODB_URI,
      {
        family: 4,
        serverSelectionTimeoutMS: 10000,
      }
    );


    console.log(
      "✅ MongoDB Connected Successfully"
    );


    console.log(
      "MongoDB Host:",
      conn.connection.host
    );


    console.log(
      "Database Name:",
      conn.connection.name
    );


  } catch (error) {


    console.error(
      "❌ MongoDB Connection Error:",
      error.message
    );


    process.exit(1);


  }

};


module.exports = connectDB;