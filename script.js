import { loadCards } from "./data.js";
import {
  renderCard,
  renderResult,
  renderProgress,
  renderLoadError,
  renderImageError,
  retryImage,
  setFlipped,
} from "./render.js";

const stage = document.getElementById("stage");
const progress = document.getElementById("progress");
const actions = document.getElementById("actions");

const state = {
  cards: [],
  index: 0,
  correct: 0,
  flipped: false,
  finished: false,
};

let cardElement = null;

function show() {
  if (state.finished) {
    cardElement = null;
    progress.hidden = true;
    actions.hidden = true;
    renderResult(stage, state.correct, state.cards.length);
    return;
  }

  progress.hidden = false;
  renderProgress(progress, state.index, state.cards.length, state.correct);
  cardElement = renderCard(stage, state.cards[state.index]);
  state.flipped = false;
  actions.hidden = true;
}

function flip() {
  if (!cardElement) {
    return;
  }

  state.flipped = !state.flipped;
  setFlipped(cardElement, state.flipped);
  actions.hidden = !state.flipped;
}

function answer(isCorrect) {
  if (isCorrect) {
    state.correct += 1;
  }

  state.index += 1;
  if (state.index >= state.cards.length) {
    state.finished = true;
  }
  show();
}

function restart() {
  state.index = 0;
  state.correct = 0;
  state.finished = false;
  show();
}

async function start() {
  cardElement = null;
  actions.hidden = true;
  progress.hidden = false;
  progress.textContent = "Karten werden geladen …";

  try {
    state.cards = await loadCards();
    restart();
  } catch (error) {
    progress.hidden = true;
    renderLoadError(stage, error.message);
  }
}

stage.addEventListener("click", (event) => {
  const actionElement = event.target.closest("[data-action]");

  switch (actionElement?.dataset.action) {
    case "restart":
      restart();
      return;
    case "retry-load":
      start();
      return;
    case "retry-image":
      retryImage(actionElement);
      return;
  }

  if (event.target.closest(".card")) {
    flip();
  }
});

// Fehler von Bildern bubblen nicht, deshalb wird in der Capture-Phase gehört
stage.addEventListener(
  "error",
  (event) => {
    if (event.target instanceof HTMLImageElement) {
      renderImageError(event.target);
    }
  },
  true
);

document.addEventListener("keydown", (event) => {
  if (event.key !== " " && event.key !== "Enter") {
    return;
  }

  // Auf Buttons sollen Leertaste und Enter den Button auslösen, nicht die Karte umdrehen
  if (event.target.closest("button") || !cardElement) {
    return;
  }

  event.preventDefault();
  flip();
});

document.getElementById("btn-right").addEventListener("click", () => answer(true));
document.getElementById("btn-wrong").addEventListener("click", () => answer(false));

start();
