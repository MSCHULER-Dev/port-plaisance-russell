const reservationRoutes = require('./reservationRoutes');
const express = require('express');
const router = express.Router();
const {
  getAllCatways,
  getCatwayById,
  createCatway,
  updateCatwayState,
  deleteCatway
} = require('../controllers/catwayController');
const { protect } = require('../middlewares/auth');

// Toutes les opérations catways nécessitent d'être connecté
router.route('/')
  .get(protect, getAllCatways)
  .post(protect, createCatway);

router.route('/:id')
  .get(protect, getCatwayById)
  .patch(protect, updateCatwayState)
  .delete(protect, deleteCatway);
// Redirection vers les réservations associées au catway
router.use('/:id/reservations', reservationRoutes);
module.exports = router;