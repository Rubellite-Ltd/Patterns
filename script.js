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

    startDragging(mouseX, mouseY);
}

function handleTouchStart(e) {
    const touch = e.touches[0];
    const touchX = touch.clientX - canvas.getBoundingClientRect().left;
    const touchY = touch.clientY - canvas.getBoundingClientRect().top;

    startDragging(touchX, touchY);

    // Prevent default touch behavior to avoid scrolling
    e.preventDefault();
}

function startDragging(startX, startY) {
    if (startX >= 0 && startX <= canvas.width && startY >= 0 && startY <= canvas.height) {
        isDragging = true;
        offsetX = startX;
        offsetY = startY;
    }
}

function handleMouseUp() {
    endDragging();
}

function handleTouchEnd() {
    endDragging();
}

function endDragging() {
    isDragging = false;
}

function handleMouseMove(e) {
    if (isDragging) {
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;

        moveImage(mouseX, mouseY);
    }
}

function handleTouchMove(e) {
    if (isDragging) {
        const touch = e.touches[0];
        const touchX = touch.clientX - canvas.getBoundingClientRect().left;
        const touchY = touch.clientY - canvas.getBoundingClientRect().top;

        moveImage(touchX, touchY);

        // Prevent default touch behavior to avoid scrolling
        e.preventDefault();
    }
}

function moveImage(moveX, moveY) {
    const dx = moveX - offsetX;
    const dy = moveY - offsetY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, img.width, img.height);
}

// Attach event listeners for both mouse and touch events
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mousemove', handleMouseMove);

canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchend', handleTouchEnd);
canvas.addEventListener('touchmove', handleTouchMove);

// Initial draw
drawSelectedImage();
