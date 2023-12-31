const Visit = require("../schemas/visit");

// Zapisywanie wizyty
const saveVisit = [
  async (req, res) => {
    try {
      const { user_id, day, duration, startTime, type, description } = req.body;

      const newVisit = new Visit({
        day,
        duration,
        startTime,
        user_id,
        type,
        description,
      });

      // Zapisanie do bazy danych
      await newVisit.save();

      res.status(200).json({ message: "Wizyta została pomyślnie zapisana" });
    } catch (error) {
      res.status(500).json({
        message: "Wystąpił błąd podczas zapisywania wizyty",
        error: error.message,
      });
    }
  },
];

module.exports = saveVisit;
