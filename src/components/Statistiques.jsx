// Tout est calculé à partir des films : aucun état supplémentaire
export default function Statistiques({ films }) {
  const vus = films.filter((f) => f.vu);
  const moyenne = vus.length ? (vus.reduce((s, f) => s + f.note, 0) / vus.length).toFixed(1) : "-";
  return (
    <dl className="stats">
      <div><dt>Films</dt><dd>{films.length}</dd></div>
      <div><dt>Vus</dt><dd>{vus.length}</dd></div>
      <div><dt>Note moyenne</dt><dd>{moyenne}</dd></div>
    </dl>
  );
}
