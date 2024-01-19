const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let selectedImage = 'image1';

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

// Initial draw
drawSelectedImage();
