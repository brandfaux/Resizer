document.addEventListener('DOMContentLoaded', function () {
    var imageDropzone = document.getElementById('image-dropzone');
    var imageFileInput = document.getElementById('image-file');
    var imageUploadForm = document.getElementById('image-upload-form');

    var signatureDropzone = document.getElementById('signature-dropzone');
    var signatureFileInput = document.getElementById('signature-file');
    var signatureUploadForm = document.getElementById('signature-upload-form');

    function handleDropzoneClick(dropzone, fileInput) {
        dropzone.addEventListener('click', function() {
            fileInput.click();
        });
    }

    function handleDropzoneDragOver(dropzone) {
        dropzone.addEventListener('dragover', function(e) {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });
    }

    function handleDropzoneDragLeave(dropzone) {
        dropzone.addEventListener('dragleave', function() {
            dropzone.classList.remove('dragover');
        });
    }

    function handleDropzoneDrop(dropzone, fileInput, form) {
        dropzone.addEventListener('drop', function(e) {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            var files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                form.submit();
            }
        });
    }

    function handleFileInputChange(fileInput, form) {
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                form.submit();
            }
        });
    }

    handleDropzoneClick(imageDropzone, imageFileInput);
    handleDropzoneDragOver(imageDropzone);
    handleDropzoneDragLeave(imageDropzone);
    handleDropzoneDrop(imageDropzone, imageFileInput, imageUploadForm);
    handleFileInputChange(imageFileInput, imageUploadForm);

    handleDropzoneClick(signatureDropzone, signatureFileInput);
    handleDropzoneDragOver(signatureDropzone);
    handleDropzoneDragLeave(signatureDropzone);
    handleDropzoneDrop(signatureDropzone, signatureFileInput, signatureUploadForm);
    handleFileInputChange(signatureFileInput, signatureUploadForm);
});