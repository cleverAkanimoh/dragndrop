export let newX = 0,
  newY = 0,
  startX = 0,
  startY = 0,
  activeCard = null;

export function mouseDown(event) {
  activeCard = event.currentTarget;

  // Set the initial coordinates for the drag
  startX = event.clientX;
  startY = event.clientY;

  // Add mousemove and mouseup listeners to the document for smooth dragging
  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
}

export function touchStart(event) {
  activeCard = event.currentTarget;

  // Set the initial coordinates for the drag
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;

  // Add touchmove and touchend listeners to the document for smooth dragging
  document.addEventListener("touchmove", touchMove);
  document.addEventListener("touchend", touchEnd);

  // Prevent default touch actions
  event.preventDefault();
}

function mouseMove(event) {
  if (!activeCard) return;

  // Calculate the new position of the active card
  newX = startX - event.clientX;
  newY = startY - event.clientY;

  startX = event.clientX;
  startY = event.clientY;

  // Update the card's position
  activeCard.style.top = `${activeCard.offsetTop - newY}px`;
  activeCard.style.left = `${activeCard.offsetLeft - newX}px`;
}

function touchMove(event) {
  if (!activeCard) return;

  // Calculate the new position of the active card
  newX = startX - event.touches[0].clientX;
  newY = startY - event.touches[0].clientY;

  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;

  // Update the card's position
  activeCard.style.top = `${activeCard.offsetTop - newY}px`;
  activeCard.style.left = `${activeCard.offsetLeft - newX}px`;
}

function mouseUp() {
  // Save the current position of the active card to local storage
  const cardIndex = Array.prototype.indexOf.call(
    document.getElementsByClassName("drag-card"),
    activeCard
  );
  saveCardPosition(activeCard, cardIndex);

  // Remove the mousemove and mouseup listeners after the drag is complete
  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);

  // Reset activeCard
  activeCard = null;
}

function touchEnd() {
  // Save the current position of the active card to local storage
  const cardIndex = Array.prototype.indexOf.call(
    document.getElementsByClassName("drag-card"),
    activeCard
  );
  saveCardPosition(activeCard, cardIndex);

  // Remove the touchmove and touchend listeners after the drag is complete
  document.removeEventListener("touchmove", touchMove);
  document.removeEventListener("touchend", touchEnd);

  // Reset activeCard
  activeCard = null;
}
