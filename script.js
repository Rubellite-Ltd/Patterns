const stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth - 20,
    height: window.innerHeight - 200,
});

const layer = new Konva.Layer();
stage.add(layer);

let currentImage;

function selectImage() {
    const selectedImageURL = document.getElementById('imageSelect').value;

    // Remove the current image if it exists
    if (currentImage) {
        currentImage.destroy();
    }

    // Create a new Konva.Image for the selected image
    const img = new Image();
    img.src = selectedImageURL;
    img.onload = function () {
        currentImage = new Konva.Image({
            x: 50,
            y: 50,
            image: img,
            width: 100, // Initial width
            height: 100, // Initial height
            id: 'selectedImage',
            draggable: true,
        });

        layer.add(currentImage);
        layer.batchDraw();
    };
}

function changeSize() {
    const newSize = document.getElementById('sizeSlider').value;

    if (currentImage) {
        currentImage.width(newSize);
        currentImage.height(newSize);
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
