import { initializeCards, createNewNote } from "./cardManager.js";

window.onload = initializeCards;

document
  .getElementById("create-new-note")
  .addEventListener("click", createNewNote);
