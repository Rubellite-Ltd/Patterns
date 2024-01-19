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
