const CARDS_URL = "cards.json";

const card = document.getElementById("card");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const answerImageEl = document.getElementById("answer-image");
const progressEl = document.getElementById("progress");
const actionsEl = document.getElementById("actions");
const statusEl = document.getElementById("status");

let cards = [];
let index = 0;

function showCard() {
  const current = cards[index];

  // Ohne Animation auf die Vorderseite zurücksetzen, damit die neue Frage nicht rückwärts sichtbar wird
  card.classList.add("no-transition");
  card.classList.remove("flipped");
  void card.offsetWidth; // Reflow erzwingen, damit die Transition wirklich ausgesetzt ist
  card.classList.remove("no-transition");

  questionEl.textContent = current.question;
  answerEl.textContent = current.answer;

  if (current.image) {
    answerImageEl.src = current.image;
    answerImageEl.alt = current.imageAlt || "";
    answerImageEl.hidden = false;
  } else {
    answerImageEl.removeAttribute("src");
    answerImageEl.alt = "";
    answerImageEl.hidden = true;
  }

  progressEl.textContent = `Karte ${index + 1} von ${cards.length}`;
  actionsEl.hidden = true;
}

function flipCard() {
  card.classList.toggle("flipped");
  actionsEl.hidden = !card.classList.contains("flipped");
}

function nextCard() {
  index = (index + 1) % cards.length;
  showCard();
}

function showStatus(message) {
  statusEl.textContent = message;
  statusEl.hidden = false;
}

card.addEventListener("click", flipCard);

card.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    flipCard();
  }
});

document.getElementById("btn-right").addEventListener("click", nextCard);
document.getElementById("btn-wrong").addEventListener("click", nextCard);

async function loadCards() {
  try {
    const response = await fetch(CARDS_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    cards = await response.json();

    if (cards.length === 0) {
      showStatus("Keine Karten vorhanden.");
      return;
    }
    showCard();
  } catch (error) {
    progressEl.textContent = "";
    showStatus(`Karten konnten nicht geladen werden (${error.message}).`);
  }
}

loadCards();
