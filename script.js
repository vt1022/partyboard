// -----------------------
// read me
// 
// -----------------------
const board = {};
// element selectors:
board.canvas = document.querySelector('.whiteboard');
board.sizeBtns = document.querySelectorAll('.sizes__brush');
board.colourBtns = document.querySelectorAll('.colours__brush');
board.clearBtn = document.querySelector('.others__clear');
board.tools = document.querySelector('.tools');
// canvas setup:
board.canvas.width = window.innerWidth;
board.canvas.height = window.innerHeight;
board.ctx = board.canvas.getContext('2d');
board.ctx.strokeStyle = '#000000';
board.ctx.lineJoin = 'round';
board.ctx.lineCap = 'round';
board.ctx.lineWidth = 3;
// -----------------------
// toolbox
// -----------------------
board.handleBrushSize = function() {
  board.ctx.lineWidth = this.dataset.size;
}
board.handleBrushColour = function() {
  board.ctx.strokeStyle = this.dataset.colour;
}

board.handleMouseDown = function() {
  board.tools.style.zIndex = 0;
  board.isMouseDown = true;
}
board.handleMouseUp = function() {
  board.tools.style.zIndex = 10;
  board.isMouseDown = false;
}

board.clearBoard = function() {
  board.ctx.clearRect(0, 0, board.canvas.width, board.canvas.height);
  board.handleWindowResize();
}
// -----------------------
// drawing function
// -----------------------
board.lastX = 0;
board.lastY = 0;
board.isMouseDown = false;

board.draw = function(e) {
  if (board.isMouseDown) {
    board.ctx.strokeStyle === '#ffeeee' //eraser
      ? board.ctx.globalCompositeOperation = 'destination-out'
      : board.ctx.globalCompositeOperation = 'source-over';
    
    board.ctx.beginPath();
    board.ctx.moveTo(board.lastX, board.lastY); //start
    board.ctx.lineTo(e.offsetX, e.offsetY); //end
    board.ctx.stroke();
  }
  board.lastX = e.offsetX;
  board.lastY = e.offsetY;
}
// -----------------------
// change canvas size on window resize
// -----------------------
board.handleWindowResize = function(){
  board.canvas.width = window.innerWidth;
  board.canvas.height = window.innerHeight;
  board.ctx.lineJoin = 'round';
  board.ctx.lineCap = 'round';
  board.ctx.lineWidth = 3;
}
// -----------------------
// init
// -----------------------
board.init = function() {
  // canvas behaviors:
  board.canvas.addEventListener('mousemove', board.draw);
  board.canvas.addEventListener('mouseup', board.handleMouseUp);
  board.canvas.addEventListener('mouseout', board.handleMouseUp);
  board.canvas.addEventListener('mousedown', board.handleMouseDown);
  // window.addEventListener('resize', board.handleWindowResize);
  
  // toolbox clicks:
  board.sizeBtns.forEach(btn => btn.addEventListener('click', board.handleBrushSize));
  board.colourBtns.forEach(btn => btn.addEventListener('click', board.handleBrushColour));
  board.clearBtn.addEventListener('click', board.clearBoard);

  // styling:
  board.colourBtns.forEach(btn => btn.style.backgroundColor = btn.dataset.colour);
}
// -----------------------
// doc ready
// -----------------------
document.addEventListener("DOMContentLoaded", function() {
  board.init();
});