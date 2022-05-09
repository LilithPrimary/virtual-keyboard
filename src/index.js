import example from './img/cat.jpg'
import './styles/main.scss'
import buttons from "./script/buttons.js"
import jokes from './script/jokes.js'

let lang = "en";
let registr = "low";
let multiPress = [];
let isCaps = false;
let isShift = false;
let textarea = document.querySelector("textarea");

class KeyboardButton {    
    button = document.createElement("button");
    buttonValue = document.createElement("span");
    value = "";

    constructor(name) {
        this.name = name;
    }

    createButton() {
        this.button.classList.add("key");
        this.buttonValue.classList.add("key__value");
        switch (this.name.en.low) {
            case "Control":
                this.button.classList.add("key__wide");
                break;
            case "backspace":
                this.button.classList.add("material-symbols-outlined");
                break;
            case "keyboard_tab":
                this.button.classList.add("key__wide", "material-symbols-outlined");
                break;
            case "capslock":
                this.button.classList.add("key__wide", "material-symbols-outlined", "key__capslock");
                break;
            case "keyboard_return": 
                this.button.classList.add("key__enter", "material-symbols-outlined");
                break;
            case "Shift":
                this.button.classList.add("key__shift");
                break;
            case "space_bar": 
                this.button.classList.add("key__space", "material-symbols-outlined");
        }
        this._setButtonSymbol();
        this.button.append(this.buttonValue);
        this._pressButton();
        this._synchronizeWithKeyboard();
        document.body.append(this.button);
    }

    _pressButton() {
        this.button.addEventListener("click", (e) => {
            switch (this.name.id) {
                case "CapsLock": this.value(); break;
                case "ShiftLeft":
                case "ShiftRight": this.shiftButton(); break;
                case "ControlRight":
                case "ControlLeft":
                    if (isShift) {
                        this.shiftButton();
                        this._changeLanguage();
                    }
                    break;
                default:
                    workWithTextarea (this);
                    if (isShift) {
                        this.shiftButton();
                    }
            }    
        })    
    }

    shiftButton () {
        if(isShift) {
            buttonsArray.forEach(el => {
                if (el.name.en.low === "Shift") {
                    el.button.classList.remove("active");
                    isShift = false;
                    if (!isCaps) {
                        registr = "low";
                        this._changeButtonsValue();
                    }
                }
            })
        } else {
            buttonsArray.forEach(el => {
                if (el.name.en.low === "Shift") {
                    el.button.classList.add("active");
                    registr = "high";
                    this._changeButtonsValue();
                    isShift = true;
                }
            })
        }
    }

    _setButtonSymbol() {
        this.buttonValue.textContent = this.name[lang][registr];
        switch (this.name.en.low) {
            case "Control":
                this.buttonValue.textContent = "Ctrl";
                break;
            case "backspace":
                this.value = this.value.substring(0, this.value.length - 1);
                break;
            case "keyboard_tab":
                this.value = "    ";
                break;
            case "capslock":
                this.value = this._capsLock;
                break;
            case "keyboard_return":
                this.value = `\n`
                break;
            case "shift":
                break;
            case "space_bar": 
                this.value = " ";
                break;
            case "alt":
                break;
            default:
                this.value = this.name[lang][registr];
        }
    }

    _capsLock () {
        if (isCaps) {
            this.button.classList.remove("on");
            registr = "low";
            isCaps = false;
            this._changeButtonsValue();
        } else {
            this.button.classList.add("on");
            registr = "high";
            isCaps = true;
            this._changeButtonsValue(); 
        }
    }

    _changeLanguage () {
        lang = lang === "en" ? "ru" : "en";
        this._changeButtonsValue();
    }

    _changeButtonsValue () {
        buttonsArray.forEach(el => el._setButtonSymbol());
    }

    _synchronizeWithKeyboard() {
        document.addEventListener("keydown", (e) => {
                if (e.code === this.name.id) {
                    e.preventDefault();
                    this.button.classList.add("active");
                }
                if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
                    e.target.classList.add("active");
                }
                switch(e.code) {
                    case "ArrowUp": btnUp.classList.add("active"); break;
                    case "ArrowDown": btnDown.classList.add("active"); break;
                    case "ArrowLeft": btnLeft.classList.add("active"); break;
                    case "ArrowRight": btnRight.classList.add("active");
                }
        })
        document.addEventListener("keyup", (e) => {
                if (e.code === this.name.id) {
                    this.button.classList.remove("active");
                }
                if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
                    e.target.classList.remove("active");
                }
                switch(e.code) {
                    case "ArrowUp": btnUp.classList.remove("active"); break;
                    case "ArrowDown": btnDown.classList.remove("active"); break;
                    case "ArrowLeft": btnLeft.classList.remove("active"); break;
                    case "ArrowRight": btnRight.classList.remove("active");
                }
        })
    }
}

function workWithTextarea (inst) {
    let buttonCode;
    let symbol;
    if (inst instanceof KeyboardButton) {
        buttonCode = inst.name.id;
        symbol = inst.buttonValue.textContent;
    } else {
        if (inst.key === "Control") return;
        buttonCode = inst.code;
        buttonsArray.forEach(el => {
            if (el.name.id === buttonCode) {
                symbol = el.buttonValue.textContent;
            }
        })
    }
    if (!buttonsArray.some(el => el.name.id === buttonCode)) return; 
    let keyCode = inst instanceof KeyboardButton ? inst.name.id : inst;
    let letter;
    switch (buttonCode) {
        case "Backspace":
            backspace();
            return;
        case "Delete":
            delSymbol();
            return;
        case "Enter":
            letter = "\n";
            break;
        case "Space":
            letter = " ";
            break;
        case "Tab":
            letter = "    ";
            break;
        case "MetaLeft":
        case "AltRight":
        case "AltLeft":
            letter = generateJokes();
            break;
        default:
            letter = symbol;
            
    }
    textarea.setRangeText(letter, textarea.selectionStart, textarea.selectionEnd, "end");
}



function backspace() {
    if (textarea.selectionStart === 0 && textarea.selectionEnd === 0) return;
    if (textarea.selectionStart === textarea.selectionEnd) {
        textarea.setRangeText("", textarea.selectionStart - 1, textarea.selectionStart, "end");
    } else
        textarea.setRangeText("", textarea.selectionStart, textarea.selectionEnd, "end");
}

function delSymbol() {
    if (textarea.selectionStart === textarea.selectionEnd) {
        textarea.setRangeText("",textarea.selectionStart, textarea.selectionStart +1 , "end");
    } else
        textarea.setRangeText("", textarea.selectionStart, textarea.selectionEnd, "end");
}


document.addEventListener("keydown", (e) => {
    document.body.style.pointerEvents = "none";
    if (["Shift", "Control"].includes(e.key)) {
        multiPress.push(e.code);
    }
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        if (e.repeat) return;
        buttonsArray[0].shiftButton();
        return;
    }
    if (e.code === "CapsLock") {
        buttonsArray[29]._capsLock();
        return;
    }
    workWithTextarea(e);
})
document.addEventListener("keyup", (e) => {
    document.body.style.pointerEvents = "inherit";
    if ([...new Set(multiPress)].length === 2 && ([...new Set(["ShiftLeft", "ControlLeft"].concat(multiPress))].length === 2 || [...new Set(["ShiftRight", "ControlRight"].concat(multiPress))].length === 2)) {
        buttonsArray[0]._changeLanguage();
    }
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        buttonsArray[0].shiftButton();
    }
    multiPress.length = 0;
})

const fragment = document.createDocumentFragment();
const buttonsArray = buttons.map(el => {
    const button = new KeyboardButton (el);
    button.createButton();
    fragment.append(button.button);
    return button;
})
const btnLeft = document.createElement("button");
btnLeft.classList.add("key", "key__slim");
const spanLeft = document.createElement("span");
spanLeft.classList.add("key__value", "material-symbols-outlined");
spanLeft.textContent = "keyboard_arrow_left";
btnLeft.append(spanLeft);

const btnUp = document.createElement("button");
btnUp.classList.add("key", "key__slim");
const spanUp = document.createElement("span");
spanUp.classList.add("key__value", "material-symbols-outlined");
spanUp.textContent = "keyboard_arrow_up";
btnUp.append(spanUp);

const btnDown = document.createElement("button");
btnDown.classList.add("key", "key__slim");
const spanDown = document.createElement("span");
spanDown.classList.add("key__value", "material-symbols-outlined");
spanDown.textContent = "keyboard_arrow_down";
btnDown.append(spanDown);

const btnRight = document.createElement("button");
btnRight.classList.add("key", "key__slim");
const spanRight = document.createElement("span");
spanRight.classList.add("key__value", "material-symbols-outlined");
spanRight.textContent = "keyboard_arrow_right";
btnRight.append(spanRight);

const centralBtnsWrapper = document.createElement("div");
centralBtnsWrapper.classList.add("central-btns-wrapper");
centralBtnsWrapper.append(btnUp, btnDown);

document.querySelector(".keyboard__wrapper").append(fragment, btnLeft, centralBtnsWrapper, btnRight);

btnLeft.addEventListener("click", () => {
    textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart - 1;
    console.log(textarea.value);
})

btnRight.addEventListener("click", () => {
    textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart + 1;
})

btnUp.addEventListener("click", () => {
    let c = 0;
    let symbNum = Math.round((textarea.clientWidth - 40)/8.783);
    let rows = textarea.value.slice(0, textarea.selectionStart).split("\n");
    rows = splitRows (rows, symbNum);
    console.log(rows[0].length, symbNum);
    if (rows.length === 1 && rows[0].length === symbNum){
        rows.push("");
        c = 1;
    }
    if (rows.length < 2) return;
    console.log("works");
    let currentRowLength = rows[rows.length - 1].length;
    let targetRowLength = rows[rows.length - 2].length;
    console.log(currentRowLength, targetRowLength)
    
    textarea.selectionStart = textarea.selectionEnd = currentRowLength < targetRowLength ? textarea.selectionStart - (targetRowLength) - 1 + c : textarea.selectionStart - (currentRowLength) - 1 + c;

})

btnDown.addEventListener("click", () => {
    let symbNum = Math.round((textarea.clientWidth - 40)/8.783);
    let rows = textarea.value.slice(0, textarea.selectionStart).split("\n");
    rows = splitRows (rows, symbNum);
    let currentRowLength = rows[rows.length - 1].length;


    rows = textarea.value.slice(textarea.selectionStart, textarea.value.length).split("\n");
    let c = 0;
    if (rows[0].length > symbNum - currentRowLength) {
        let firstRow = rows[0].slice(0, symbNum - currentRowLength);
        rows[0] = rows[0].slice(symbNum - currentRowLength, rows[0].length);
        rows.unshift(firstRow);
        c = -1;
    }

    rows = splitRows (rows, symbNum);
    if (rows.length < 2) return;
    let restCurRowLength = rows[0].length;
    let targetRowLength = rows[1].length;
    
    textarea.selectionStart = textarea.selectionEnd = currentRowLength > targetRowLength ? textarea.selectionStart + (targetRowLength + restCurRowLength) + 1 + c : textarea.selectionStart + (restCurRowLength + currentRowLength) + 1 + c;

})

function splitRows (rows, symbNum) {
    rows = rows.reduce((acc, el) => {
        if (el.length > symbNum) {
            // el = el + "t";
            for (let i = 0; i < el.length; i += symbNum) {
                acc.push(el.slice(i, i + symbNum - 1));
            }
        } else acc.push(el);
        return acc;
    }, [])
    return rows;
}
    

// jokes
function generateJokes()  {
    let index = Math.floor(Math.random()*jokes.length);
    return ("   ", "Не знаю зачем здесь эта кнопка. Пусть хоть анекдот расскажет: \n" + jokes[index] + "\n");
}