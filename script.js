// -----------------------
// read me
// 
// -----------------------
const board = {};
// canvas setup
board.canvas = document.querySelector('.whiteboard');
board.ctx = board.canvas.getContext('2d');
board.ctx.strokeStyle = '#000000';
board.ctx.lineJoin = 'round';
board.ctx.lineCap = 'round';
board.ctx.lineWidth = 3;

// element selectors:
board.sizeBtns = document.querySelectorAll('.sizes__brush');
board.colourBtns = document.querySelectorAll('.colours__brush');
// making board.colourBtn$ = document.querySelector('.colours__brush--$'):
// board.brushColours = document.querySelector('.colours');
// board.colourBtns = [...board.brushColours.children];
// board.selectColourBtns = (buttonEle, index) => 
//   board[`colourBtn${index + 1}`] = document.querySelector(`.${buttonEle.classList[1]}`);
// board.colourBtns.forEach(board.selectColourBtns);

// -----------------------
// toolbox
// -----------------------
board.tools = function() {
  handleBrushSize = function() {
    const size = this.dataset.size;
    if (size === 'small') board.ctx.lineWidth = 3;
    if (size === 'medium') board.ctx.lineWidth = 6;
    if (size === 'large') board.ctx.lineWidth = 9;
  }

  handleBrushColour = function() {
    const colour = this.dataset.colour;
    board.ctx.strokeStyle = colour;
  }

  board.sizeBtns.forEach(btn => btn.addEventListener('click', handleBrushSize));
  board.colourBtns.forEach(btn => btn.addEventListener('click', handleBrushColour));
} 
// -----------------------
// init
// -----------------------
board.init = function() {
  console.log('init');
  board.tools();
}
// -----------------------
// doc ready
// -----------------------
document.addEventListener("DOMContentLoaded", function() {
  board.init();
});