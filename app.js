const eraserBtn = document.querySelector('#eraser-btn');
const destroyBtn = document.querySelector('#destroy-btn');
const modeBtn = document.querySelector('#mode-btn');
const lineWidth = document.querySelector('#line-width');
const color = document.querySelector('#color');
const colorOptions = document.querySelectorAll('.color-option');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;

const colors = ['#1abc9c', '#2ecc71', '#f1c40f', '#d35400', '#2c3e50'];

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function onDown(event) {
  isPainting = true;
}
function cancelPainting(event) {
  isPainting = false;
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
function onColorOptionClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}
function onModeClick(event) {
  isFilling = !isFilling;
  modeBtn.innerText = isFilling ? 'Draw' : 'Fill';
}
function onCanvasClick(event) {
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
function onDestroyClick(event) {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function onEraserClick(event) {
  ctx.strokeStyle = 'white';
  isFilling = false;
  modeBtn.innerText = isFilling ? 'Draw' : 'Fill';
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', onDown);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);

colorOptions.forEach((option) => {
  option.addEventListener('click', onColorOptionClick);
});

modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraserBtn.addEventListener('click', onEraserClick);
