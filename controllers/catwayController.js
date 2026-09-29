/**
 * Contrôleur pour la gestion des catways (pontons).
 * @module controllers/catwayController
 */

const Catway = require('../models/Catway');

/**
 * Récupère l'ensemble des catways triés par numéro de ponton.
 * @async
 * @function getAllCatways
 * @param {import('express').Request} req - Requête Express.
 * @param {import('express').Response} res - Réponse Express contenant le tableau de catways.
 * @returns {Promise<void>}
 */
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find().sort({ catwayNumber: 1 });
    res.status(200).json(catways);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des pontons' });
  }
};

/**
 * Récupère les détails d'un catway spécifique par son identifiant ou numéro.
 * @async
 * @function getCatwayById
 * @param {import('express').Request} req - Requête Express contenant le paramètre id.
 * @param {import('express').Response} res - Réponse Express avec l'objet catway trouvé.
 * @returns {Promise<void>}
 */
exports.getCatwayById = async (req, res) => {
  try {
    const { id } = req.params;
    const catway = await Catway.findOne({ catwayNumber: id });
    if (!catway) {
      return res.status(404).json({ message: 'Ponton non trouvé' });
    }
    res.status(200).json(catway);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche du ponton' });
  }
};

/**
 * Crée un nouveau catway dans la base de données.
 * @async
 * @function createCatway
 * @param {import('express').Request} req - Requête Express contenant catwayNumber, type et catwayState.
 * @param {import('express').Response} res - Réponse Express confirmant la création.
 * @returns {Promise<void>}
 */
exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, type, catwayState } = req.body;
    const existingCatway = await Catway.findOne({ catwayNumber });
    if (existingCatway) {
      return res.status(400).json({ message: 'Ce numéro de ponton existe déjà' });
    }

    const catway = new Catway({ catwayNumber, type, catwayState });
    await catway.save();
    res.status(201).json(catway);
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
};

/**
 * Met à jour complètement un catway existant.
 * @async
 * @function updateCatway
 * @param {import('express').Request} req - Requête Express avec le paramètre id et les champs à modifier.
 * @param {import('express').Response} res - Réponse Express renvoyant le catway mis à jour.
 * @returns {Promise<void>}
 */
exports.updateCatway = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCatway = await Catway.findOneAndUpdate(
      { catwayNumber: id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCatway) {
      return res.status(404).json({ message: 'Ponton non trouvé' });
    }
    res.status(200).json(updatedCatway);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la modification', error: error.message });
  }
};

/**
 * Modifie uniquement l'état de description d'un catway (PATCH).
 * @async
 * @function updateCatwayState
 * @param {import('express').Request} req - Requête Express contenant le nouvel état catwayState.
 * @param {import('express').Response} res - Réponse Express renvoyant le catway mis à jour.
 * @returns {Promise<void>}
 */
exports.updateCatwayState = async (req, res) => {
  try {
    const { id } = req.params;
    const { catwayState } = req.body;
    const updatedCatway = await Catway.findOneAndUpdate(
      { catwayNumber: id },
      { catwayState },
      { new: true }
    );
    if (!updatedCatway) {
      return res.status(404).json({ message: 'Ponton non trouvé' });
    }
    res.status(200).json(updatedCatway);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour de l’état' });
  }
};

/**
 * Supprime un catway par son numéro de ponton.
 * @async
 * @function deleteCatway
 * @param {import('express').Request} req - Requête Express contenant le paramètre id.
 * @param {import('express').Response} res - Réponse Express confirmant la suppression.
 * @returns {Promise<void>}
 */
exports.deleteCatway = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCatway = await Catway.findOneAndDelete({ catwayNumber: id });
    if (!deletedCatway) {
      return res.status(404).json({ message: 'Ponton non trouvé' });
    }
    res.status(200).json({ message: 'Ponton supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
};