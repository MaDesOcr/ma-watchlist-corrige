import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import App from "./App.jsx";

function afficher(adresse = "/") {
  render(
    <MemoryRouter initialEntries={[adresse]}>
      <App />
    </MemoryRouter>
  );
}

describe("Ma Watchlist", () => {
  it("affiche les films de départ et les statistiques", () => {
    afficher("/");
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByRole("link", { name: "Mes films (2 à voir)" })).toBeInTheDocument();
    expect(document.title).toBe("2 à voir · Ma Watchlist");
  });

  it("filtre par genre et par statut", async () => {
    const user = userEvent.setup();
    afficher("/");
    await user.selectOptions(screen.getByLabelText("Genre"), "Animation");
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    await user.selectOptions(screen.getByLabelText("Genre"), "");
    await user.selectOptions(screen.getByLabelText("Statut"), "avoir");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("refuse un formulaire invalide", async () => {
    const user = userEvent.setup();
    afficher("/ajouter");
    await user.type(screen.getByLabelText("Titre"), "A");
    await user.type(screen.getByLabelText("Année"), "1700");
    await user.click(screen.getByRole("button", { name: "Ajouter à ma liste" }));
    expect(screen.getByText(/au moins 2 caractères/)).toBeInTheDocument();
    expect(screen.getByText(/comprise entre 1895/)).toBeInTheDocument();
  });

  it("ajoute un film, revient à la liste et affiche une notification", async () => {
    const user = userEvent.setup();
    afficher("/ajouter");
    await user.type(screen.getByLabelText("Titre"), "Dune");
    await user.type(screen.getByLabelText("Année"), "2021");
    await user.selectOptions(screen.getByLabelText("Genre"), "Science-fiction");
    await user.click(screen.getByRole("button", { name: "Ajouter à ma liste" }));

    expect(screen.getByRole("heading", { name: "Mes films" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Dune" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("« Dune » ajouté");
    expect(JSON.parse(localStorage.getItem("watchlist"))).toHaveLength(5);
  });

  it("marque un film comme vu, le note puis le supprime", async () => {
    const user = userEvent.setup();
    afficher("/films/3");
    await user.click(screen.getByLabelText("Déjà vu"));
    await user.click(screen.getByRole("button", { name: "Noter 4 sur 5" }));
    expect(screen.getByLabelText("Note : 4 sur 5")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Supprimer" }));
    expect(screen.getByRole("heading", { name: "Mes films" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Intouchables" })).not.toBeInTheDocument();
  });

  it("affiche « Film introuvable » pour un identifiant inconnu", () => {
    afficher("/films/999");
    expect(screen.getByRole("heading", { name: "Film introuvable" })).toBeInTheDocument();
  });
});

describe("Effets avec minuteur", () => {
  it("la notification disparaît après 3 secondes", async () => {
    vi.useFakeTimers();
    afficher("/films/1");
    act(() => screen.getByRole("button", { name: "Supprimer" }).click());
    expect(screen.getByRole("status")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("la page introuvable redirige vers l'accueil après 5 secondes", () => {
    vi.useFakeTimers();
    afficher("/nimporte-quoi");
    expect(screen.getByRole("heading", { name: "Page introuvable" })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole("heading", { name: "Mes films" })).toBeInTheDocument();
    vi.useRealTimers();
  });
});
