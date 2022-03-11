import allFunctions from "./functions.js";
import { getImageAsync, fileReaderAsync } from "./async.js";

/* DOM */
const allTestButtons = document.querySelectorAll("button");

for (const button of allTestButtons) { // Did this so I don't have to code every time I add some random functions
    // Handles test button clicks
    button.addEventListener("click", async () => {
        const inputsValue = []; // All the input values we will put in arguments

        // Get all values from inputs
        const inputs = document.getElementsByClassName(button.dataset.use);
        for (const input of inputs) {
            if (input.type != "file"){
                inputsValue.push(input.value);
            }else{
                const fr = await fileReaderAsync(input);
                const _img = await getImageAsync(fr);
                inputsValue.unshift(_img);
            }
        }

        allFunctions[button.dataset.use](inputsValue); // Calls the function
    });
}