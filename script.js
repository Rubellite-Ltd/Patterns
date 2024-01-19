const canvas = document.getElementById('shapeCanvas');
const ctx = canvas.getContext('2d');

let selectedShape = 'rectangle';
let selectedColor = '#ff0000';

function drawShape(x, y) {
    ctx.fillStyle = selectedColor;

    if (selectedShape === 'rectangle') {
        ctx.fillRect(x, y, 50, 50);
    } else if (selectedShape === 'circle') {
        ctx.beginPath();
        ctx.arc(x + 25, y + 25, 25, 0, 2 * Math.PI);
        ctx.fill();
    }
    // Add more shapes as needed
}

canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;
    drawShape(mouseX, mouseY);
});

// Add more event listeners for color change, shape selection, etc.