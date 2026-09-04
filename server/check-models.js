require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, { family: 4 })
  .then(async () => {
    const Product = require("./models/Product");
    
    const productsWithModels = await Product.find({ 
      model: { $ne: "" } 
    }).select('name model').limit(5);

    console.log("Products with models:\n");
    productsWithModels.forEach(p => {
      console.log(`${p.name}`);
      console.log(`Models: ${p.model}\n`);
    });

    process.exit(0);
  });
