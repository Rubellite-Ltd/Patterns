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