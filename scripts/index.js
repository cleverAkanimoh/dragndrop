import { createCard } from "./card.js";
import { mouseDown, touchStart } from "./drag.js";

let cardCount = 0; // Keep track of the number of cards
let newNoteTop = 50;
let newNoteLeft = 50;

// Load card positions from local storage
window.onload = function () {
  cardCount = parseInt(localStorage.getItem("card-count")) || 0;
  for (let index = 0; index < cardCount; index++) {
    const savedPosition = localStorage.getItem(`card-position-${index}`);
    if (savedPosition) {
      const { top, left, content } = JSON.parse(savedPosition);
      createCard(index, top, left, content);
    }
  }
};

// Add event listener to the "Create New Note" button
document
  .getElementById("create-new-note")
  .addEventListener("click", function () {
    createCard(cardCount, newNoteTop, newNoteLeft, "New Note"); // Create a new card at a default position
    newNoteLeft += 5;
    newNoteTop += 5;
    cardCount++;
    localStorage.setItem("card-count", cardCount); // Update the card count in local storage
  });
