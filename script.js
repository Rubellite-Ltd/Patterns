const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let selectedImage = 'image1';
let isDragging = false;
let offsetX, offsetY;

function selectImage() {
    selectedImage = document.getElementById('imageSelect').value;
    drawSelectedImage();
}

function drawSelectedImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.onload = function () {
        // Resize the canvas to fit the image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);
    };

    // Set the source of the image based on the selected option
    img.src = `path/to/${selectedImage}.jpg`; // Replace with the correct path to your images
}

function handleMouseDown(e) {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    if (mouseX >= 0 && mouseX <= canvas.width && mouseY >= 0 && mouseY <= canvas.height) {
        isDragging = true;
        offsetX = mouseX;
        offsetY = mouseY;
    }
}

function handleMouseUp() {
    isDragging = false;
}

function handleMouseMove(e) {
    if (isDragging) {
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;

        const dx = mouseX - offsetX;
        const dy = mouseY - offsetY;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, dx, dy, img.width, img.height);
    }
}

// Attach event listeners
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mousemove', handleMouseMove);

// Initial draw
drawSelectedImage();
