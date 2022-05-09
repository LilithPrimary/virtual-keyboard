import './styles/main.scss';
import buttons from './script/buttons';

let lang = 'en';
let registr = 'low';
let isCaps = false;
let isShift = false;
let isCtrl = false;
let textarea;
let buttonsArray = [];
let keyboardWrapper;
let curLang;

function delSymbol() {
  if (textarea.selectionStart === textarea.selectionEnd) {
    textarea.setRangeText('', textarea.selectionStart, textarea.selectionStart + 1, 'end');
  } else { textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end'); }
}

function backspace() {
  if (textarea.selectionStart === 0 && textarea.selectionEnd === 0) return;
  if (textarea.selectionStart === textarea.selectionEnd) {
    textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionStart, 'end');
  } else { textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end'); }
}

function workWithTextarea(inst) {
  let buttonCode;
  let symbol;

  if (inst instanceof Event) {
    if (inst.key === 'Control') return;
    buttonCode = inst.code;
    buttonsArray.forEach((el) => {
      if (el.name.id === buttonCode) {
        symbol = el.buttonValue.textContent;
      }
    });
  } else {
    buttonCode = inst.name.id;
    symbol = inst.buttonValue.textContent;
  }

  if (!buttonsArray.some((el) => el.name.id === buttonCode)) return;
  let letter;
  switch (buttonCode) {
    case 'Backspace':
      backspace();
      return;
    case 'Delete':
      delSymbol();
      return;
    case 'Enter':
      letter = '\n';
      break;
    case 'Space':
      letter = ' ';
      break;
    case 'Tab':
      letter = '    ';
      break;
    case 'MetaLeft':
    case 'AltRight':
    case 'AltLeft':
      return;
    default:
      letter = symbol;
  }
  textarea.setRangeText(letter, textarea.selectionStart, textarea.selectionEnd, 'end');
}

class KeyboardButton {
  button = document.createElement('button');

  buttonValue = document.createElement('span');

  value = '';

  constructor(name) {
    this.name = name;
  }

  createButton() {
    this.button.classList.add('key');
    this.buttonValue.classList.add('key__value');
    switch (this.name.en.low) {
      case 'Control':
        this.button.classList.add('key__wide');
        break;
      case 'backspace':
        this.button.classList.add('material-symbols-outlined');
        break;
      case 'keyboard_tab':
        this.button.classList.add('key__wide', 'material-symbols-outlined');
        break;
      case 'capslock':
        this.button.classList.add('key__wide', 'material-symbols-outlined', 'key__capslock');
        break;
      case 'keyboard_return':
        this.button.classList.add('key__enter', 'material-symbols-outlined');
        break;
      case 'Shift':
        this.button.classList.add('key__shift');
        break;
      case 'space_bar':
        this.button.classList.add('key__space', 'material-symbols-outlined');
        break;
      default:
        this.button.classList.add('key');
    }
    this.setButtonSymbol();
    this.button.append(this.buttonValue);
    this.pressButton();
    this.synchronizeWithKeyboard();
    document.body.append(this.button);
  }

  pressButton() {
    this.button.addEventListener('click', () => {
      switch (this.name.id) {
        case 'CapsLock':
          if (isShift) {
            this.shiftButton();
          }
          this.capsLock();
          break;
        case 'ShiftLeft':
        case 'ShiftRight': this.shiftButton(); break;
        case 'ControlRight':
        case 'ControlLeft':
          if (isShift) {
            this.shiftButton();
            this.changeLanguage();
          }
          break;
        default:
          workWithTextarea(this);
          if (isShift) {
            this.shiftButton();
          }
      }
    });
  }

  shiftButton() {
    if (isShift) {
      buttonsArray.forEach((el) => {
        if (el.name.en.low === 'Shift') {
          el.button.classList.remove('active');
          isShift = false;
          if (!isCaps) {
            registr = 'low';
            this.changeButtonsValue();
          }
        }
      });
    } else {
      buttonsArray.forEach((el) => {
        if (el.name.en.low === 'Shift') {
          el.button.classList.add('active');
          registr = 'high';
          this.changeButtonsValue();
          isShift = true;
        }
      });
    }
    if (isShift && isCaps) {
      registr = 'low';
      this.changeButtonsValue();
    }
    if (!isShift && isCaps) {
      registr = 'high';
      this.changeButtonsValue();
    }
  }

  setButtonSymbol() {
    this.buttonValue.textContent = this.name[lang][registr];
    switch (this.name.en.low) {
      case 'Control':
        this.buttonValue.textContent = 'Ctrl';
        break;
      case 'backspace':
        this.value = this.value.substring(0, this.value.length - 1);
        break;
      case 'keyboard_tab':
        this.value = '    ';
        break;
      case 'capslock':
        this.value = this.capsLock;
        break;
      case 'keyboard_return':
        this.value = '\n';
        break;
      case 'shift':
        break;
      case 'space_bar':
        this.value = ' ';
        break;
      case 'alt':
        break;
      default:
        this.value = this.name[lang][registr];
    }
    curLang.textContent = `Current language: ${lang.toLocaleUpperCase()}`;
  }

  capsLock() {
    if (isCaps) {
      this.button.classList.remove('on');
      registr = 'low';
      isCaps = false;
      this.changeButtonsValue();
    } else {
      this.button.classList.add('on');
      registr = 'high';
      isCaps = true;
      this.changeButtonsValue();
    }
  }

  changeLanguage() {
    lang = lang === 'en' ? 'ru' : 'en';
    this.changeButtonsValue();
  }

  changeButtonsValue() {
    this.value = this.name.id;
    buttonsArray.forEach((el) => el.setButtonSymbol());
  }

  synchronizeWithKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.code === this.name.id) {
        e.preventDefault();
        this.button.classList.add('active');
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.target.classList.add('active');
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.code === this.name.id) {
        this.button.classList.remove('active');
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.target.classList.remove('active');
      }
    });
  }
}

function createKeyboard() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  const main = document.createElement('main');
  main.classList.add('main');

  const sectionText = document.createElement('section');
  sectionText.classList.add('section', 'text');
  const textWrapper = document.createElement('div');
  textWrapper.classList.add('text__wrapper');
  textarea = document.createElement('textarea');
  textarea.classList.add('text__input', 'text-input');
  textarea.addEventListener('blur', () => textarea.focus());
  textarea.autofocus = true;
  textWrapper.append(textarea);
  sectionText.append(textWrapper);

  const sectionKeyboard = document.createElement('section');
  sectionKeyboard.classList.add('section', 'keyboard');
  keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard__wrapper');
  sectionKeyboard.append(keyboardWrapper);
  main.append(sectionText, sectionKeyboard);

  const footer = document.createElement('footer');
  footer.classList.add('footer');
  const github = document.createElement('a');
  github.classList.add('link', 'link__gh');
  github.textContent = '© Lilith Primary';
  github.href = 'https://github.com/LilithPrimary';
  curLang = document.createElement('span');
  curLang.classList.add('text');
  curLang.textContent = `Current language: ${lang.toLocaleUpperCase()}`;
  const langSwitch = document.createElement('span');
  langSwitch.classList.add('text');
  langSwitch.textContent = 'Switch: Shift + Ctrl';
  const RSS = document.createElement('a');
  RSS.classList.add('link', 'link__rss');
  RSS.textContent = 'RSS';
  RSS.href = 'https://rs.school/js/';
  footer.append(github, curLang, langSwitch, RSS);

  wrapper.append(main, footer);
  document.body.append(wrapper);

  const btnLeft = document.createElement('button');
  btnLeft.classList.add('key', 'key__slim');
  const spanLeft = document.createElement('span');
  spanLeft.classList.add('key__value', 'material-symbols-outlined');
  spanLeft.textContent = 'keyboard_arrow_left';
  btnLeft.append(spanLeft);

  const btnUp = document.createElement('button');
  btnUp.classList.add('key', 'key__slim');
  const spanUp = document.createElement('span');
  spanUp.classList.add('key__value', 'material-symbols-outlined');
  spanUp.textContent = 'keyboard_arrow_up';
  btnUp.append(spanUp);

  const btnDown = document.createElement('button');
  btnDown.classList.add('key', 'key__slim');
  const spanDown = document.createElement('span');
  spanDown.classList.add('key__value', 'material-symbols-outlined');
  spanDown.textContent = 'keyboard_arrow_down';
  btnDown.append(spanDown);

  const btnRight = document.createElement('button');
  btnRight.classList.add('key', 'key__slim');
  const spanRight = document.createElement('span');
  spanRight.classList.add('key__value', 'material-symbols-outlined');
  spanRight.textContent = 'keyboard_arrow_right';
  btnRight.append(spanRight);

  document.addEventListener('keydown', (e) => {
    document.body.style.pointerEvents = 'none';
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      if (e.repeat) return;
      buttonsArray[0].shiftButton();
      return;
    }
    if (e.key === 'Control') {
      isCtrl = true;
    }
    if (e.code === 'CapsLock') {
      buttonsArray[29].capsLock();
      return;
    }
    workWithTextarea(e);
    switch (e.code) {
      case 'ArrowUp': btnUp.classList.add('active'); break;
      case 'ArrowDown': btnDown.classList.add('active'); break;
      case 'ArrowLeft': btnLeft.classList.add('active'); break;
      case 'ArrowRight': btnRight.classList.add('active'); break;
      default:
    }
  });

  document.addEventListener('keyup', (e) => {
    document.body.style.pointerEvents = 'inherit';

    if (isShift && isCtrl) buttonsArray[0].changeLanguage();

    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      buttonsArray[0].shiftButton();
    }
    if (e.key === 'Control') {
      isCtrl = false;
    }
    switch (e.code) {
      case 'ArrowUp': btnUp.classList.remove('active'); break;
      case 'ArrowDown': btnDown.classList.remove('active'); break;
      case 'ArrowLeft': btnLeft.classList.remove('active'); break;
      case 'ArrowRight': btnRight.classList.remove('active'); break;
      default:
    }
  });

  const fragment = document.createDocumentFragment();
  buttonsArray = buttons.map((el) => {
    const button = new KeyboardButton(el);
    button.createButton();
    fragment.append(button.button);
    return button;
  });

  const centralBtnsWrapper = document.createElement('div');
  centralBtnsWrapper.classList.add('central-btns-wrapper');
  centralBtnsWrapper.append(btnUp, btnDown);

  keyboardWrapper.append(fragment, btnLeft, centralBtnsWrapper, btnRight);

  btnLeft.addEventListener('click', () => {
    textarea.selectionStart -= 1;
    textarea.selectionEnd = textarea.selectionStart - 1;
  });

  btnRight.addEventListener('click', () => {
    textarea.selectionStart += 1;
    textarea.selectionEnd = textarea.selectionStart + 1;
  });

  function splitRows(rows, symbNum) {
    const newRows = rows.reduce((acc, el) => {
      if (el.length > symbNum) {
        for (let i = 0; i < el.length; i += symbNum) {
          acc.push(el.slice(i, i + symbNum - 1));
        }
      } else acc.push(el);
      return acc;
    }, []);
    return newRows;
  }

  btnUp.addEventListener('click', () => {
    let c = 0;
    const symbNum = Math.round((textarea.clientWidth - 40) / 8.783);
    let rows = textarea.value.slice(0, textarea.selectionStart).split('\n');
    rows = splitRows(rows, symbNum);
    if (rows.length === 1 && rows[0].length === symbNum) {
      rows.push('');
      c = 1;
    }
    if (rows.length < 2) return;
    const currentRowLength = rows[rows.length - 1].length;
    const targetRowLength = rows[rows.length - 2].length;

    textarea.selectionStart = currentRowLength < targetRowLength
      ? textarea.selectionStart - (targetRowLength) - 1 + c
      : textarea.selectionStart - (currentRowLength) - 1 + c;
    textarea.selectionEnd = textarea.selectionStart;
  });

  btnDown.addEventListener('click', () => {
    const symbNum = Math.round((textarea.clientWidth - 40) / 8.783);
    let rows = textarea.value.slice(0, textarea.selectionStart).split('\n');
    rows = splitRows(rows, symbNum);
    const currentRowLength = rows[rows.length - 1].length;

    rows = textarea.value.slice(textarea.selectionStart, textarea.value.length).split('\n');
    let c = 0;
    if (rows[0].length > symbNum - currentRowLength) {
      const firstRow = rows[0].slice(0, symbNum - currentRowLength);
      rows[0] = rows[0].slice(symbNum - currentRowLength, rows[0].length);
      rows.unshift(firstRow);
      c = -1;
    }

    rows = splitRows(rows, symbNum);
    if (rows.length < 2) return;
    const restCurRowLength = rows[0].length;
    const targetRowLength = rows[1].length;

    textarea.selectionStart = currentRowLength > targetRowLength
      ? textarea.selectionStart + (targetRowLength + restCurRowLength) + 1 + c
      : textarea.selectionStart + (restCurRowLength + currentRowLength) + 1 + c;
    textarea.selectionEnd = textarea.selectionStart;
  });
}

// LOCAL STORAGE

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
  } else lang = 'en';
  createKeyboard();
}

window.addEventListener('DOMContentLoaded', getLocalStorage);

function setLocalStorage() {
  localStorage.setItem('lang', lang);
}

window.addEventListener('beforeunload', setLocalStorage);
