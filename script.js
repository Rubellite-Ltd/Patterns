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

// Function to handle shape selection
function selectShape(shape) {
    selectedShape = shape;
}

// Event listener for color picker
document.getElementById('colorPicker').addEventListener('input', (e) => {
    selectedColor = e.target.value;
});

// Event listener for image uploader
document.getElementById('imageUploader').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
        // Handle image upload logic (you may want to draw the image on the canvas)
        // For simplicity, you can add a function to handle this.
    } else {
        alert('Please choose a valid PNG image.');
    }
});