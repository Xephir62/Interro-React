// HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Accueil</h1>
      <Link to="/profile">Aller au profil</Link>
      <br />
      <Link to="/contact">Aller à la page de contact</Link>
    </div>
  );
}

export default HomePage;
