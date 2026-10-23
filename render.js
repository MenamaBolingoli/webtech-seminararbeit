// Erzeugt das DOM. Nur createElement, textContent, append, after und replaceChildren, kein innerHTML.
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

export function renderBar(fill, done, total) {
  fill.style.width = `${total ? (done / total) * 100 : 0}%`;
}

export function renderStats(element, correct, answered) {
  element.textContent = `Richtig: ${correct} · Falsch: ${answered - correct}`;
}

export function renderTopicFilter(container, topics, activeTopic) {
  const buttons = ["", ...topics].map((value) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = value === activeTopic ? "chip is-active" : "chip";
    button.dataset.topic = value;
    button.textContent = value === "" ? "Alle" : value;
    return button;
  });

  container.replaceChildren(...buttons);
}

export function renderCardList(container, cards) {
  const items = cards.map((card) => {
    const item = document.createElement("article");
    item.className = "list-item";

    const topic = document.createElement("span");
    topic.className = "list-topic";
    topic.textContent = card.topic;

    const question = document.createElement("p");
    question.className = "question";
    question.textContent = card.question;

    const answer = document.createElement("p");
    answer.textContent = card.answer;

    item.append(topic, question, answer);

    if (card.image) {
      const image = document.createElement("p");
      image.className = "muted";
      image.textContent = `Bild: ${card.image}`;
      item.append(image);
    }

    if (card.source) {
      const source = document.createElement("a");
      source.href = card.source;
      source.target = "_blank";
      source.rel = "noopener noreferrer";
      source.textContent = "Quelle öffnen";
      item.append(source);
    }

    return item;
  });

  container.replaceChildren(...items);
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

// Zeigt den Dateipfad, die ermittelte Ursache und die Bildbeschreibung als Ersatz für das Bild.
export function renderImageError(image, reason) {
  image.hidden = true;

  const box = document.createElement("div");
  box.className = "image-error";
  box.setAttribute("role", "alert");

  const title = document.createElement("p");
  title.className = "image-error-title";
  title.textContent = "Grafik konnte nicht geladen werden";

  const file = document.createElement("p");
  file.textContent = `Datei: ${image.dataset.src}`;

  const cause = document.createElement("p");
  cause.textContent = `Ursache: ${reason}`;

  box.append(title, file, cause);

  if (image.alt) {
    const description = document.createElement("p");
    description.textContent = `Beschreibung: ${image.alt}`;
    box.append(description);
  }

  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "retry";
  retry.dataset.action = "retry-image";
  retry.textContent = "Bild erneut laden";

  box.append(retry);
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
