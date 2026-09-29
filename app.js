const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const app = express();

// Middlewares d'analyse du corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Moteur de templates EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route de test
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'API Port Russell opérationnelle' });
});
// Affichage de la page de connexion
app.get('/', (req, res) => {
  res.render('login');
});
// Page tableau de bord
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
// Page de détail d'un catway
app.get('/catways/:id', (req, res) => {
  res.render('catway-details', { catwayId: req.params.id });
});
// Routes API
app.use('/api', userRoutes);
app.use('/api/catways', catwayRoutes);
module.exports = app;