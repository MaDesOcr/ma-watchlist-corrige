import { useState } from "react";
import ListeFilms from "../components/ListeFilms.jsx";
import Filtres from "../components/Filtres.jsx";
import Statistiques from "../components/Statistiques.jsx";

export default function Accueil({ films }) {
  // L'état des filtres appartient à cette page : aucun autre écran n'en a besoin
  const [genre, setGenre] = useState("");
  const [statut, setStatut] = useState("tous");

  const visibles = films.filter(
    (f) => (!genre || f.genre === genre) && (statut === "tous" || (statut === "vus" ? f.vu : !f.vu))
  );

  return (
    <>
      <h1>Mes films</h1>
      <Statistiques films={films} />
      <Filtres genre={genre} statut={statut} onGenre={setGenre} onStatut={setStatut} />
      <ListeFilms films={visibles} />
    </>
  );
}
