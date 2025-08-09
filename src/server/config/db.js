const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
    console.log(
      "Ruta del .env:",
      require("path").resolve(process.cwd(), ".env")
    );
    console.log(
      "Contenido de .env:",
      require("fs").readFileSync(".env", "utf8")
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
