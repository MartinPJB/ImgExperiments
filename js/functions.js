/**
 * Will convert a decimal number to binary.
 * @param {Number} dec Some random number
 * @returns {String} The binary value of a decimal number
 */
 function decimal2bin(dec) {
    let binary = "";
    while (dec != 0) {
        binary = dec % 2 + binary;
        dec = Math.floor(dec / 2);
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



/* IMAGE FUNCTIONS */
/**
 * Takes the first 4 bits of the RGB components in the first image, takes the last 4 bits of the RGB components in the second image, mixes the both and returns a glitchy image.
 * @param {Image} img1 First image we wanna mix
 * @param {Image} img2 Second image we wanna mix
 */
function mixer([img1, img2]) {
    if (!img1 || !img2) return console.warn("[function mixer] Please define 2 images.");

    const canvas = document.getElementById("mixer");
    const ctx = canvas.getContext("2d");

    canvas.width = 255;
    canvas.height = 255;

    // Cleans the old result
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gets the first image data
    ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);
    const img1Data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data1 = img1Data.data;

    // Second image data
    ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);
    const img2Data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data2 = img2Data.data;

    // Creates a new buffer containing the new RGB components we will make
    const newRGBCompo = new Uint8ClampedArray(canvas.width * canvas.height * 4)

    for (let i = 0; i < data1.length; i += 4) {
        // Gets the RGB of each images
        const r = data1[i];
        const g = data1[i + 1];
        const b = data1[i + 2];

        const _r = data2[i];
        const _g = data2[i + 1];
        const _b = data2[i + 2];

        //  Takes the first 4 bits of the RGB component in the first image, takes the last 4 bits of the RGB component in the second image
        newRGBCompo[i] = bin2decimal(decimal2bin(r).substring(4) + decimal2bin(_r).substring(0, 4));
        newRGBCompo[i + 1] = bin2decimal(decimal2bin(g).substring(4) + decimal2bin(_g).substring(0, 4));
        newRGBCompo[i + 2] = bin2decimal(decimal2bin(b).substring(4) + decimal2bin(_b).substring(0, 4));
        newRGBCompo[i + 3] = 255;
    }

    // Makes the new image with the new image data we just made
    const newImageData = ctx.createImageData(canvas.width, canvas.height);
    newImageData.data.set(newRGBCompo);
    ctx.putImageData(newImageData, 0, 0);
}

/* EXPORT */
const allFunctions = {
    mixer
}
export default allFunctions;