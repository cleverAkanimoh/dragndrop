import { mouseDown, touchStart } from "./drag.js";

export function createCard(index, top, left, content) {
  const card = document.createElement("div");
  card.className = "drag-card";
  card.style.position = "absolute";
  card.style.top = `${top}px`;
  card.style.left = `${left}px`;

  const editableContent = document.createElement("div");
  editableContent.className = "editable-content";
  editableContent.contentEditable = true;
  editableContent.textContent = content;

  // Save content on blur (when the user clicks away)
  editableContent.addEventListener("blur", function () {
    saveCardPosition(card, index);
  });

  // Add event listener for touch events to focus the content
  editableContent.addEventListener("touchstart", function (event) {
    editableContent.focus();
    event.preventDefault(); // Prevent default behavior to ensure focus
  });

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'; // Using Font Awesome trash icon
  deleteBtn.addEventListener("click", function () {
    deleteCard(card, index);
  });

  card.appendChild(editableContent);
  card.appendChild(deleteBtn);
  document.body.appendChild(card);

  card.addEventListener("mousedown", mouseDown);
  card.addEventListener("touchstart", touchStart);

  // Save initial position
  saveCardPosition(card, index);
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
  card.remove(); // Remove the card from the DOM
  localStorage.removeItem(`card-position-${index}`); // Remove the card from local storage
  cardCount--; // Decrease the card count
  localStorage.setItem("card-count", cardCount); // Update card count in local storage
}
