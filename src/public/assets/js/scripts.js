/*Config*/
let config = JSON.parse(localStorage.getItem("config")) || {
    darkMode: false,
    units: "celsius"
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

selectors[0].dataset.status = config.darkMode;

if (config.units === "celsius") {
    selectors[1].dataset.status = true;
} else if (config.units === "fahrenheit") {
    selectors[1].dataset.status = false;
}

selectors.forEach((elem) => {
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

darkModeButton.addEventListener("click", () => {
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

/*Units*/
let unitsButton = document.querySelector('.selector[data-action="units"]');

unitsButton.addEventListener("click", () => {

    if (unitsButton.dataset.units === "celsius") {
        unitsButton.dataset.units = "fahrenheit"
    } else if (unitsButton.dataset.units === "fahrenheit") {
        unitsButton.dataset.units = "celsius"
    }

    config.units = unitsButton.dataset.units;

    let tempElems = document.querySelectorAll(".temp");
    
    tempElems.forEach(elem => {
        let temp = parseInt(elem.innerText);
        let text;

        if (config.units === "celsius") {
            text = convertTemp("fahrenheit", config.units, temp);
        } else if(config.units === "fahrenheit"){
            text = convertTemp("celsius", config.units, temp);
        }

        elem.innerText = Math.round(text);
    });

    localStorage.setItem("config", JSON.stringify(config));
});

function convertTemp(from, to, temp) {

    if (from === "celsius") {
        if (to === "fahrenheit") {
            return (temp * 9 / 5) + 32;
        } else {
            return temp
        }
    } else {
        if (to === "celsius") {
            return (temp - 32) * 5 / 9;
        } else {
            return temp
        }
    }
}

window.addEventListener("load", () => {
    unitsButton.dataset.units = config.units;

    let tempElems = document.querySelectorAll(".temp");

    tempElems.forEach(elem => {
        let temp = parseInt(elem.innerText);
        elem.innerText = Math.round(convertTemp("celsius", config.units, temp));
    });

    console.log(config)
});