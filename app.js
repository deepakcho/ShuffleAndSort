"user strict";
// below code will written and tested on chrome latest browser

class CellGenerator {
  #gridContainer;
  #cells;
  #colorPallet;
  #error = false;

  constructor(gridContainer, cells = [], colorPallet = []) {
    if (!(gridContainer && cells.length && colorPallet.length)) {
      console.error("Please pass all required parameters!!!");
      this.#error = true;
      return;
    }
    this.#gridContainer = gridContainer;
    this.#cells = cells;
    this.#colorPallet = colorPallet;

    this.#generateCells(cells, gridContainer, colorPallet);
  }

  shuffleAndRender() {
    if (this.#error) return;
    const shuffledCells = this.#shuffle(this.#cells);

    this.#generateCells(shuffledCells, this.#gridContainer, this.#colorPallet);
  }

  sortAndRender() {
    if (this.#error) return;
    const sortedCells = this.#sort(this.#cells);

    this.#generateCells(sortedCells, this.#gridContainer, this.#colorPallet);
  }

  #generateCells(cells, gridContainer, colorPallet) {
    gridContainer.innerHTML = "";
    cells.forEach((cell) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("cell");

      const bgElement = document.createElement("div");
      bgElement.style.backgroundColor = colorPallet[cell];
      bgElement.classList.add("bg");

      const textElement = document.createElement("div");
      textElement.classList.add("text");
      textElement.textContent = cell;

      cellElement.append(bgElement);
      cellElement.append(textElement);

      gridContainer.append(cellElement);
    });
  }

  #shuffle(cells) {
    const random = cells.map(Math.random);
    const cellsCopy = [...cells];
    return cellsCopy.sort(function (first, second) {
      return (
        random[cellsCopy.indexOf(first)] - random[cellsCopy.indexOf(second)]
      );
    });
  }

  #sort(cells) {
    const cellsCopy = [...cells];
    return cellsCopy.sort((a, b) => a - b);
  }
}

// Getting elements
const gridContainer = document.querySelector(".gridContainer");
const actionContainer = document.querySelector(".control");

// cells to show
let cells = [];
cells.length = 9;
cells.fill(0);
cells = cells.map((cell, index) => index + 1);

// randomly added
const colorPallet = [
  "#6F98A8",
  "#72C3DC",
  "#2F454E",
  "#72C3DC",
  "#2F454E",
  "#BFBFBF",
  "#BFBFBF",
  "#2F454E",
  "#72C3DC",
  "#72C3DC",
];

// Creating instance of class
const cellGenerator = new CellGenerator(gridContainer, cells, colorPallet);

// Event Listener
actionContainer.addEventListener("click", (e) => {
  if (e.target.id === "sort") {
    cellGenerator.sortAndRender();
  }
  if (e.target.id === "shuffle") {
    cellGenerator.shuffleAndRender();
  }
});
