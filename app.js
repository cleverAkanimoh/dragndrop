let newX = 0,
  newY = 0,
  startX = 0,
  startY = 0;

const cards = document.getElementsByClassName("drag-card");

for (let index = 0; index < cards.length; index++) {
  const card = cards[index];

  card.addEventListener("mousedown", mouseDown);
}

function mouseDown(event) {
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];

    startX = event.clientX;
    startY = event.clientY;

    card.addEventListener("mousemove", mouseMove);
    card.addEventListener("mouseup", mouseUp);
  }
}

function mouseMove(event) {
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];

    newX = startX - event.clientX;
    newY = startY - event.clientY;

    startX = event.clientX;
    startY = event.clientY;

    card.style.top = `${card.offsetTop - newY}px`;
    card.style.left = `${card.offsetLeft - newX}px`;
  }
}

function mouseUp(event) {
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];
    card.removeEventListener("mousemove", mouseMove);
  }
  //   document.removeEventListener("mousemove", mouseMove);
}
