import { useNavigate, useParams } from "react-router";
import Etoiles from "../components/Etoiles.jsx";

export default function Detail({ films, onModifier, onSupprimer }) {
  const { id } = useParams();
  const naviguer = useNavigate();
  const film = films.find((f) => f.id === Number(id));

  if (!film) {
    return (
      <>
        <h1>Film introuvable</h1>
        <button onClick={() => naviguer("/")}>Retour à la liste</button>
      </>
    );
  }

  function supprimer() {
    onSupprimer(film.id);
    naviguer("/", { replace: true }); // la page du film supprimé ne doit pas rester dans l'historique
  }

  return (
    <article>
      <button onClick={() => naviguer(-1)}>← Retour</button>
      <h1>{film.titre}</h1>
      <p>{film.annee} · {film.genre}</p>

      <label>
        <input type="checkbox" checked={film.vu} onChange={() => onModifier(film.id, { vu: !film.vu, note: film.vu ? 0 : film.note })} />{" "}
        Déjà vu
      </label>

      {film.vu && (
        <p>
          Ma note : <Etoiles note={film.note} onNoter={(n) => onModifier(film.id, { note: n })} />
        </p>
      )}

      <button className="danger" onClick={supprimer}>Supprimer</button>
    </article>
  );
}
