window.onload = init;

function init() {
  const board = document.getElementById("board");
  const width = 4;
  const height = 4;
  let squares = [];
  crearTablero(board);

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
        squares[i][j].style.backgroundColor = getBoxColor(squares[i][j].innerHTML);
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
    } else {

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

  document.addEventListener('keyup', control);

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
  /* con cada movimiento vamos a hacer varias cosas. Mover todas las
  casillas hacia el lado que indique la flecha, fusionar cajas cuando nos 
  encontremos con la misma en el lado indicado por la flecha, modificar array
  , cambiar color, cambiar puntuacion y generar un nuevo cuadrado.

  El movimiento se realizara de la siguiente forma. 
  No se mueven en:
  Izquierda: cajas en h,0
  Derecha: cajas en y,w-1;
  */

  function keyLeft() {
    for (i = 0; i < squares.length; i++) {
      for (j = 0; j < squares[i].length; j++) {
        if (j > 0) {
          if (squares[i][j].className == "box") {
            let xPos = j;
            let yPos = i;
            do{
              let canMove = true;
              if (squares[yPos][xPos-1].className == "emptyBox") {
                squares[yPos][xPos - 1]= squares[yPos][xPos];
                squares[yPos][j].className = "emptyBox";
                squares[yPos][j].innerHTML = "";
                xPos -=1;
              } else {
                if ((squares[i][j].innerHTML == squares[i][j - 1].innerHTML) && (squares[yPos][xPos-1].className != "emptyBox")){
                  squares[i][j - 1] = squares[i][j].innerHTML+ squares[i][j - 1].innerHTML;
                  squares[i][j].className = "emptyBox";
                }
              }
            }while(canMove);
            
          }
        }
      }
    }
    /*x-- */
  }
  function keyTop() {
    /*y-- */

  }
  function keyRight() {
    /*x++ */

  }
  function keyDown() {
    /*y++ */

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
}


