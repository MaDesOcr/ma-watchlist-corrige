// Note de 0 à 5. Sans onNoter, le composant est en lecture seule.
export default function Etoiles({ note, onNoter }) {
  return (
    <span className="etoiles" aria-label={`Note : ${note} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) =>
        onNoter ? (
          <button key={n} type="button" onClick={() => onNoter(n)} aria-label={`Noter ${n} sur 5`} aria-pressed={n <= note}>
            {n <= note ? "★" : "☆"}
          </button>
        ) : (
          <span key={n} aria-hidden="true">{n <= note ? "★" : "☆"}</span>
        )
      )}
    </span>
  );
}
