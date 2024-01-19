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

