const filename = document.getElementById('filename').value;
const isSignature = document.getElementById('isSignature').value === 'true';
const continueButton = document.getElementById('continueButton');
const resetButton = document.getElementById('resetButton');
const canvasContainer = document.getElementById('canvasContainer');

let startX, startY, dragging = false;
let image = new Image();
let canvas, ctx;
let croppingDone = false; // Flag to track if cropping is done

window.onload = function() {
    fetch(`/uploads/${filename}`)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            image.src = url;
            image.onload = () => {
                const containerWidth = canvasContainer.clientWidth;
                const containerHeight = canvasContainer.clientHeight;
                let imageWidth = image.width;
                let imageHeight = image.height;

                if (imageWidth > containerWidth || imageHeight > containerHeight) {
                    const widthRatio = containerWidth / imageWidth;
                    const heightRatio = containerHeight / imageHeight;
                    const scale = Math.min(widthRatio, heightRatio);
                    imageWidth *= scale;
                    imageHeight *= scale;
                }

                canvas = document.createElement('canvas');
                ctx = canvas.getContext('2d');
                canvas.width = imageWidth;
                canvas.height = imageHeight;
                canvasContainer.innerHTML = ''; // Clear previous canvas if any
                canvasContainer.appendChild(canvas);
                ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
                canvas.addEventListener('mousedown', handleMouseDown);
                canvas.addEventListener('mousemove', handleMouseMove);
                canvas.addEventListener('mouseup', handleMouseUp);
            };
        });
};

function handleMouseDown(e) {
    if (croppingDone) {
        resetSelection();
    }
    const rect = canvas.getBoundingClientRect();
    startX = (e.clientX - rect.left) * (canvas.width / rect.width);
    startY = (e.clientY - rect.top) * (canvas.height / rect.height);
    dragging = true;
}

function handleMouseMove(e) {
    if (dragging) {
        const rect = canvas.getBoundingClientRect();
        const endX = (e.clientX - rect.left) * (canvas.width / rect.width);
        const endY = (e.clientY - rect.top) * (canvas.height / rect.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'darkblue';
        ctx.lineWidth = 2;
        ctx.strokeRect(startX, startY, endX - startX, endY - startY);
    }
}

function handleMouseUp(e) {
    dragging = false;
    const rect = canvas.getBoundingClientRect();
    const endX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const endY = (e.clientY - rect.top) * (canvas.height / rect.height);
    const width = endX - startX;
    const height = endY - startY;
    const croppedImageData = ctx.getImageData(startX, startY, width, height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = width;
    canvas.height = height;
    ctx.putImageData(croppedImageData, 0, 0);
    croppingDone = true; // Set flag to indicate cropping is done
}

function resetSelection() {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    croppingDone = false; // Reset the cropping flag
}

continueButton.addEventListener('click', function () {
    const dataUrl = canvas.toDataURL('image/jpeg');
    
    const targetSize = isSignature ? { width: 254, height: 64 } : { width: 160, height: 212 };
    const maxSize = isSignature ? 50000 : 20000;

    fetch('/resize_image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            image: dataUrl,
            filename: filename,
            target_size: [targetSize.width, targetSize.height],
            max_size: maxSize
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = `/uploads/${data.filename}`;
        } else {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});

resetButton.addEventListener('click', function () {
    resetSelection();
});