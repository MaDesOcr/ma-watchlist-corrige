import { NavLink } from "react-router";

export default function EnTete({ aVoir }) {
  return (
    <header className="entete">
      <strong>🎬 Ma Watchlist</strong>
      <nav aria-label="Navigation principale">
        <NavLink to="/" end>Mes films ({aVoir} à voir)</NavLink>
        <NavLink to="/ajouter">Ajouter</NavLink>
      </nav>
    </header>
  );
}
