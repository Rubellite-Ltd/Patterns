const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth - 20,
    height: window.innerHeight - 200,
});

const layer = new Konva.Layer();
stage.add(layer);

let selectedImage = 'image1';

function selectImage() {
    selectedImage = document.getElementById('imageSelect').value;
}

function changeSize() {
    const newSize = document.getElementById('sizeSlider').value;
    const selectedShape = layer.find(`#${selectedImage}`)[0];

    if (selectedShape) {
        selectedShape.width(newSize);
        selectedShape.height(newSize);
        layer.batchDraw();
    }
}

function loadCustomShape() {
    const fileInput = document.getElementById('customShapeInput');
    const file = fileInput.files[0];

    if (file && file.type === 'image/svg+xml') {
        const reader = new FileReader();

        reader.onload = (event) => {
            const svgContent = event.target.result;
            addCustomShape(svgContent);
        };

        reader.readAsText(file);
    } else {
        alert('Please choose a valid SVG file.');
    }
}

function addCustomShape(svgContent) {
    const customShape = new Konva.Path({
        x: 50,
        y: 50,
        data: svgContent,
        id: 'customShape',
        draggable: true,
    });

    layer.add(customShape);
    layer.batchDraw();
}

function exportCanvas(format) {
    const dataURL = stage.toDataURL({
        mimeType: `image/${format}`,
    });

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `canvas.${format}`;
    link.click();
}

let draggedElement = null;

function drag(event) {
    draggedElement = event.target;
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    if (draggedElement) {
        const canvasContainer = document.getElementById('canvas-container');
        const offsetX = event.clientX - canvasContainer.getBoundingClientRect().left;
        const offsetY = event.clientY - canvasContainer.getBoundingClientRect().top;

        const newElement = draggedElement.cloneNode(true);
        newElement.style.left = offsetX - draggedElement.width / 2 + 'px';
        newElement.style.top = offsetY - draggedElement.height / 2 + 'px';
        newElement.removeAttribute('draggable');
        newElement.addEventListener('mousedown', handleElementMouseDown);

        canvasContainer.appendChild(newElement);
    }
}

function handleElementMouseDown(event) {
    const offsetX = event.clientX - parseFloat(event.target.style.left);
    const offsetY = event.clientY - parseFloat(event.target.style.top);

    function handleMouseMove(moveEvent) {
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;

        event.target.style.left = newX + 'px';
        event.target.style.top = newY + 'px';
    }

    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

let draggedElement = null;

function drag(event) {
    draggedElement = event.target;
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    if (draggedElement) {
        const canvasContainer = document.getElementById('canvas-container');
        const offsetX = event.clientX - canvasContainer.getBoundingClientRect().left;
        const offsetY = event.clientY - canvasContainer.getBoundingClientRect().top;

        const newElement = draggedElement.cloneNode(true);
        newElement.style.left = offsetX - draggedElement.width / 2 + 'px';
        newElement.style.top = offsetY - draggedElement.height / 2 + 'px';
        newElement.removeAttribute('draggable');
        newElement.addEventListener('mousedown', handleElementMouseDown);
        newElement.addEventListener('touchstart', handleElementTouchStart);

        canvasContainer.appendChild(newElement);
    }
}

function handleElementMouseDown(event) {
    const offsetX = event.clientX - parseFloat(event.target.style.left);
    const offsetY = event.clientY - parseFloat(event.target.style.top);

    function handleMouseMove(moveEvent) {
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;

        event.target.style.left = newX + 'px';
        event.target.style.top = newY + 'px';
    }

    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function handleElementTouchStart(event) {
    const touch = event.touches[0];
    const offsetX = touch.clientX - parseFloat(event.target.style.left);
    const offsetY = touch.clientY - parseFloat(event.target.style.top);

    function handleTouchMove(moveEvent) {
        const touch = moveEvent.touches[0];
        const newX = touch.clientX - offsetX;
        const newY = touch.clientY - offsetY;

        event.target.style.left = newX + 'px';
        event.target.style.top = newY + 'px';
    }

    function handleTouchEnd() {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    }

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
}

function handleShapeMouseDown(event) {
    draggedElement = event.target;
    const offsetX = event.clientX - parseFloat(draggedElement.style.left);
    const offsetY = event.clientY - parseFloat(draggedElement.style.top);

    function handleMouseMove(moveEvent) {
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;

        draggedElement.style.left = newX + 'px';
        draggedElement.style.top = newY + 'px';
    }

    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Touch events
    draggedElement.addEventListener('touchstart', handleElementTouchStart);
}

function handleShapeTouchStart(event) {
    draggedElement = event.target;
    const touch = event.touches[0];
    const offsetX = touch.clientX - parseFloat(draggedElement.style.left);
    const offsetY = touch.clientY - parseFloat(draggedElement.style.top);

    function handleTouchMove(moveEvent) {
        const touch = moveEvent.touches[0];
        const newX = touch.clientX - offsetX;
        const newY = touch.clientY - offsetY;

        draggedElement.style.left = newX + 'px';
        draggedElement.style.top = newY + 'px';
    }

    function handleTouchEnd() {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    }

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
}

// Add event listeners for touch events on shape elements
const shapeElements = document.getElementsByClassName('shape');
for (let i = 0; i < shapeElements.length; i++) {
    shapeElements[i].addEventListener('mousedown', handleShapeMouseDown);
    shapeElements[i].addEventListener('touchstart', handleShapeTouchStart);
}
let draggedElement = null;

function drag(event) {
    draggedElement = event.target;
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    if (draggedElement) {
        const canvasContainer = document.getElementById('canvas-container');
        const offsetX = event.clientX - canvasContainer.getBoundingClientRect().left;
        const offsetY = event.clientY - canvasContainer.getBoundingClientRect().top;

        const newElement = draggedElement.cloneNode(true);
        newElement.style.left = offsetX - draggedElement.clientWidth / 2 + 'px';
        newElement.style.top = offsetY - draggedElement.clientHeight / 2 + 'px';
        newElement.removeAttribute('draggable');
        newElement.addEventListener('mousedown', handleElementMouseDown);
        newElement.addEventListener('touchstart', handleElementTouchStart);

        canvasContainer.appendChild(newElement);
    }
}

function handleElementMouseDown(event) {
    const offsetX = event.clientX - parseFloat(event.target.style.left);
    const offsetY = event.clientY - parseFloat(event.target.style.top);

    function handleMouseMove(moveEvent) {
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;

        event.target.style.left = newX + 'px';
        event.target.style.top = newY + 'px';
    }

    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function handleElementTouchStart(event) {
    const touch = event.touches[0];
    const offsetX = touch.clientX - parseFloat(event.target.style.left);
    const offsetY = touch.clientY - parseFloat(event.target.style.top);

    function handleTouchMove(moveEvent) {
        const touch = moveEvent.touches[0];
        const newX = touch.clientX - offsetX;
        const newY = touch.clientY - offsetY;

        event.target.style.left = newX + 'px';
        event.target.style.top = newY + 'px';
    }

    function handleTouchEnd() {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    }

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
}

function handleShapeMouseDown(event) {
    draggedElement = event.target;
    const offsetX = event.clientX - parseFloat(draggedElement.style.left);
    const offsetY = event.clientY - parseFloat(draggedElement.style.top);

    function handleMouseMove(moveEvent) {
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;

        draggedElement.style.left = newX + 'px';
        draggedElement.style.top = newY + 'px';
    }

    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Touch events
    draggedElement.addEventListener('touchstart', handleElementTouchStart);
}

// Add event listeners for touch events on shape elements
const shapeElements = document.getElementsByClassName('draggable');
for (let i = 0; i < shapeElements.length; i++) {
    shapeElements[i].addEventListener('mousedown', handleShapeMouseDown);
    shapeElements[i].addEventListener('touchstart', handleShapeMouseDown);
}
let draggedElement = null;

function drag(event) {
    draggedElement = event.target;
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    if (draggedElement) {
        const canvasContainer = document.getElementById('canvas-container');
        const offsetX = event.clientX - canvasContainer.getBoundingClientRect().left;
        const offsetY = event.clientY - canvasContainer.getBoundingClientRect().top;

        const newElement = draggedElement.cloneNode(true);
        newElement.style.left = offsetX - draggedElement.clientWidth / 2 + 'px';
        newElement.style.top = offsetY - draggedElement.clientHeight / 2 + 'px';
        newElement.removeAttribute('draggable');
        newElement.addEventListener('mousedown', handleElementMouseDown);
        newElement.addEventListener('touchstart', handleElementTouchStart);

        canvasContainer.appendChild(newElement);
    }
}

function handleElementMouseDown(event) {
    const offsetX = event.clientX - parseFloat(event.target.style.left);
    const offsetY = event.clientY - parseFloat(event.target.style.top);

    function handleMouseMove(moveEvent) {
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;

        event.target.style.left = newX + 'px';
        event.target.style.top = newY + 'px';
    }

    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function handleElementTouchStart(event) {
    const touch = event.touches[0];
    const offsetX = touch.clientX - parseFloat(event.target.style.left);
    const offsetY = touch.clientY - parseFloat(event.target.style.top);

    function handleTouchMove(moveEvent) {
        const touch = moveEvent.touches[0];
        const newX = touch.clientX - offsetX;
        const newY = touch.clientY - offsetY;

        event.target.style.left = newX + 'px';
        event.target.style.top = newY + 'px';
    }

    function handleTouchEnd() {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
}

function handleShapeMouseDown(event) {
    draggedElement = event.target;
    const offsetX = event.clientX - parseFloat(draggedElement.style.left);
    const offsetY = event.clientY - parseFloat(draggedElement.style.top);

    function handleMouseMove(moveEvent) {
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;

        draggedElement.style.left = newX + 'px';
        draggedElement.style.top = newY + 'px';
    }

    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Touch events
    draggedElement.addEventListener('touchstart', handleElementTouchStart, { passive: false });
}

// Add event listeners for touch events on shape elements
const shapeElements = document.getElementsByClassName('draggable');
for (let i = 0; i < shapeElements.length; i++) {
    shapeElements[i].addEventListener('mousedown', handleShapeMouseDown);
    shapeElements[i].addEventListener('touchstart', handleShapeMouseDown, { passive: false });
}

let draggedElement = null;
let offsetX, offsetY;

function drag(event) {
    draggedElement = event.target;
    if (event.type.startsWith('touch')) {
        const touch = event.touches[0];
        offsetX = touch.clientX - parseFloat(draggedElement.style.left);
        offsetY = touch.clientY - parseFloat(draggedElement.style.top);
    } else {
        offsetX = event.clientX - parseFloat(draggedElement.style.left);
        offsetY = event.clientY - parseFloat(draggedElement.style.top);
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    if (draggedElement) {
        const canvasContainer = document.getElementById('canvas-container');
        let clientX, clientY;

        if (event.type.startsWith('touch')) {
            const touch = event.changedTouches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }

        const newElement = draggedElement.cloneNode(true);
        newElement.style.left = clientX - offsetX + 'px';
        newElement.style.top = clientY - offsetY + 'px';
        newElement.removeAttribute('draggable');
        newElement.addEventListener('mousedown', handleElementMouseDown);
        newElement.addEventListener('touchstart', handleElementTouchStart);

        canvasContainer.appendChild(newElement);
    }
}

function handleElementMouseDown(event) {
    offsetX = event.clientX - parseFloat(event.target.style.left);
    offsetY = event.clientY - parseFloat(event.target.style.top);

    function handleMouseMove(moveEvent) {
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;

        event.target.style.left = newX + 'px';
        event.target.style.top = newY + 'px';
    }

    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function handleElementTouchStart(event) {
    const touch = event.touches[0];
    offsetX = touch.clientX - parseFloat(event.target.style.left);
    offsetY = touch.clientY - parseFloat(event.target.style.top);

    function handleTouchMove(moveEvent) {
        const touch = moveEvent.touches[0];
        const newX = touch.clientX - offsetX;
        const newY = touch.clientY - offsetY;

        event.target.style.left = newX + 'px';
        event.target.style.top = newY + 'px';
    }

    function handleTouchEnd() {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
}

function handleShapeMouseDown(event) {
    draggedElement = event.target;

    if (event.type.startsWith('touch')) {
        const touch = event.touches[0];
        offsetX = touch.clientX - parseFloat(draggedElement.style.left);
        offsetY = touch.clientY - parseFloat(draggedElement.style.top);
    } else {
        offsetX = event.clientX - parseFloat(draggedElement.style.left);
        offsetY = event.clientY - parseFloat(draggedElement.style.top);
    }

    function handleMouseMove(moveEvent) {
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;

        draggedElement.style.left = newX + 'px';
        draggedElement.style.top = newY + 'px';
    }

    function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Touch events
    draggedElement.addEventListener('touchstart', handleElementTouchStart, { passive: false });
}

// Add event listeners for touch events on shape elements
const shapeElements = document.getElementsByClassName('draggable');
for (let i = 0; i < shapeElements.length; i++) {
    shapeElements[i].addEventListener('mousedown', handleShapeMouseDown);
    shapeElements[i].addEventListener('touchstart', handleShapeMouseDown, { passive: false });
}

