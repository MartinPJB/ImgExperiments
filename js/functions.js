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
 * @param {Image} img Image we wanna t ri p
 */
function imageTripper([img]) {
    if (!img) return console.warn("[function imageTripper] Please define an image.");

    const canvas = document.getElementById("imageTripper");
    const ctx = canvas.getContext("2d");

    canvas.width = 255;
    canvas.height = 255;

    // Cleans the old result
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gets the image data
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data1 = imgData.data;

    // Creates a new buffer containing the new RGB components we will make
    const newRGBCompo = new Uint8ClampedArray(canvas.width * canvas.height * 4)

    // Gets the RGB of each images
    const imgRGB = getRGB(data1);

    for (let i = 0; i < imgRGB.length; i++){
        let [r, g, b] = Object.values(imgRGB[i]);

        //  Takes the first 4 bits of the RGB component in the first image, takes the last 4 bits of the RGB component in the second image
        const c = i * 4;
        newRGBCompo[c] = bin2decimal(decimal2bin(r).substring(4) + decimal2bin(Math.floor(Math.random() * 256)).substring(0, 4));
        newRGBCompo[c + 1] = bin2decimal(decimal2bin(g).substring(4) + decimal2bin(Math.floor(Math.random() * 256)).substring(0, 4));
        newRGBCompo[c + 2] = bin2decimal(decimal2bin(b).substring(4) + decimal2bin(Math.floor(Math.random() * 256)).substring(0, 4));
        newRGBCompo[c + 3] = 255;
    }

    // Shows the new image from the buffer's values
    const newImageData = ctx.createImageData(canvas.width, canvas.height);
    newImageData.data.set(newRGBCompo);
    ctx.putImageData(newImageData, 0, 0);
}

/**
 * Takes all the pixels from an image and sorts them out. As simple as that.
 * @param {Image} img Image we wanna sort
 */
function pixelSort([img, limit]){
    if (!img) return console.warn("[function pixelSort] Please define 1 image.");

    const canvas = document.getElementById("pixelSort");
    const ctx = canvas.getContext("2d");

    canvas.width = 255;
    canvas.height = 255;

    // Creates a new buffer containing the new RGB components we will make
    const newRGBCompo = new Uint8ClampedArray(canvas.width * canvas.height * 4)

    // Gets the first image data
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
    const newImageData = ctx.createImageData(canvas.width, canvas.height);
    newImageData.data.set(newRGBCompo);
    ctx.putImageData(newImageData, 0, 0);
}


/* EXPORT */
const allFunctions = {
    imageTripper,
    pixelSort
}
export default allFunctions;