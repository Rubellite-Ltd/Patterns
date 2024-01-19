const canvas = document.getElementById('shapeCanvas');
const ctx = canvas.getContext('2d');
let shapes = []; // Array to store information about shapes

let selectedShape = 'rectangle';
let selectedColor = '#ff0000';
let isDragging = false;
let selectedShapeIndex = -1;

function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(shape => {
        ctx.fillStyle = shape.color;
        if (shape.type === 'rectangle') {
            ctx.fillRect(shape.x, shape.y, 50, 50);
        } else if (shape.type === 'circle') {
            ctx.beginPath();
            ctx.arc(shape.x + 25, shape.y + 25, 25, 0, 2 * Math.PI);
            ctx.fill();
        }
        // Add more shapes as needed
    });
}

function addShape(x, y) {
    shapes.push({
        type: selectedShape,
        color: selectedColor,
        x: x,
        y: y
    });
}

function findShape(x, y) {
    for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        if (
            x >= shape.x &&
            x <= shape.x + 50 &&
            y >= shape.y &&
            y <= shape.y + 50
        ) {
            return i;
        }
    }
    return -1;
}

canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;
    
    selectedShapeIndex = findShape(mouseX, mouseY);

    if (selectedShapeIndex === -1) {
        // If no shape is clicked, add a new shape
        addShape(mouseX, mouseY);
    } else {
        // If a shape is clicked, initiate dragging
        isDragging = true;
    }

    drawShapes();
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;

        if (selectedShapeIndex !== -1) {
            // Update the position of the dragged shape
            shapes[selectedShapeIndex].x = mouseX - 25;
            shapes[selectedShapeIndex].y = mouseY - 25;
            drawShapes();
        }
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

// Other functions remain unchanged...