/**
 * Contrôleur pour la gestion des utilisateurs et de l'authentification.
 * @module controllers/userController
 */

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Connecte un utilisateur et génère un jeton JWT stocké dans un cookie.
 * @async
 * @function login
 * @param {import('express').Request} req - Requête Express contenant l'email et le mot de passe.
 * @param {import('express').Response} res - Réponse Express avec jeton et redirection/confirmation.
 * @returns {Promise<void>}
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, { httpOnly: false });
    res.status(200).json({ message: 'Connexion réussie', token, user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
  }
};

/**
 * Déconnecte l'utilisateur en supprimant le cookie d'authentification.
 * @function logout
 * @param {import('express').Request} req - Requête Express.
 * @param {import('express').Response} res - Réponse Express qui efface le cookie token.
 * @returns {void}
 */
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};

/**
 * Récupère la liste de tous les utilisateurs enregistrés.
 * @async
 * @function getUsers
 * @param {import('express').Request} req - Requête Express.
 * @param {import('express').Response} res - Réponse Express contenant le tableau des utilisateurs (sans mot de passe).
 * @returns {Promise<void>}
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
};

/**
 * Crée un nouvel utilisateur avec mot de passe haché.
 * @async
 * @function createUser
 * @param {import('express').Request} req - Requête Express contenant username, email et password.
 * @param {import('express').Response} res - Réponse Express confirmant la création.
 * @returns {Promise<void>}
 */
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({
      message: 'Utilisateur créé',
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ message: 'Données invalides', error: error.message });
  }
};

/**
 * Supprime un utilisateur existant par son adresse email.
 * @async
 * @function deleteUser
 * @param {import('express').Request} req - Requête Express contenant l'email dans les paramètres.
 * @param {import('express').Response} res - Réponse Express confirmant la suppression.
 * @returns {Promise<void>}
 */
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
};