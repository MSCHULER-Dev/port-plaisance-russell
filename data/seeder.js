require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Modèles
const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connecté pour le seeding...');
  } catch (error) {
    console.error('Erreur MongoDB :', error.message);
    process.exit(1);
  }
};

const rawCatways = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'catways.json'), 'utf-8')
);
const reservationsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'reservations.json'), 'utf-8')
);

// Normalisation des catways : conversion de catwayType en type si nécessaire
const catwaysData = rawCatways.map((item) => ({
  catwayNumber: item.catwayNumber,
  type: item.type || item.catwayType,
  catwayState: item.catwayState
}));

const importData = async () => {
  try {
    await connectDB();

    await Catway.deleteMany();
    await Reservation.deleteMany();
    await User.deleteMany();

    await Catway.insertMany(catwaysData);
    await Reservation.insertMany(reservationsData);

    await User.create({
      username: 'RussellAdmin',
      email: 'admin@russell-port.fr',
      password: 'Password123!'
    });

    console.log('Données importées avec succès !');
    console.log('Compte admin créé : admin@russell-port.fr / Password123!');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l’importation :', error.message);
    process.exit(1);
  }
};

importData();