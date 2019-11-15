const getEmptyArray = () => {
  numRows = 20;
  numCols = 20;
  gameArray = new Array();
  for (let index = 0; index < numRows * numCols; index++) {
    gameArray.push(0);
  }
  return gameArray;
};
getEmptyArray();
// console.log(gameArray);

const addMines = () => {
  numMines = 40;
  while (gameArray.filter(element => element === "mine").length < numMines) {
    position = Math.floor(Math.random() * (gameArray.length - 1));
    gameArray[position] !== "mine"
      ? gameArray.splice([position], 1, "mine")
      : null;
  }
};

addMines();
// console.log(gameArray);

const render = () => {
  document.getElementsByClassName(".inner").innerHTML = "";
  for (let index = 0; index < numRows; index++) {
    let node = document.createElement("P");
    let thisRow = gameArray.slice(index * numCols, index * numCols + numCols);
    let text = document.createTextNode(thisRow);
    node.appendChild(text);
    document.getElementById("inner").appendChild(node);
  }
};
let addRowToGrid = "";
const addElementsToRows = () => {
  for (let index = 0; index < numRows; index++) {
    let thisRow = gameArray.slice(index * numCols, index * numCols + numCols);
    let thisRowFormatted = "";

    for (let index = 0; index < numCols; index++) {
      thisRowFormatted += `<span>${thisRow[index]}</span>`;
    }
    addRowToGrid += `<p>${thisRowFormatted}</p>`;
    document.getElementById("inner").innerHTML = addRowToGrid;
  }
  // document.getElementsByClassName(".inner").innerHTML()
};

const addAdjacentNumbering = () => {
  while (gameArray.filter(element => element === "mine").length > 0) {
    position = gameArray.findIndex(pos => pos === "mine");
    // adding 1 above on the left
    gameArray[position - numCols - 1] =
      gameArray[position - numCols - 1] !== "mine" &&
      gameArray[position - numCols - 1] !== "X" &&
      position >= numCols &&
      position % numCols !== 0
        ? gameArray[position - numCols - 1] + 1
        : gameArray[position - numCols - 1];

    // adding 1 above
    gameArray[position - numCols] =
      gameArray[position - numCols] !== "mine" &&
      gameArray[position - numCols] !== "X" &&
      position >= numCols
        ? gameArray[position - numCols] + 1
        : gameArray[position - numCols];

    // adding 1 above on the right
    gameArray[position - numCols + 1] =
      gameArray[position - numCols + 1] !== "mine" &&
      gameArray[position - numCols + 1] !== "X" &&
      position >= numCols &&
      (position + 1) % numCols !== 0
        ? gameArray[position - numCols + 1] + 1
        : gameArray[position - numCols + 1];

    // adding 1 to the left
    gameArray[position - 1] =
      gameArray[position - 1] !== "mine" &&
      gameArray[position - 1] !== "X" &&
      position % numCols !== 0
        ? gameArray[position - 1] + 1
        : gameArray[position - 1];

    // adding 1 to the right
    gameArray[position + 1] =
      gameArray[position + 1] !== "mine" &&
      gameArray[position + 1] !== "X" &&
      (position + 1) % numCols !== 0
        ? gameArray[position + 1] + 1
        : gameArray[position + 1];

    // adding 1 below on the left
    gameArray[position + numCols - 1] =
      gameArray[position + numCols - 1] !== "mine" &&
      gameArray[position + numCols - 1] !== "X" &&
      position % numCols !== 0 &&
      position < numCols * (numRows - 1)
        ? gameArray[position + numCols - 1] + 1
        : gameArray[position + numCols - 1];

    // adding 1 below
    gameArray[position + numCols] =
      gameArray[position + numCols] !== "mine" &&
      gameArray[position + numCols] !== "X" &&
      position < numCols * (numRows - 1)
        ? gameArray[position + numCols] + 1
        : gameArray[position + numCols];

    // adding 1 below on the right
    gameArray[position + numCols + 1] =
      gameArray[position + numCols + 1] !== "mine" &&
      gameArray[position + numCols + 1] !== "X" &&
      position < numCols * (numRows - 1) &&
      (position + 1) % numCols !== 0
        ? gameArray[position + numCols + 1] + 1
        : gameArray[position + numCols + 1];

    gameArray[position] = "X";
  }
  while (gameArray.filter(element => element === 0).length > 0) {
    position = gameArray.findIndex(pos => pos === 0);
    gameArray[position] = "_";
  }
};

addAdjacentNumbering();
render();
addElementsToRows();
