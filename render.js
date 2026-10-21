// Erzeugt das DOM. Nur createElement, textContent, append und after, kein innerHTML.
// Dadurch wird Text aus cards.json immer als Text dargestellt und nie als HTML interpretiert.

export function renderCard(container, card) {
  const element = document.createElement("div");
  element.className = "card";
  element.setAttribute("role", "button");
  element.tabIndex = 0;

  const front = document.createElement("div");
  front.className = "face front";

  const topic = document.createElement("span");
  topic.className = "topic";
  topic.textContent = card.topic;

  const question = document.createElement("p");
  question.className = "text";
  question.textContent = card.question;

  const hint = document.createElement("span");
  hint.className = "hint";
  hint.textContent = "Tippen oder Leertaste zum Umdrehen";

  front.append(topic, question, hint);

  const back = document.createElement("div");
  back.className = "face back";

  const answer = document.createElement("p");
  answer.className = "text";
  answer.textContent = card.answer;

  back.append(answer);

  if (card.image) {
    const image = document.createElement("img");
    image.className = "answer-image";
    image.dataset.src = card.image;
    image.src = card.image;
    image.alt = card.imageAlt ?? "";
    back.append(image);
  }

  if (card.source) {
    const source = document.createElement("a");
    source.className = "source";
    source.href = card.source;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    source.textContent = "Quelle öffnen";
    back.append(source);
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

export function renderLoadError(container, message) {
  const section = document.createElement("section");
  section.className = "load-error";

  const text = document.createElement("p");
  text.textContent = message;

  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "retry";
  retry.dataset.action = "retry-load";
  retry.textContent = "Erneut versuchen";

  section.append(text, retry);
  container.replaceChildren(section);
}

// Ersetzt ein fehlerhaftes Bild durch einen Hinweis mit Wiederholungsknopf, die Karte bleibt benutzbar.
export function renderImageError(image) {
  image.hidden = true;

  const box = document.createElement("div");
  box.className = "image-error";

  const text = document.createElement("p");
  text.textContent = "Das Bild fehlt oder konnte nicht geladen werden.";

  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "retry";
  retry.dataset.action = "retry-image";
  retry.textContent = "Bild erneut laden";

  box.append(text, retry);
  image.after(box);
}

// Der Hinweis steht direkt hinter dem Bild. Beim erneuten Laden bekommt die URL einen Zeitstempel,
// damit der Browser den Versuch nicht aus dem Fehler-Cache beantwortet.
export function retryImage(button) {
  const box = button.parentElement;
  const image = box.previousElementSibling;

  box.remove();
  image.hidden = false;
  image.src = `${image.dataset.src}?retry=${Date.now()}`;
}
