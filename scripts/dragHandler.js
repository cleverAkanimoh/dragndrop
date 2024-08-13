import { saveCardPosition } from "./cardManager.js";

let newX = 0,
  newY = 0,
  startX = 0,
  startY = 0,
  activeCard = null;

export function mouseDown(event) {
  activeCard = event.currentTarget;
  startX = event.clientX;
  startY = event.clientY;
  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
}

export function touchStart(event) {
  activeCard = event.currentTarget;
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
  document.addEventListener("touchmove", touchMove);
  document.addEventListener("touchend", touchEnd);
  event.preventDefault();
}

export function mouseMove(event) {
  if (!activeCard) return;
  newX = startX - event.clientX;
  newY = startY - event.clientY;
  startX = event.clientX;
  startY = event.clientY;
  activeCard.style.top = `${activeCard.offsetTop - newY}px`;
  activeCard.style.left = `${activeCard.offsetLeft - newX}px`;
}

export function touchMove(event) {
  if (!activeCard) return;
  newX = startX - event.touches[0].clientX;
  newY = startY - event.touches[0].clientY;
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
  activeCard.style.top = `${activeCard.offsetTop - newY}px`;
  activeCard.style.left = `${activeCard.offsetLeft - newX}px`;
}

export function mouseUp() {
  const cardIndex = Array.prototype.indexOf.call(
    document.getElementsByClassName("drag-card"),
    activeCard
  );
  saveCardPosition(activeCard, cardIndex);
  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);
  activeCard = null;
}

export function touchEnd() {
  const cardIndex = Array.prototype.indexOf.call(
    document.getElementsByClassName("drag-card"),
    activeCard
  );
  saveCardPosition(activeCard, cardIndex);
  document.removeEventListener("touchmove", touchMove);
  document.removeEventListener("touchend", touchEnd);
  activeCard = null;
}
