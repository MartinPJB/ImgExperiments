import allFunctions from "./functions.js";
import { getImageAsync, fileReaderAsync } from "./async.js";

/* DOM */
const allTestButtons = document.querySelectorAll("button");

for (const button of allTestButtons) { // Did this so I don't have to code every time I add some random functions
    // Handles test button clicks
    button.addEventListener("click", async () => {
        const images = []; // Images we will put in arguments

        // Get all images from files input
        const fileInputs = document.getElementsByClassName(button.dataset.use);
        for (const fileInput of fileInputs) {
            const fr = await fileReaderAsync(fileInput);
            const _img = await getImageAsync(fr);
            images.push(_img);
        }

        allFunctions[button.dataset.use](images); // Calls the function
    });
}