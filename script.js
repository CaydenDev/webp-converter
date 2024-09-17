const dropArea = document.getElementById('drop-area');
const outputDiv = document.getElementById('output');


['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);    
    document.body.addEventListener(eventName, preventDefaults, false); 
});


['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});


dropArea.addEventListener('drop', handleDrop, false);


function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}


function highlight() {
    dropArea.classList.add('highlight');
}


function unhighlight() {
    dropArea.classList.remove('highlight');
}


function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
}


function handleFiles(files) {
    [...files].forEach(convertImage);
}

function convertImage(file) {
    if (file.type === 'image/webp') {
        const reader = new FileReader();
        reader.onload = () => {

            const img = document.createElement('img');
            img.src = reader.result;
            outputDiv.appendChild(img);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please drag and drop only WebP files.');
    }
}
