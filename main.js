const resetBtn = document.querySelector('.reset-btn');
const canvas = document.querySelector('.canvas');

resetBtn.addEventListener('click', () => {
  setup();
});

const WIDTH = 320;
const HEIGHT = 550;

let grid;
let cellSize = 5;
let rows = WIDTH / cellSize;
let columns = HEIGHT / cellSize;
let hue = 1;

function makeLookoutTable(rows, cols) {
  let arr = new Array(rows);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

function setup() {
  const cnv = createCanvas(WIDTH, HEIGHT);
  cnv.parent(canvas);
  colorMode(HSB, 360, 255, 255);
  grid = makeLookoutTable(rows, columns);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      grid[i][j] = 0;
    }
  }
}

function mouseDragged() {
  let mouseHorizontal = floor(mouseX / cellSize);
  let mouseVertical = floor(mouseY / cellSize);
  let paintWidth = 5;

  for (let i = -floor(paintWidth / 2); i < floor(paintWidth / 2); i++) {
    for (let j = -floor(paintWidth / 2); j < floor(paintWidth / 2); j++) {
      let fullMouseHorizontal = mouseHorizontal + i;
      let fullMouseVertical = mouseVertical + j;

      if (
        fullMouseHorizontal >= 0 &&
        fullMouseHorizontal < rows &&
        grid[fullMouseHorizontal][fullMouseVertical] === 0
      ) {
        grid[fullMouseHorizontal][fullMouseVertical] = hue;
      }
    }

    hue = hue >= 360 ? 1 : hue + 0.2;
  }
}

function draw() {
  background(0);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let x = i * cellSize;
      let y = j * cellSize;

      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        noStroke();
        square(x, y, cellSize);
      }
    }
  }

  const next = makeLookoutTable(rows, columns);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (grid[i][j] > 0) {
        const randomDirection = random([-1, 1]);
        const dumpCell =
          i - randomDirection >= 0 &&
          i - randomDirection <= rows - 1 &&
          grid[i - randomDirection][j + 1];

        if (grid[i][j + 1] === 0) {
          next[i][j + 1] = grid[i][j];
        } else if (dumpCell === 0) {
          next[i - randomDirection][j + 1] = grid[i][j];
        } else {
          next[i][j] = grid[i][j];
        }
      }
    }
  }
  grid = next;
}
