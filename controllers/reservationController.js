/**
 * Contrôleur pour la gestion des réservations de pontons.
 * @module controllers/reservationController
 */

const Reservation = require('../models/Reservation');

/**
 * Récupère la liste de toutes les réservations associées à un numéro de catway.
 * @async
 * @function getReservationsByCatway
 * @param {import('express').Request} req - Requête Express contenant le paramètre id (numéro du catway).
 * @param {import('express').Response} res - Réponse Express avec la liste des réservations.
 * @returns {Promise<void>}
 */
exports.getReservationsByCatway = async (req, res) => {
  try {
    const { id } = req.params;
    const reservations = await Reservation.find({ catwayNumber: id });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations' });
  }
};

/**
 * Récupère le détail d'une réservation précise pour un catway donné.
 * @async
 * @function getReservationDetails
 * @param {import('express').Request} req - Requête Express contenant id (catway) et idReservation.
 * @param {import('express').Response} res - Réponse Express renvoyant la réservation trouvée.
 * @returns {Promise<void>}
 */
exports.getReservationDetails = async (req, res) => {
  try {
    const { id, idReservation } = req.params;
    const reservation = await Reservation.findOne({ _id: idReservation, catwayNumber: id });
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche de la réservation' });
  }
};

/**
 * Crée une nouvelle réservation sur un ponton spécifique.
 * @async
 * @function createReservation
 * @param {import('express').Request} req - Requête Express contenant id (catway) et le corps clientName, boatName, checkIn, checkOut.
 * @param {import('express').Response} res - Réponse Express renvoyant la réservation créée.
 * @returns {Promise<void>}
 */
exports.createReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, boatName, checkIn, checkOut } = req.body;

    const reservation = new Reservation({
      catwayNumber: id,
      clientName,
      boatName,
      checkIn,
      checkOut
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: 'Données de réservation invalides', error: error.message });
  }
};

/**
 * Supprime une réservation d'un catway par son identifiant unique.
 * @async
 * @function deleteReservation
 * @param {import('express').Request} req - Requête Express contenant id (catway) et idReservation.
 * @param {import('express').Response} res - Réponse Express confirmant la suppression.
 * @returns {Promise<void>}
 */
exports.deleteReservation = async (req, res) => {
  try {
    const { id, idReservation } = req.params;
    const deletedReservation = await Reservation.findOneAndDelete({ _id: idReservation, catwayNumber: id });
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.status(200).json({ message: 'Réservation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la réservation' });
  }
};