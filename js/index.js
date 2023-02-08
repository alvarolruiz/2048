window.onload = init;
const width = 4;
const height = 4;
var squares = [];

function init() {
  const board = document.getElementById("board");
  crearTablero(board);
  document.addEventListener('keyup', control);
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
      } else {
        squares[i][j].style.backgroundColor = '#e7e7e760';
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

El movimiento se realizara de la siguiente forma. 
No se mueven en:
Izquierda: cajas en h,0
Derecha: cajas en y,w-1;
*/


function control(e) {
  switch (e.keyCode) {
    case 37: keyLeft();
      break
    case 38: keyTop();
      break
    case 39: keyRight();
      break
    case 40: keyDown();
      break
  }
}
function keyLeft() {
  let canMove = true;
  for (i = 0; i < height; i++) {
    for (j = 0; j < width; j++) {
      if (j > 0) {
        if (squares[i][j].className == "box") {
          let xPos = j;
          let yPos = i;
          do {
            canMove = true;
            if (squares[yPos][xPos - 1].className == "emptyBox") {
              squares[yPos][xPos - 1].innerHTML = squares[yPos][xPos].innerHTML;
              squares[yPos][xPos - 1].className = squares[yPos][xPos].className;
              squares[yPos][xPos].innerHTML = "";
              squares[yPos][xPos].className = "emptyBox";
              xPos -= 1;
            } else {
              if ((squares[yPos][xPos].innerHTML == squares[yPos][xPos - 1].innerHTML) && (squares[yPos][xPos - 1].className == "box")) {
                squares[yPos][xPos - 1].innerHTML = (parseInt(squares[yPos][xPos].innerHTML) + parseInt(squares[yPos][xPos - 1].innerHTML)).toString();
                squares[yPos][xPos].innerHTML = "";
                squares[yPos][xPos].className = "emptyBox";
                xPos -= 1;
              }
            }
            if (xPos == 0 || ((squares[yPos][xPos].innerHTML != squares[yPos][xPos - 1].innerHTML) && (squares[yPos][xPos - 1].className == "box"))) {
              canMove = false;
            }

          } while (canMove == true);

        }
      }
    }
  }
  imprimirTablero();
}

function keyTop() {
  /*y-- */

}

function keyRight() {

  let canMove = true;
  for (i = 0; i < height; i++) {
    for (j = width - 1; j >= 0; j--) {
      if (j < width - 1) {
        if (squares[i][j].className == "box") {
          let xPos = j;
          let yPos = i;
          do {
            canMove = true;
            if (squares[yPos][xPos + 1].className == "emptyBox") {
              squares[yPos][xPos + 1].innerHTML = squares[yPos][xPos].innerHTML;
              squares[yPos][xPos + 1].className = squares[yPos][xPos].className;
              squares[yPos][xPos].innerHTML = "";
              squares[yPos][xPos].className = "emptyBox";
              xPos += 1;
            } else {
              if ((squares[yPos][xPos].innerHTML == squares[yPos][xPos + 1].innerHTML) && (squares[yPos][xPos + 1].className == "box")) {
                squares[yPos][xPos + 1].innerHTML = (parseInt(squares[yPos][xPos].innerHTML) + parseInt(squares[yPos][xPos + 1].innerHTML)).toString();
                squares[yPos][xPos].innerHTML = "";
                squares[yPos][xPos].className = "emptyBox";
                xPos += 1;
              }
            }
            if (xPos == 3 || ((squares[yPos][xPos].innerHTML != squares[yPos][xPos + 1].innerHTML) && (squares[yPos][xPos + 1].className == "box"))) {
              canMove = false;
            }

          } while (canMove);

        }
      }
    }
  }
  imprimirTablero();
  /*x++ */

}
function keyDown() {
  /*y++ */

}



