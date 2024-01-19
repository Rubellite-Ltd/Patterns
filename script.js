// Function to handle PNG to SVG conversion
async function convertPNGtoSVG() {
    const pngFileInput = document.getElementById('pngFileInput');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const file = pngFileInput.files[0];

    if (file && file.type === 'image/png') {
        const svgContent = await convertPNGtoSVGContent(file);
        renderSVGOnCanvas(svgContent, canvas, ctx);
    } else {
        alert('Please choose a valid PNG file.');
    }
}

// Function to convert PNG to SVG content using potrace
function convertPNGtoSVGContent(pngFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const bitmap = new potrace.Bitmap(canvas);
                const path = bitmap.trace();

                // Convert the path to SVG
                const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}">${path.toSvg()}</svg>`;
                resolve(svgContent);
            };
        };

        reader.readAsDataURL(pngFile);
    });
}

// Function to render SVG content on a canvas
function renderSVGOnCanvas(svgContent, canvas, ctx) {
    const DOMURL = window.URL || window.webkitURL || window;
    const img = new Image();
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    const svgUrl = DOMURL.createObjectURL(svgBlob);

    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(svgUrl);
    };

    img.src = svgUrl;
}

// Function to download the current canvas content as an SVG file
function downloadSVG() {
    const canvas = document.getElementById('canvas');
    const svgData = canvas.toDataURL('image/svg+xml');
    const link = document.createElement('a');
    link.href = svgData;
    link.download = 'converted.svg';
    link.click();
}