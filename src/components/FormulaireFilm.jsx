import { useState } from "react";
import { GENRES } from "../data/filmsInitiaux.js";

const ANNEE_MAX = new Date().getFullYear() + 1;

export default function FormulaireFilm({ onValider }) {
  const [titre, setTitre] = useState("");
  const [annee, setAnnee] = useState("");
  const [genre, setGenre] = useState(GENRES[0]);
  const [erreurs, setErreurs] = useState({});

  function valider() {
    const e = {};
    if (titre.trim().length < 2) e.titre = "Le titre doit contenir au moins 2 caractères.";
    const a = Number(annee);
    if (!Number.isInteger(a) || a < 1895 || a > ANNEE_MAX) e.annee = `L'année doit être comprise entre 1895 et ${ANNEE_MAX}.`;
    return e;
  }

  function envoyer(evenement) {
    evenement.preventDefault();
    const e = valider();
    setErreurs(e);
    if (Object.keys(e).length === 0) onValider({ titre: titre.trim(), annee: Number(annee), genre });
  }

  return (
    <form onSubmit={envoyer} noValidate>
      <p>
        <label htmlFor="titre">Titre</label>
        <input id="titre" value={titre} onChange={(e) => setTitre(e.target.value)} aria-invalid={Boolean(erreurs.titre)} aria-describedby="erreur-titre" />
        {erreurs.titre && <span id="erreur-titre" className="erreur">{erreurs.titre}</span>}
      </p>
      <p>
        <label htmlFor="annee">Année</label>
        <input id="annee" type="number" value={annee} onChange={(e) => setAnnee(e.target.value)} aria-invalid={Boolean(erreurs.annee)} aria-describedby="erreur-annee" />
        {erreurs.annee && <span id="erreur-annee" className="erreur">{erreurs.annee}</span>}
      </p>
      <p>
        <label htmlFor="genre-film">Genre</label>
        <select id="genre-film" value={genre} onChange={(e) => setGenre(e.target.value)}>
          {GENRES.map((g) => <option key={g}>{g}</option>)}
        </select>
      </p>
      <button type="submit">Ajouter à ma liste</button>
    </form>
  );
}
