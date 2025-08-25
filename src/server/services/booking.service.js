const Booking = require("../models/booking.model");
const Space = require("../models/space.model");

class BookingService {
  /**
   * Crea una reserva con validación de disponibilidad
   * @param {Object} bookingData - { user, space, startTime, endTime }
   * @returns {Promise<Object>} Reserva creada
   */
  static async create(bookingData) {
    // 1. Verificar que el espacio existe
    const space = await Space.findById(bookingData.space);
    if (!space) throw new Error("Espacio no encontrado");

    // 2. Validar fechas
    if (bookingData.endTime <= bookingData.startTime) {
      throw new Error("La hora final debe ser posterior a la inicial");
    }

    // 3. Verificar disponibilidad
    const isAvailable = await this._checkAvailability(
      bookingData.space,
      bookingData.startTime,
      bookingData.endTime
    );
    if (!isAvailable) throw new Error("El espacio no está disponible");

    // 4. Calcular precio
    const hours =
      (bookingData.endTime - bookingData.startTime) / (1000 * 60 * 60);
    const totalPrice = space.pricePerHour * hours;

    // 5. Crear reserva
    return await Booking.create({
      ...bookingData,
      totalPrice,
      status: "confirmed",
    });
  }

  /**
   * Método privado: Verifica disponibilidad del espacio
   */
  static async _checkAvailability(spaceId, startTime, endTime) {
    const existing = await Booking.findOne({
      space: spaceId,
      status: { $ne: "cancelled" },
      $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }],
    });
    return !existing;
  }
}

module.exports = BookingService;
