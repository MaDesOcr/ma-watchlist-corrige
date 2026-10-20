import { Link } from "react-router";
import Etoiles from "./Etoiles.jsx";

export default function CarteFilm({ film }) {
  return (
    <li className={`carte ${film.vu ? "vu" : ""}`}>
      <h2>
        <Link to={`/films/${film.id}`}>{film.titre}</Link>
      </h2>
      <p>{film.annee} · {film.genre}</p>
      {film.vu ? <Etoiles note={film.note} /> : <p className="badge">À voir</p>}
    </li>
  );
}
