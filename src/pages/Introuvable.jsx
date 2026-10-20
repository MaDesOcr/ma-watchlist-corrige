import { useEffect } from "react";
import { useNavigate } from "react-router";

// Redirection automatique vers l'accueil après 5 secondes
export default function Introuvable() {
  const naviguer = useNavigate();

  useEffect(() => {
    const minuteur = setTimeout(() => naviguer("/"), 5000);
    return () => clearTimeout(minuteur); // si l'utilisateur part avant, on annule
  }, [naviguer]);

  return (
    <>
      <h1>Page introuvable</h1>
      <p>Retour automatique à l'accueil dans 5 secondes.</p>
    </>
  );
}
