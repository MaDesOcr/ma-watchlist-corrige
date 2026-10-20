import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import EnTete from "./components/EnTete.jsx";
import Notification from "./components/Notification.jsx";
import { FILMS_INITIAUX } from "./data/filmsInitiaux.js";
import Accueil from "./pages/Accueil.jsx";
import Ajouter from "./pages/Ajouter.jsx";
import Detail from "./pages/Detail.jsx";
import Introuvable from "./pages/Introuvable.jsx";

function lireFilms() {
  try {
    return JSON.parse(localStorage.getItem("watchlist")) ?? FILMS_INITIAUX;
  } catch {
    return FILMS_INITIAUX;
  }
}

export default function App() {
  const [films, setFilms] = useState(lireFilms);
  const [notification, setNotification] = useState("");

  // Effet 1 : sauvegarder la liste à chaque modification
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(films));
  }, [films]);

  // Effet 2 : le titre de l'onglet indique le nombre de films à voir
  const aVoir = films.filter((f) => !f.vu).length;
  useEffect(() => {
    document.title = `${aVoir} à voir · Ma Watchlist`;
  }, [aVoir]);

  function ajouter(film) {
    setFilms([...films, { ...film, id: Date.now(), vu: false, note: 0 }]);
    setNotification(`« ${film.titre} » ajouté`);
  }

  function modifier(id, changements) {
    setFilms(films.map((f) => (f.id === id ? { ...f, ...changements } : f)));
  }

  function supprimer(id) {
    const film = films.find((f) => f.id === id);
    setFilms(films.filter((f) => f.id !== id));
    setNotification(`« ${film.titre} » supprimé`);
  }

  return (
    <>
      <EnTete aVoir={aVoir} />
      <main>
        <Routes>
          <Route path="/" element={<Accueil films={films} />} />
          <Route path="/ajouter" element={<Ajouter onAjouter={ajouter} />} />
          <Route path="/films/:id" element={<Detail films={films} onModifier={modifier} onSupprimer={supprimer} />} />
          <Route path="*" element={<Introuvable />} />
        </Routes>
      </main>
      {/* setNotification est stable : l'effet de Notification ne se relance pas à chaque affichage */}
      <Notification message={notification} onChangerMessage={setNotification} />
    </>
  );
}
