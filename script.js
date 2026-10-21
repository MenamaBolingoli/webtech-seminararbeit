import { loadCards } from "./data.js";
import {
  renderCard,
  renderResult,
  renderProgress,
  renderBar,
  renderStats,
  renderTopicFilter,
  renderCardList,
  renderLoadError,
  renderImageError,
  retryImage,
  setFlipped,
} from "./render.js";

const stage = document.getElementById("stage");
const progress = document.getElementById("progress");
const actions = document.getElementById("actions");
const barFill = document.getElementById("bar-fill");
const stats = document.getElementById("stats");
const topicFilter = document.getElementById("topic-filter");
const cardList = document.getElementById("card-list");
const learnView = document.getElementById("view-learn");
const cardsView = document.getElementById("view-cards");

const state = {
  allCards: [],
  topics: [],
  cards: [],
  topic: "",
  index: 0,
  correct: 0,
  answered: 0,
  flipped: false,
  finished: false,
};

let cardElement = null;

function show() {
  if (state.finished) {
    cardElement = null;
    progress.hidden = true;
    actions.hidden = true;
    renderBar(barFill, state.cards.length, state.cards.length);
    renderStats(stats, state.correct, state.answered);
    renderResult(stage, state.correct, state.cards.length);
    return;
  }

  progress.hidden = false;
  renderProgress(progress, state.index, state.cards.length, state.correct);
  renderBar(barFill, state.index, state.cards.length);
  renderStats(stats, state.correct, state.answered);
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

  state.answered += 1;
  state.index += 1;
  if (state.index >= state.cards.length) {
    state.finished = true;
  }
  show();
}

function restart() {
  state.index = 0;
  state.correct = 0;
  state.answered = 0;
  state.finished = false;
  show();
}

function applyTopic(topic) {
  state.topic = topic;
  state.cards = topic ? state.allCards.filter((card) => card.topic === topic) : state.allCards;
  renderTopicFilter(topicFilter, state.topics, topic);
  restart();
}

function showView(name) {
  const isLearn = name === "learn";
  learnView.hidden = !isLearn;
  cardsView.hidden = isLearn;

  document.querySelectorAll(".tab").forEach((tab) => {
    const active = tab.dataset.view === name;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
}

async function start() {
  cardElement = null;
  actions.hidden = true;
  progress.hidden = false;
  progress.textContent = "Karten werden geladen …";

  try {
    state.allCards = await loadCards();
    state.topics = [...new Set(state.allCards.map((card) => card.topic))];
    renderCardList(cardList, state.allCards);
    applyTopic("");
  } catch (error) {
    console.error(error);
    progress.hidden = true;
    renderLoadError(stage, error.message);
  }
}

stage.addEventListener("click", (event) => {
  // Links zur Quelle sollen öffnen, ohne die Karte umzudrehen
  if (event.target.closest("a")) {
    return;
  }

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

  // Im Karten-Tab gibt es keine Karte zum Umdrehen
  if (learnView.hidden) {
    return;
  }

  // Auf Buttons und Links sollen Leertaste und Enter deren Aktion auslösen, nicht die Karte umdrehen
  if (event.target.closest("button, a") || !cardElement) {
    return;
  }

  event.preventDefault();
  flip();
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => showView(tab.dataset.view));
});

topicFilter.addEventListener("click", (event) => {
  const chip = event.target.closest("[data-topic]");
  if (chip) {
    applyTopic(chip.dataset.topic);
  }
});

document.getElementById("btn-right").addEventListener("click", () => answer(true));
document.getElementById("btn-wrong").addEventListener("click", () => answer(false));

start();
