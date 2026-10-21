// Erzeugt das DOM. Nur createElement, textContent und append, kein innerHTML.
// Dadurch wird Text aus cards.json immer als Text dargestellt und nie als HTML interpretiert.

export function renderCard(container, card) {
  const element = document.createElement("div");
  element.className = "card";
  element.setAttribute("role", "button");
  element.tabIndex = 0;

  const front = document.createElement("div");
  front.className = "face front";

  const question = document.createElement("p");
  question.className = "text";
  question.textContent = card.question;

  const hint = document.createElement("span");
  hint.className = "hint";
  hint.textContent = "Tippen oder Leertaste zum Umdrehen";

  front.append(question, hint);

  const back = document.createElement("div");
  back.className = "face back";

  const answer = document.createElement("p");
  answer.className = "text";
  answer.textContent = card.answer;

  back.append(answer);

  if (card.image) {
    const image = document.createElement("img");
    image.className = "answer-image";
    image.src = card.image;
    image.alt = card.imageAlt ?? "";
    back.append(image);
  }

  element.append(front, back);
  container.replaceChildren(element);

  return element;
}

export function setFlipped(cardElement, isFlipped) {
  cardElement.classList.toggle("flipped", isFlipped);
}

export function renderProgress(element, index, total, correct) {
  element.textContent = `Karte ${index + 1} von ${total} · ${correct} richtig`;
}

export function renderResult(container, correct, total) {
  const section = document.createElement("section");
  section.className = "result";

  const title = document.createElement("h2");
  title.textContent = "Auswertung";

  const score = document.createElement("p");
  score.className = "text";
  score.textContent = `${correct} von ${total} richtig`;

  const restart = document.createElement("button");
  restart.type = "button";
  restart.className = "primary";
  restart.dataset.action = "restart";
  restart.textContent = "Nochmal";

  section.append(title, score, restart);
  container.replaceChildren(section);
}
