import { useNavigate } from "react-router";
import FormulaireFilm from "../components/FormulaireFilm.jsx";

export default function Ajouter({ onAjouter }) {
  const naviguer = useNavigate();

  function valider(film) {
    onAjouter(film);
    naviguer("/"); // retour à la liste après l'ajout
  }

  return (
    <>
      <h1>Ajouter un film</h1>
      <FormulaireFilm onValider={valider} />
    </>
  );
}
