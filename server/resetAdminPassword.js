const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const resetPassword = async () => {
  try {

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");


    const newPassword = "admin123";


    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );


    const user = await User.findOneAndUpdate(

      {
        email: "admin@uniquehealthcare.com"
      },

      {
        password: hashedPassword
      },

      {
        new: true
      }

    );


    if(user){

      console.log("Admin password reset successfully");
      console.log("New password:", newPassword);

    } else {

      console.log("Admin user not found");

    }


    process.exit();

  } catch(error){

    console.log(error);
    process.exit(1);

  }
};


resetPassword();
