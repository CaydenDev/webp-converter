// renderer.js
const { ipcRenderer } = require('electron');

// Function to simulate getting an image buffer
function getImageBuffer() {
    // Here you would typically get the actual image buffer from a source.
    // For demonstration purposes, we create a simple image buffer (e.g., a 1x1 pixel PNG).
    const pngData = new Uint8Array([
        137, 80, 78, 71, 13, 10, 26, 10,  // PNG signature
        0, 0, 0, 13, // IHDR chunk length
        73, 72, 68, 82, // IHDR
        0, 1, 0, 1, 8, 6, 0, 0, 0, 96, 84, 76, // Width=1, Height=1, Bit depth=8, Color type=6
        0, 0, 0, 1, // IDAT chunk length
        73, 68, 65, 84, // IDAT
        8, 1, 0, 0, 0, 6, 0, 0, 0, 0, // Image data
        2, 253, 173, 154, // Data (1 pixel, RGBA)
        0, 0, 0, 0, // IEND chunk
        73, 69, 78, 68, 174, 66, 96, 130 // End (IEND)
    ]);
    return pngData;
}

document.getElementById('download-button').addEventListener('click', async () => {
    // You can replace this with an actual image buffer
    const imageBuffer = new Uint8Array([/* Your actual image binary data */]);

    try {
        const savedPath = await window.electron.ipcRenderer.invoke('dialog:saveImage', imageBuffer);
        if (savedPath) {
            console.log(`Image saved at: ${savedPath}`);
        } else {
            console.log('Image saving was canceled.');
        }
    } catch (error) {
        console.error("Error saving the image:", error);
    }
});