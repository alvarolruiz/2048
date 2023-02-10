window.onload = init;
const width = 4;
const height = 4;
var squares = [];
var marcador = 0;
var marcadorDisplay;

function init() {
  const board = document.getElementById("board");
  crearTablero(board);
  document.addEventListener('keyup', control);
  marcadorDisplay = document.getElementById("points");
}



function getBoxColor(value) {
  let color;
  switch (value) {
    case "2": color = '#D0ECE7';
      break;
    case "4": color = '#73C6B6 ';
      break;
    case "8": color = '#ABEBC6 ';
      break;
    case "16": color = '#F9E79F';
      break;
    case "32": color = '#F8C471';
      break;
    case "64": color = '#EB984E';
      break;
    case "128": color = '#D35400';
      break;
    case "256": color = '#DA3120';
      break;
    case "512": color = '#FF0000';
      break;
    case "1024": color = '#6C3483';
      break;
    case "2048": color = '#DE0FCF';
      break;
  }
  return color;
}

/* emptyBox*/
function crearTablero(board) {
  for (i = 0; i < height; i++) {
    squares[i] = new Array();
    for (j = 0; j < width; j++) {
      square = createBox("emptyBox");
      squares[i].push(square);
    }
  }
  generateBox(2);
  generateBox(2);
  imprimirTablero();
}

function imprimirTablero() {
  board.innerHTML = "";
  for (i = 0; i < height; i++) {
    for (j = 0; j < width; j++) {
      if (squares[i][j].className == "box") {
        squares[i][j].style.backgroundColor = getBoxColor(squares[i][j].innerHTML);
      }
      board.appendChild(squares[i][j]);
    }
  }
}

function createBox(className) {
  let resultSquare;
  resultSquare = document.createElement('div');
  resultSquare.className = className;
  if (className == "box") {
    resultSquare.innerHTML = 2;
  }
  return resultSquare;
}

function generateBox(value) {
  let min = Math.ceil(0);
  let max = Math.floor(width - 1);
  validField = false;
  do {
    let x = Math.floor(Math.random() * (max - min + 1) + min);
    let y = Math.floor(Math.random() * (max - min + 1) + min);
    if (squares[y][x].className == 'emptyBox') {
      validField = true;
      squares[y][x] = createBox('box');
    }
  } while (!validField)

}

/* con cada movimiento vamos a hacer varias cosas. Mover todas las
casillas hacia el lado que indique la flecha, fusionar cajas cuando nos 
encontremos con la misma en el lado indicado por la flecha, modificar array
, cambiar color, cambiar puntuacion y generar un nuevo cuadrado.

Falta guardar los puntos en el marcador por cada movimiento y comprobar si se ha perdido o si se ha ganado.
*/


function control(e) {
  switch (e.keyCode) {
    case 37: keyLeft();
      break;
    case 38: keyTop();
      break;
    case 39: keyRight();
      break;
    case 40: keyDown();
      break;
  }
}
function keyLeft() {
  moveLeft();
  generateBox();
  imprimirTablero();
}
  /*Acumulador puntuacion obtenida en movimiento */

function moveLeft() {
  let hasCombined = [false, false, false, false];
  let combinations;

  for (i = 0; i < height; i++) {
    combinations = 0;
    for (j = 0; j < width; j++) {
      if (j > 0) {
        if (squares[i][j].className == "box") {
          let xPos = j;
          let yPos = i;
          do {
            if (sideIsEmptyBox("Left", yPos, xPos)) {
              move("Left", yPos, xPos);
              xPos -= 1;
            } else if (!hasCombined[i] && sideIsCombinable("Left", yPos, xPos)) {
              if (combinations == 1) {
                hasCombined[i] = true;
              } else {
                combinations++;
                combineBoxes("Left", yPos, xPos);
                xPos -= 1;
              }
            }
          } while (canKeepMoving("Left", yPos, xPos, hasCombined[yPos]));
        }
      }
    }
    hasCombined[i] = false;

  }
}

function keyTop() {
  moveTop();
  generateBox();
  imprimirTablero();
}

function moveTop() {
  let hasCombined = [false, false, false, false];
  let combinations;
  for (i = 0; i < height; i++) {
    combinations = 0;
    if (i > 0) {
      for (j = 0; j < width; j++) {
        if (squares[i][j].className == "box") {
          let xPos = j;
          let yPos = i;
          do {
            if (sideIsEmptyBox("Top", yPos, xPos)) {
              move("Top", yPos, xPos);
              yPos -= 1;
            } else if (!hasCombined[j] && sideIsCombinable("Top", yPos, xPos)) {
              if (combinations == 1) {
                hasCombined[j] = true;
              } else {
                combinations++;
                combineBoxes("Top", yPos, xPos);
                yPos -= 1;
              }
            }
          } while (canKeepMoving("Top", yPos, xPos, hasCombined[xPos]));
        }
      }
    }
  }
}

function keyRight() {
  moveRight();
  generateBox();
  imprimirTablero();
}

function moveRight() {
  let hasCombined = [false, false, false, false];
  let combinations;

  for (i = 0; i < height; i++) {
    combinations = 0;
    for (j = width - 1; j >= 0; j--) {
      if (j < width - 1) {
        if (squares[i][j].className == "box") {
          let xPos = j;
          let yPos = i;
          do {
            if (sideIsEmptyBox("Right", yPos, xPos)) {
              move("Right", yPos, xPos);
              xPos += 1;
            } else if (!hasCombined[i] && sideIsCombinable("Right", yPos, xPos)) {
              if (combinations == 1) {
                hasCombined[i] = true;
              } else {
                combinations++;
                combineBoxes("Right", yPos, xPos);
                xPos += 1;
              }
            }
          } while (canKeepMoving("Right", yPos, xPos, hasCombined[i]));

        }
      }
    }
  }
}

function keyDown() {
  moveDown();
  generateBox();
  imprimirTablero();
}

function moveDown() {
  let hasCombined = [false, false, false, false];
  let combinations = 0;
  for (i = height - 1; i >= 0; i--) {
    combinations = 0;
    for (j = 0; j < width - 1; j++) {
      if (i < height - 1) {
        if (squares[i][j].className == "box") {
          let xPos = j;
          let yPos = i;
          do {
            if (sideIsEmptyBox("Bottom", yPos, xPos)) {
              move("Bottom", yPos, xPos);
              yPos += 1;
            } else if (!hasCombined[j] && sideIsCombinable("Bottom", yPos, xPos)) {
              if (combinations == 1) {
                hasCombined[j] = true;
              } else {
                combinations++;
                combineBoxes("Bottom", yPos, xPos);
                yPos += 1;
              }
            }
          } while (canKeepMoving("Bottom", yPos, xPos, hasCombined[j]));
        }
      }
    }
  }
}


function canKeepMoving(side, y, x, hasCombined) {
  let canKeepMoving = true;
  switch (side) {
    case "Left":
      if (x == 0 ||
        ((squares[y][x].innerHTML == squares[y][x - 1].innerHTML) && hasCombined && squares[y][x - 1].className == "box") ||
        ((squares[y][x].innerHTML != squares[y][x - 1].innerHTML) && squares[y][x - 1].className == "box")) {
        canKeepMoving = false;
      }
      break;
    case "Right":
      if (x == width - 1 ||
        ((squares[y][x].innerHTML == squares[y][x + 1].innerHTML) && hasCombined && squares[y][x + 1].className == "box") ||
        ((squares[y][x].innerHTML != squares[y][x + 1].innerHTML) && squares[y][x + 1].className == "box")) {
        canKeepMoving = false;
      }
      break;
    case "Bottom":
      if (y == height - 1 ||
        ((squares[y][x].innerHTML == squares[y + 1][x].innerHTML) && hasCombined && squares[y + 1][x].className == "box") ||
        ((squares[y][x].innerHTML != squares[y + 1][x].innerHTML) && squares[y + 1][x].className == "box")) {
        canKeepMoving = false;
      }
      break;

    case "Top":
      if (y == 0 ||
        ((squares[y][x].innerHTML == squares[y - 1][x].innerHTML) && hasCombined && squares[y - 1][x].className == "box") ||
        ((squares[y][x].innerHTML != squares[y - 1][x].innerHTML) && squares[y - 1][x].className == "box")) {
        canKeepMoving = false;
      }
      break;
  }
  return canKeepMoving;
}

function move(side, y, x) {
  switch (side) {
    case "Left":
      squares[y][x - 1].innerHTML = squares[y][x].innerHTML;
      squares[y][x - 1].className = squares[y][x].className;
      squares[y][x - 1].style.backgroundColor = getBoxColor(squares[y][x - 1].innerHTML);

      emptyCurrentBox(y, x);
      break;
    case "Right":
      squares[y][x + 1].innerHTML = squares[y][x].innerHTML;
      squares[y][x + 1].className = squares[y][x].className;
      squares[y][x + 1].style.backgroundColor = getBoxColor(squares[y][x + 1].innerHTML);
      emptyCurrentBox(y, x);
      break;
    case "Bottom":
      squares[y + 1][x].innerHTML = squares[y][x].innerHTML;
      squares[y + 1][x].className = squares[y][x].className;
      squares[y + 1][x].style.backgroundColor = getBoxColor(squares[y + 1][x].innerHTML);
      emptyCurrentBox(y, x);
      break;
    case "Top":
      squares[y - 1][x].innerHTML = squares[y][x].innerHTML;
      squares[y - 1][x].className = squares[y][x].className;
      squares[y - 1][x].style.backgroundColor = getBoxColor(squares[y - 1][x].innerHTML);

      emptyCurrentBox(y, x);
      break;

  }
}

function combineBoxes(side, y, x) {
  switch (side) {
    case "Left":
      squares[y][x - 1].innerHTML = (parseInt(squares[y][x].innerHTML) + parseInt(squares[y][x - 1].innerHTML)).toString();
      emptyCurrentBox(y, x);
      break;
    case "Right":
      squares[y][x + 1].innerHTML = (parseInt(squares[y][x].innerHTML) + parseInt(squares[y][x + 1].innerHTML)).toString();
      emptyCurrentBox(y, x);
      break;
    case "Bottom":
      squares[y + 1][x].innerHTML = (parseInt(squares[y][x].innerHTML) + parseInt(squares[y + 1][x].innerHTML)).toString();
      emptyCurrentBox(y, x);
      break;
    case "Top":
      squares[y - 1][x].innerHTML = (parseInt(squares[y][x].innerHTML) + parseInt(squares[y - 1][x].innerHTML)).toString();
      emptyCurrentBox(y, x);
      break;
  }
}

function emptyCurrentBox(y, x) {
  squares[y][x].innerHTML = "";
  squares[y][x].className = "emptyBox";
  squares[y][x].style.backgroundColor = '#e7e7e760';

}

function sideIsCombinable(side, y, x) {
  let isCombinable = false;
  switch (side) {
    case "Left":
      isCombinable = (squares[y][x].innerHTML == squares[y][x - 1].innerHTML) && (squares[y][x - 1].className == "box");
      break;
    case "Right":
      isCombinable = (squares[y][x].innerHTML == squares[y][x + 1].innerHTML) && (squares[y][x + 1].className == "box");
      break;
    case "Bottom":
      isCombinable = (squares[y][x].innerHTML == squares[y + 1][x].innerHTML) && (squares[y + 1][x].className == "box");
      break;
    case "Top":
      isCombinable = (squares[y][x].innerHTML == squares[y - 1][x].innerHTML) && (squares[y - 1][x].className == "box");
      break;
  }
  return isCombinable;
}

function sideIsEmptyBox(side, y, x) {
  let isEmptyBox = false;
  switch (side) {
    case "Left":
      isEmptyBox = squares[y][x - 1].className == "emptyBox";
      break;
    case "Right":
      isEmptyBox = squares[y][x + 1].className == "emptyBox";
      break;
    case "Bottom":
      isEmptyBox = squares[y + 1][x].className == "emptyBox";
      break;
    case "Top":
      isEmptyBox = squares[y - 1][x].className == "emptyBox";
      break;
  }
  return isEmptyBox;
}




