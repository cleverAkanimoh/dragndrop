import { saveCardPosition, deleteCard } from "./cardManager.js";
import {
  mouseDown,
  mouseUp,
  mouseMove,
  touchStart,
  touchMove,
  touchEnd,
} from "./dragHandler.js";

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

  editableContent.addEventListener("blur", function () {
    saveCardPosition(card, index);
  });

  // Enable editing on touch
  editableContent.addEventListener("touchstart", function () {
    editableContent.focus();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.addEventListener("click", function () {
    deleteCard(card, index);
  });

  card.appendChild(editableContent);
  card.appendChild(deleteBtn);
  document.body.appendChild(card);

  card.addEventListener("mousedown", mouseDown);
  card.addEventListener("touchstart", touchStart);

  saveCardPosition(card, index);
}
