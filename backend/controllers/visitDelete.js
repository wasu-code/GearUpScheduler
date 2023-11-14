const Visit = require('../schemas/visit');

//Usuwanie wizyty
const deleteVisit = async (req, res) => {
  try {
    const visit_id = req.params.visit_id; 

    
    await Visit.findByIdAndDelete(visit_id);

    res.status(200).json({ message: 'Wizyta została pomyślnie usunięta' });
  } catch (error) {
    res.status(500).json({ message: 'Wystąpił błąd podczas usuwania wizyty', error: error.message });
  }
};

module.exports = deleteVisit

