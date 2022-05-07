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
                this.value = "  ";
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
        })
        document.addEventListener("keyup", (e) => {
                if (e.code === this.name.id) {
                    this.button.classList.remove("active");
                }
        })
    }
}

function workWithTextarea (inst) {
    let letter;
    switch (inst.name.id) {
        case "Backspace":
            backspace();
            return;
        case "Delete":
            delSymbol();
            return;
        case "Enter":
            letter = inst.value;
            break;
        case "Space":
            letter = inst.value;
            break;
        case "Tab":
            letter = inst.value;
            break;
        case "MetaLeft":
        case "AltRight":
        case "AltLeft":
            letter = generateJokes();
            break;
        default:
            letter = inst.buttonValue.textContent;
            
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
    }
    if (e.code === "CapsLock") buttonsArray[29]._capsLock();
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

const buttonsArray = buttons.map(el => {
    const button = new KeyboardButton (el);
    button.createButton();
    document.querySelector(".keyboard__wrapper").append(button.button);
    return button;
})
const directions = document.createElement("button");
directions.classList.add("key");
directions.style.width = "19.2%"
document.querySelector(".keyboard__wrapper").append(directions);

function generateJokes()  {
    let index = Math.floor(Math.random()*jokes.length);
    return ("Не знаю зачем здесь эта кнопка. Пусть хоть анекдот расскажет: \n" + jokes[index] + "\n");
}