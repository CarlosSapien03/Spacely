require("dotenv").config();
const express = require("express");
const connectDB = require("./src/server/config/db");
const {
  createBooking,
} = require("./src/server/controllers/booking.controller"); // Importación del controlador

const app = express();

console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();

// Middlewares
app.use(express.json()); // Para parsear JSON en las peticiones

// Rutas
app.post("/api/bookings", createBooking); // Endpoint de creación de reservas

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
//TE QUEDASTE EN EL ERROR DE POSTMAN
