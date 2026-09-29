# Port Russell - API & Tableau de Bord

Application web de gestion des réservations de pontons (catways) et des utilisateurs pour le port de plaisance Russell.

## Prérequis

- Node.js (v18 ou supérieur)
- Une base de données MongoDB (locale ou cluster MongoDB Atlas)

## Installation et Lancement

1. Cloner le projet ou extraire les fichiers :
   ```bash
   git clone <URL_DU_DEPOT>
   cd port-plaisance-russell
   npm install
   npm start
   ```

## Configuration des variables d'environnement
- Dupliquer le fichier `.env.example` et le renommer en `.env`.
- Renseigner `PORT`, `MONGO_URI`, `JWT_SECRET`, `SESSION_SECRET`.

## Documentation API (JSDoc)
La documentation est consultable en ouvrant le fichier `docs/index.html` dans un navigateur.