

let test = document.querySelector(".js-button");
console.log(test.classList.contains("js-button"));
console.log(test.classList.contains("js-button2"));


function clickButton(buttonName) {
    const game_button = document.querySelector(buttonName);
    if (game_button.classList.contains("is_toggled")) {
        game_button.classList.remove("is_toggled");
    } else {
        // turn the last clicked button off.
        const previousOnButton = document.querySelector('.is_toggled');
        // if there is previous button turned on.
        if (previousOnButton) {
            previousOnButton.classList.remove('is_toggled');
        }

        // turn the current button on.
        game_button.classList.add("is_toggled");
    }
}
