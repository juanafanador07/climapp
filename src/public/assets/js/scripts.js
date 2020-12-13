/*Config*/
let config = JSON.parse(localStorage.getItem("config")) || {
    darkMode: false
}

let configPanel = document.querySelector(".config");

/*Open Config Panel*/
let configButton = document.querySelector(".search__config");

configButton.addEventListener("click", () => {
    configPanel.classList.add("config--open");
    configPanel.classList.remove("config--close");
})

/*Close Config Panel*/
let configClose = document.querySelector(".config__close");

configClose.addEventListener("click", () => {
    configPanel.classList.remove("config--open");
    configPanel.classList.add("config--close");
    setTimeout(() => {
        configPanel.classList.remove("config--close");
    }, 450)
})


/*Options in config panel*/
let selectors = document.querySelectorAll('.selector');

selectors.forEach((elem) => {
    elem.dataset.status = config[elem.dataset.action];

    elem.addEventListener("click", () => {
        if (elem.dataset.status == "true") {
            elem.dataset.status = "false"
        } else {
            elem.dataset.status = "true"
        }
    })
})


/*Dark Mode*/

let darkModeButton = document.querySelector('.selector[data-action="darkMode"]');

darkModeButton.addEventListener("click", ()=>{
    config.darkMode = !config.darkMode;
    localStorage.setItem("config", JSON.stringify(config));
    toggleMode(config.darkMode);
})

function toggleMode(darkMode) {
    const rootStyles = document.documentElement.style;
    if (darkMode) {
        rootStyles.setProperty('--bg-transparent', 'rgba(0, 0, 0, .5)');
        rootStyles.setProperty('--text', '#fff');
        rootStyles.setProperty('--bg', '#424242');
    } else {
        rootStyles.setProperty('--bg-transparent', 'rgba(255, 255, 255, .5)');
        rootStyles.setProperty('--text', '#424242');
        rootStyles.setProperty('--bg', '#fff');
    }
}

window.addEventListener("load", toggleMode(config.darkMode));