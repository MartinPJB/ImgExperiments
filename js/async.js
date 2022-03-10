/**
 * Allows me to get an image in an asynchronous way.
 * @param {String} src Src of the image
 * @returns {Image}
 */
function getImageAsync(src){
    return new Promise(res => {
        const img = new Image();

        img.onload = () => {
            return res(img);
        }

        img.src = src
    });
}


/**
 * Allows me to get the dataURL from a file input in an asynchronous way.
 * @param {HTMLElement} fileInput 
 * @returns {String}
 */
function fileReaderAsync(fileInput){
    return new Promise(res => {
        if (FileReader && fileInput.files && fileInput.files.length) {
            const fr = new FileReader();

            fr.onload = () => {
                return res(fr.result);
            }

            fr.readAsDataURL(fileInput.files[0]);
        }
    });
}

export {
    getImageAsync,
    fileReaderAsync
}