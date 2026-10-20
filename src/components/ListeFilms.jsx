import CarteFilm from "./CarteFilm.jsx";

export default function ListeFilms({ films }) {
  if (films.length === 0) return <p>Aucun film ne correspond.</p>;
  return (
    <ul className="grille">
      {films.map((f) => <CarteFilm key={f.id} film={f} />)}
    </ul>
  );
}
