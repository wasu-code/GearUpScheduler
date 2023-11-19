const Visit = require("../schemas/visit");

const deleteVisitHandler = [
  async (req, res) => {
    try {
      const visit_id = req.params.visit_id;

      await Visit.findByIdAndRemove(visit_id);

      res.status(200).json({ message: "Wizyta została pomyślnie usunięta" });
    } catch (error) {
      res.status(500).json({
        error: "Wystąpił błąd podczas usuwania wizyty",
        error: error.message,
      });
    }
  },
];

module.exports = deleteVisitHandler;
