import { GENRES } from "../data/filmsInitiaux.js";

// Composant contrôlé : il n'a pas d'état, il affiche les valeurs reçues et prévient le parent
export default function Filtres({ genre, statut, onGenre, onStatut }) {
  return (
    <div className="filtres">
      <label htmlFor="genre">Genre</label>
      <select id="genre" value={genre} onChange={(e) => onGenre(e.target.value)}>
        <option value="">Tous</option>
        {GENRES.map((g) => <option key={g}>{g}</option>)}
      </select>

      <label htmlFor="statut">Statut</label>
      <select id="statut" value={statut} onChange={(e) => onStatut(e.target.value)}>
        <option value="tous">Tous</option>
        <option value="avoir">À voir</option>
        <option value="vus">Vus</option>
      </select>
    </div>
  );
}
