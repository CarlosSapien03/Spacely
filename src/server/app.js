require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();

console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
