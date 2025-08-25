const BookingService = require("../services/booking.service");

const createBooking = async (req, res) => {
  try {
    // 1. Validar datos básicos
    const { space, startTime, endTime } = req.body;
    if (!space || !startTime || !endTime) {
      return res
        .status(400)
        .json({ error: "Campos requeridos: space, startTime, endTime" });
    }

    // 2. Construir objeto para el servicio
    const bookingData = {
      user: "65a1bc77bcf86cd79939011", // ← ID de usuario fijo para pruebas
      space,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    };

    // 3. Llamar al servicio
    const booking = await BookingService.create(bookingData);

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createBooking };
