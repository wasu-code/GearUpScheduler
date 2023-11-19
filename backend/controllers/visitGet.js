const Visit = require("../schemas/visit");

const getUserVisits = [
  async (req, res) => {
    try {
      const user_id = req.query.user_id;

      const userVisits = await Visit.find({ user_id });

      res.status(200).json(userVisits);
    } catch (error) {
      res.status(500).json({
        message: "Wystąpił błąd podczas pobierania wizyt użytkownika",
        error: error.message,
      });
    }
  },
];

const getAllVisits = [
  async (req, res) => {
    try {
      const allVisits = await Visit.find();

      res.status(200).json(allVisits);
    } catch (error) {
      res.status(500).json({
        message: "Wystąpił błąd podczas pobierania wszystkich wizyt",
        error: error.message,
      });
    }
  },
];

const getAvailableHours = [
  async (req, res) => {
    try {
      const requestedDay = new Date(req.query.day);

      const visitsOnDay = await Visit.find({ day: requestedDay });

      // Zakładamy, że godziny pracy zakładu są od 10-18
      const workingHours = Array.from({ length: 8 }, (_, index) => index + 10);

      const availableHours = workingHours.map((hour) => ({
        value: hour,
        available: true,
      }));

      visitsOnDay.forEach((visit) => {
        const endHour = visit.startHour + visit.duration;

        for (let hour = visit.startHour; hour < endHour; hour++) {
          const index = workingHours.indexOf(hour);
          if (index !== -1) {
            availableHours[index].available = false;
          }
        }
      });

      res.status(200).json(availableHours);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
];

module.exports = {
  getUserVisits,
  getAllVisits,
  getAvailableHours,
};
