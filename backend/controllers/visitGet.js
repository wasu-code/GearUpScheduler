
const Visit = require('../schemas/visit'); 

// Pobieranie wizyt danego użytkownika
const getUserVisits= async (req, res) => {
  try {
    const userId = req.params.user_id; 

    const userVisits = await Visit.find({ user_id });

    res.status(200).json(userVisits);
  } catch (error) {
    res.status(500).json({ message: 'Wystąpił błąd podczas pobierania wizyt użytkownika', error: error.message });
  }
};

// Pobieranie wszystkich wizyt
const getAllVisits = async (req, res) => {
  try {
    
    const allVisits = await Visit.find();

    res.status(200).json(allVisits);
  } catch (error) {
    res.status(500).json({ message: 'Wystąpił błąd podczas pobierania wszystkich wizyt', error: error.message });
  }
};

module.exports = {
  getUserVisits,
  getAllVisits,
};
