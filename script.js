// JavaScript Document
// Set up the canvas
const canvasContainer = document.getElementById('canvas-container');
const canvas = document.createElement('canvas');
canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight;
canvasContainer.appendChild(canvas);
const ctx = canvas.getContext('2d');

let isDragging = false;
let offsetX, offsetY;
let selectedShape;

// Shapes data
const shapes = [
  { type: 'circle', color: 'red', radius: 25, x: 100, y: 100 }, // Example initial position
  { type: 'square', color: 'blue', size: 50, x: 200, y: 200 }, // Example initial position
  // Add more shapes as needed
];

// Event listeners
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);

// Draw initial shapes
drawShapes();

// Functions
function drawShapes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach((shape) => {
    drawShape(shape);
  });
}

function drawShape(shape) {
  ctx.fillStyle = shape.color;
  if (shape.type === 'circle') {
    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
    ctx.fill();
  } else if (shape.type === 'square') {
    ctx.fillRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
  }
  // Add more shape drawing logic as needed
}

function handleMouseDown(event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  handleDragStart(mouseX, mouseY);
}

function handleTouchStart(event) {
  const touch = event.touches[0];
  const touchX = touch.clientX - canvas.getBoundingClientRect().left;
  const touchY = touch.clientY - canvas.getBoundingClientRect().top;
  handleDragStart(touchX, touchY);
}

function handleDragStart(x, y) {
  shapes.forEach((shape) => {
    if (isInsideShape(x, y, shape)) {
      isDragging = true;
      selectedShape = shape;
      offsetX = x - shape.x;
      offsetY = y - shape.y;
    }
  });
}

function handleMouseMove(event) {
  if (isDragging) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    handleDragMove(mouseX, mouseY);
  }
}

function handleTouchMove(event) {
  if (isDragging) {
    const touch = event.touches[0];
    const touchX = touch.clientX - canvas.getBoundingClientRect().left;
    const touchY = touch.clientY - canvas.getBoundingClientRect().top;
    handleDragMove(touchX, touchY);
  }
}

function handleDragMove(x, y) {
  selectedShape.x = x - offsetX;
  selectedShape.y = y - offsetY;
  drawShapes();
}

function handleMouseUp() {
  isDragging = false;
}

function handleTouchEnd() {
  isDragging = false;
}

function isInsideShape(x, y, shape) {
  if (shape.type === 'circle') {
    const distance = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
    return distance <= shape.radius;
  } else if (shape.type === 'square') {
    return (
      x >= shape.x - shape.size / 2 &&
      x <= shape.x + shape.size / 2 &&
      y >= shape.y - shape.size / 2 &&
      y <= shape.y + shape.size / 2
    );
  }
  // Add more shape collision detection as needed
}

// ... (Previous code remains unchanged)

let selectedImage;

// Add an event listener for image selection
document.getElementById('imageSelect').addEventListener('change', function () {
  selectedImage = this.value;
  drawShapes();
});

function drawShapes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach((shape) => {
    drawShape(shape);
  });

  // Check if there's a selected image
  if (selectedImage) {
    const img = new Image();
    img.onload = function () {
      // Adjust image size based on the shape size
      const shape = shapes.find((s) => s.type === selectedImage);
      if (shape) {
        const imgSize = Math.min(shape.size, canvas.width, canvas.height);
        ctx.drawImage(img, shape.x - imgSize / 2, shape.y - imgSize / 2, imgSize, imgSize);
      }
    };
    // Set the image source based on the selected option
    img.src = `${selectedImage}.jpg`; // Replace with your image file extension
  }
}

// ... (Remaining code remains unchanged)


// Adjust this code according to your shape data and additional requirements.


