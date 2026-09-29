const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getReservationsByCatway,
  getReservationDetails,
  createReservation,
  deleteReservation
} = require('../controllers/reservationController');
const { protect } = require('../middlewares/auth');

router.use(protect);

router.route('/')
  .get(getReservationsByCatway)
  .post(createReservation);

router.route('/:idReservation')
  .get(getReservationDetails)
  .delete(deleteReservation);

module.exports = router;