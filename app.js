let newX = 0,
  newY = 0,
  startX = 0,
  startY = 0,
  activeCard = null;

let cardCount = 0; // Keep track of the number of cards

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
    createCard(cardCount, 50, 50, "New Note"); // Create a new card at a default position
    cardCount++;
    localStorage.setItem("card-count", cardCount); // Update the card count in local storage
  });

function createCard(index, top, left, content) {
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

  // Save initial position
  saveCardPosition(card, index);
}

function mouseDown(event) {
  activeCard = event.currentTarget;

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

function saveCardPosition(card, index) {
  const editableContent = card.querySelector(".editable-content");
  const position = {
    top: card.offsetTop,
    left: card.offsetLeft,
    content: editableContent.textContent,
  };
  localStorage.setItem(`card-position-${index}`, JSON.stringify(position));
}

function deleteCard(card, index) {
  card.remove(); // Remove the card from the DOM
  localStorage.removeItem(`card-position-${index}`); // Remove the card from local storage
  cardCount--; // Decrease the card count
  localStorage.setItem("card-count", cardCount); // Update card count in local storage
}
