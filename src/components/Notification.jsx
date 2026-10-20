import { useEffect } from "react";

// Effet avec nettoyage : la notification se ferme seule après 3 secondes.
// Si un nouveau message arrive avant, l'ancien minuteur est annulé.
export default function Notification({ message, onChangerMessage }) {
  useEffect(() => {
    if (!message) return;
    const minuteur = setTimeout(() => onChangerMessage(""), 3000);
    return () => clearTimeout(minuteur);
  }, [message, onChangerMessage]);

  if (!message) return null;
  return (
    <div role="status" className="notification">
      {message}
    </div>
  );
}
