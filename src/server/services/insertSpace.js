require("dotenv").config({
  path: require("path").resolve(__dirname, "../../../.env"),
});
const mongoose = require("mongoose");

// Configuración mejorada
mongoose.set("strictQuery", true);

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI no está definido en .env");
  process.exit(1);
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
    });

    console.log(
      "✅ Conectado a MongoDB | DB:",
      mongoose.connection.db.databaseName
    );
    console.log(
      "📊 Colecciones disponibles:",
      await mongoose.connection.db.listCollections().toArray()
    );
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
    process.exit(1);
  }
}

async function insertSampleSpaces() {
  const Space = require("../models/space.model");
  if (!Space || !Space.modelName) {
    throw new Error("❌ Modelo Space no se cargó correctamente");
  }

  const sampleSpaces = [
    {
      title: "Espacio de prueba",
      description: "Descripción de prueba",
      location: "Ubicación de prueba",
      pricePerHour: 10,
      availability: true,
    },
  ];

  try {
    // Validación previa
    const doc = new Space(sampleSpaces[0]);
    await doc.validate();

    console.log("🔄 Insertando en colección:", Space.collection.collectionName);
    const result = await Space.insertMany(sampleSpaces);

    console.log(
      `✅ ${result.length} documentos insertados | IDs:`,
      result.map((d) => d._id)
    );
    return result;
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error(
        "❌ Error de validación:",
        Object.values(error.errors).map((e) => e.message)
      );
    } else {
      console.error("❌ Error en insertMany:", error);
    }
    throw error;
  }
}

(async () => {
  try {
    await connectDB();
    await insertSampleSpaces();
  } catch (error) {
    console.error("❌ Error en el proceso principal:", error.message);
  } finally {
    await mongoose
      .disconnect()
      .catch((e) => console.error("⚠️ Error al desconectar:", e));
    console.log("🔌 Conexión cerrada");
  }
})();
