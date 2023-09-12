/* Variables */
const imageTripperCanvas = document.getElementById("imageTripper");
const imageTripperCtx = imageTripperCanvas.getContext("2d");
const pixelSortCanvas = document.getElementById("pixelSort");
const pixelSortCtx = pixelSortCanvas.getContext("2d");
const imageInverterCanvas = document.getElementById("imageInverter");
const imageInverterCtx = imageInverterCanvas.getContext("2d");

imageInverterCanvas.width = 255;
imageInverterCanvas.height = 255;
pixelSortCanvas.width = 255;
pixelSortCanvas.height = 255;
imageTripperCanvas.width = 255;
imageTripperCanvas.height = 255;


/**
 * Will convert a decimal number to binary.
 * @param {Number} dec Some random number
 * @returns {String} The binary value of a decimal number
 */
function decimal2bin(dec) {
    let binary = "";
    while (dec) {
        binary = (dec & 1) + binary;
        dec = dec >> 1;
    }
    return binary;
}

/**
 * Will comvert binary to a decimal number.
 * @param {String} bin Some random binary string
 * @returns {Number} The decimal value of a binary string
 */
function bin2decimal(bin) {
    let decimal = 0;
    for (let i = 0; i < bin.length; i++) {
        if (bin[i] == "1") {
            decimal += 2 ** (bin.length - 1 - i);
        }
    }
    return decimal;
}

/**
 * Returns an array containing each RGB components of an image data.
 * @param {ImageData} data Data of the image
 * @returns An array
 */
function getRGB(data){
    const result = [];
    for (let i = 0; i < data.length; i += 4) {
        // Gets the RGB
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Push
        result.push({
            r: r,
            g: g,
            b: b
        });
    }
    return result;
}



/* IMAGE FUNCTIONS */
/**
 * Takes the first 4 bits of the rgb component in the image, generates randomly another rgb component and takes its last 4 bits. Generates a trippy image.
 * Complexity: O(N*log(N))
 * @param {Image} img Image we wanna t ri p
 */
function imageTripper([img]) {
    if (!img) return console.warn("[function imageTripper] Please define an image.");

    // Cleans the old result
    imageTripperCtx.clearRect(0, 0, imageTripperCanvas.width, imageTripperCanvas.height);

    // Draws the image
    imageTripperCtx.drawImage(img, 0, 0, imageTripperCanvas.width, imageTripperCanvas.height);
    const imgData = imageTripperCtx.getImageData(0, 0, imageTripperCanvas.width, imageTripperCanvas.height);
    const data = imgData.data;

    // Loop through each pixel
    for (let i = 0; i < data.length; i += 4) {
        // Takes the first 4 bits of the RGB component in the first image, takes the last 4 bits of the RGB component in the second image
        const r = bin2decimal(decimal2bin(data[i]).substring(4) + decimal2bin(Math.floor(Math.random() * 256)).substring(0, 4));
        const g = bin2decimal(decimal2bin(data[i+1]).substring(4) + decimal2bin(Math.floor(Math.random() * 256)).substring(0, 4));
        const b = bin2decimal(decimal2bin(data[i+2]).substring(4) + decimal2bin(Math.floor(Math.random() * 256)).substring(0, 4));
        data[i] = r;
        data[i+1] = g;
        data[i+2] = b;
    }

    // Put the image data back on the canvas
    imageTripperCtx.putImageData(imgData, 0, 0);
}

/**
 * Takes all the pixels from an image and sorts them out. As simple as that.
 * Complexity: O(NlogN+N)
 * @param {Image} img Image we wanna sort
 */
function pixelSort([img, limit]){
    if (!img) return console.warn("[function pixelSort] Please define an image.");

    // Creates a new buffer containing the new RGB components we will make
    const newRGBCompo = new Uint8ClampedArray(pixelSortCanvas.width * pixelSortCanvas.height * 4)

    // Gets the first image data
    pixelSortCtx.drawImage(img, 0, 0, pixelSortCanvas.width, pixelSortCanvas.height);
    const imgData = pixelSortCtx.getImageData(0, 0, pixelSortCanvas.width, pixelSortCanvas.height);
    const data = getRGB(imgData.data);
    
    // Simple sort
    const sorted = data.sort((a, b) => {
        const aRGB = (a.r + a.g + a.b);
        const bRGB = (b.r + b.g + b.b);

        if (aRGB < bRGB && (aRGB < limit || bRGB > limit)) return 1;
        if (aRGB > bRGB && (aRGB < limit || bRGB > limit)) return -1;
        return 0;
    });

    // Adds them into the buffer
    for (let i = 0; i < sorted.length; i++){
        const c = i * 4;
        newRGBCompo[c] = sorted[i].r;
        newRGBCompo[c + 1] = sorted[i].g;
        newRGBCompo[c + 2] = sorted[i].b;
        newRGBCompo[c + 3] = 255;
    }

    // Shows the new image from the buffer's values
    const newImageData = pixelSortCtx.createImageData(pixelSortCanvas.width, pixelSortCanvas.height);
    newImageData.data.set(newRGBCompo);
    pixelSortCtx.putImageData(newImageData, 0, 0);
}

/**
 * Substracts the rgb values of each pixel by 255 to invert the image.
 * Complexity: O(N)
 * @param {Image} img Image we wanna invert
 */
function imageInverter([img]) {
    if (!img) return console.warn("[function imageInverter] Please define an image.");

    // Cleans the old result
    imageInverterCtx.clearRect(0, 0, imageInverterCanvas.width, imageInverterCanvas.height);

    // Gets the image data
    imageInverterCtx.drawImage(img, 0, 0, imageInverterCanvas.width, imageInverterCanvas.height);
    const imgData = imageInverterCtx.getImageData(0, 0, imageInverterCanvas.width, imageInverterCanvas.height);
    const data = imgData.data;

    // Loop through each pixel
    for (let i = 0; i < data.length; i += 4) {
        // Subtract r, g, b value by 255
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
    // Put the inverted image data back on the canvas
    imageInverterCtx.putImageData(imgData, 0, 0);
}


/* EXPORT */
const allFunctions = {
    imageTripper,
    pixelSort,
    imageInverter
}
export default allFunctions;