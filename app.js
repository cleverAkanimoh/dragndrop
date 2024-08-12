let newX = 0,
  newY = 0,
  startX = 0,
  startY = 0,
  activeCard = null;

const cards = document.getElementsByClassName("drag-card");

// Load card positions from local storage
window.onload = function () {
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];
    const savedPosition = localStorage.getItem(`card-position-${index}`);
    if (savedPosition) {
      const { top, left } = JSON.parse(savedPosition);
      card.style.position = "absolute";
      card.style.top = `${top}px`;
      card.style.left = `${left}px`;
    }
  }
};

// Add mousedown event listener to all cards
for (let index = 0; index < cards.length; index++) {
  const card = cards[index];
  card.addEventListener("mousedown", mouseDown);
}

function mouseDown(event) {
  activeCard = event.target;

  // Set the initial coordinates for the drag
  startX = event.clientX;
  startY = event.clientY;

  // Add mousemove and mouseup listeners to the document for smooth dragging
  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
}

function mouseMove(event) {
  if (!activeCard) return;

  // Calculate the new position of the active card
  newX = startX - event.clientX;
  newY = startY - event.clientY;

  startX = event.clientX;
  startY = event.clientY;

  // Update the card's position
  //   activeCard.style.position = "absolute";
  activeCard.style.top = `${activeCard.offsetTop - newY}px`;
  activeCard.style.left = `${activeCard.offsetLeft - newX}px`;
}

function mouseUp() {
  // Save the current position of the active card to local storage
  const cardIndex = Array.prototype.indexOf.call(cards, activeCard);
  const position = {
    top: activeCard.offsetTop,
    left: activeCard.offsetLeft,
  };
  localStorage.setItem(`card-position-${cardIndex}`, JSON.stringify(position));

  // Remove the mousemove and mouseup listeners after the drag is complete
  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);

  // Reset activeCard
  activeCard = null;
}
