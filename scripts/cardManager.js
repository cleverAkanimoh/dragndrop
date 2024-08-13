import { createCard } from "./card.js";

let cardCount = 0;
let newNoteTop = 50;
let newNoteLeft = 50;

export function initializeCards() {
  cardCount = parseInt(localStorage.getItem("card-count")) || 0;
  for (let index = 0; index < cardCount; index++) {
    const savedPosition = localStorage.getItem(`card-position-${index}`);
    if (savedPosition) {
      const { top, left, content } = JSON.parse(savedPosition);
      createCard(index, top, left, content);
    }
  }
}

export function createNewNote() {
  createCard(cardCount, newNoteTop, newNoteLeft, "New Note");
  newNoteLeft += 5;
  newNoteTop += 5;
  cardCount++;
  localStorage.setItem("card-count", cardCount);
}

export function saveCardPosition(card, index) {
  const editableContent = card.querySelector(".editable-content");
  const position = {
    top: card.offsetTop,
    left: card.offsetLeft,
    content: editableContent.textContent,
  };
  localStorage.setItem(`card-position-${index}`, JSON.stringify(position));
}

export function deleteCard(card, index) {
  card.remove();
  localStorage.removeItem(`card-position-${index}`);
  cardCount--;
  localStorage.setItem("card-count", cardCount);
}
