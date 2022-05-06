const buttons = [
    {
        en: {
            low: "`",
            high: "~"
        },
        ru: {
            low: "ё",
            high: "Ё"
        },  
        id: "Backquote",
    },
    {
        en: {
            low: "1",
            high: "!"
        },
        ru: {
            low: "1",
            high: "!"
        },  
        id: "Digit1",
    },
    {
        en: {
            low: "2",
            high: '@'
        },
        ru: {
            low: "2",
            high: '"'
        },  
        id: "Digit2",
    },
    {
        en: {
            low: "3",
            high: "#"
        },
        ru: {
            low: "3",
            high: "№"
        },  
        id: "Digit3",
    },
    {
        en: {
            low: "4",
            high: "$"
        },
        ru: {
            low: "4",
            high: ";"
        },  
        id: "Digit4",
    },
    {
        en: {
            low: "5",
            high: "%"
        },
        ru: {
            low: "5",
            high: "%"
        },  
        id: "Digit5",
    },
    {
        en: {
            low: "6",
            high: "^"
        },
        ru: {
            low: "6",
            high: ":"
        },  
        id: "Digit6",
    },
    {
        en: {
            low: "7",
            high: "&"
        },
        ru: {
            low: "7",
            high: "?"
        },  
        id: "Digit7",
    },
    {
        en: {
            low: "8",
            high: "*"
        },
        ru: {
            low: "8",
            high: "*"
        },  
        id: "Digit8",
    },
    {
        en: {
            low: "9",
            high: "("
        },
        ru: {
            low: "9",
            high: "("
        },  
        id: "Digit9",
    },
    {
        en: {
            low: "0",
            high: ")"
        },
        ru: {
            low: "0",
            high: ")"
        },  
        id: "Digit0",
    },
    {
        en: {
            low: "-",
            high: "_"
        },
        ru: {
            low: "-",
            high: "_"
        },  
        id: "Minus",
    },
    {
        en: {
            low: "=",
            high: "+"
        },
        ru: {
            low: "=",
            high: "+"
        },  
        id: "Equal",
    },
    {
        en: {
            low: "backspace",
            high: "backspace"
        },
        ru: {
            low: "backspace",
            high: "backspace"
        },  
        id: "Backspace",
    },
    {
        en: {
            low: "keyboard_tab",
            high: "keyboard_tab"
        },
        ru: {
            low: "keyboard_tab",
            high: "keyboard_tab"
        },  
        id: "Tab",
    },
    {
        en: {
            low: "q",
            high: "Q"
        },
        ru: {
            low: "й",
            high: "Й"
        },  
        id: "KeyQ",
    },
    {
        en: {
            low: "w",
            high: "W"
        },
        ru: {
            low: "ц",
            high: "Ц"
        },  
        id: "KeyW",
    },
    {
        en: {
            low: "e",
            high: "E"
        },
        ru: {
            low: "у",
            high: "У"
        },  
        id: "KeyE",
    },
    {
        en: {
            low: "r",
            high: "R"
        },
        ru: {
            low: "к",
            high: "К"
        },  
        id: "KeyR",
    },
    {
        en: {
            low: "t",
            high: "T"
        },
        ru: {
            low: "е",
            high: "Е"
        },  
        id: "KeyT",
    },
    {
        en: {
            low: "y",
            high: "Y"
        },
        ru: {
            low: "н",
            high: "Н"
        },  
        id: "KeyY",
    },
    {
        en: {
            low: "u",
            high: "U"
        },
        ru: {
            low: "г",
            high: "Г"
        },  
        id: "KeyU",
    },
    {
        en: {
            low: "i",
            high: "I"
        },
        ru: {
            low: "ш",
            high: "Ш"
        },  
        id: "KeyI",
    },
    {
        en: {
            low: "o",
            high: "O"
        },
        ru: {
            low: "щ",
            high: "Щ"
        },  
        id: "KeyO",
    },
    {
        en: {
            low: "p",
            high: "P"
        },
        ru: {
            low: "з",
            high: "З"
        },  
        id: "KeyP",
    },
    {
        en: {
            low: "[",
            high: "{"
        },
        ru: {
            low: "х",
            high: "Х"
        },  
        id: "BracketLeft",
    },
    {
        en: {
            low: "]",
            high: "}"
        },
        ru: {
            low: "ъ",
            high: "Ъ"
        },  
        id: "BracketRight",
    },
    {
        en: {
            low: "\\",
            high: "|"
        },
        ru: {
            low: "\\",
            high: "/"
        },  
        id: "Backslash",
    },
    {
        en: {
            low: "capslock",
            high: "capslock"
        },
        ru: {
            low: "capslock",
            high: "capslock"
        },     
        id: "CapsLock",     
    },
    {
        en: {
            low: "a",
            high: "A"
        },
        ru: {
            low: "ф",
            high: "Ф"
        },   
        id: "KeyA",       
    },
    {
        en: {
            low: "s",
            high: "S"
        },
        ru: {
            low: "ы",
            high: "Ы"
        },    
        id: "KeyS",      
    },
    {
        en: {
            low: "d",
            high: "D"
        },
        ru: {
            low: "в",
            high: "В"
        },    
        id: "KeyD",      
    },
    {
        en: {
            low: "f",
            high: "F"
        },
        ru: {
            low: "а",
            high: "А"
        },   
        id: "KeyF",       
    },
    {
        en: {
            low: "g",
            high: "G"
        },
        ru: {
            low: "п",
            high: "П"
        },    
        id: "KeyG",      
    },
    {
        en: {
            low: "h",
            high: "H"
        },
        ru: {
            low: "Р",
            high: "р"
        },    
        id: "KeyH",      
    },
    {
        en: {
            low: "j",
            high: "J"
        },
        ru: {
            low: "о",
            high: "О"
        },     
        id: "KeyJ",     
    },
    {
        en: {
            low: "k",
            high: "K"
        },
        ru: {
            low: "л",
            high: "Л"
        },   
        id: "KeyK",       
    },
    {
        en: {
            low: "l",
            high: "L"
        },
        ru: {
            low: "д",
            high: "Д"
        },  
        id: "KeyL",        
    },
    {
        en: {
            low: ";",
            high: ":"
        },
        ru: {
            low: "ж",
            high: "Ж"
        }, 
        id: "Semicolon",         
    },
    {
        en: {
            low: "'",
            high: '"'
        },
        ru: {
            low: "э",
            high: "Э"
        },
        id: "Quote",           
    },
    {
        en: {
            low: "keyboard_return",
            high: "keyboard_return"
        },
        ru: {
            low: "keyboard_return",
            high: "keyboard_return"
        },  
        id: "Enter",         
    },
    {
        en: {
            low: "Shift",
            high: "Shift"
        },
        ru: {
            low: "Shift",
            high: "Shift"
        },   
        id: "ShiftLeft",      
    },
    {
        en: {
            low: "z",
            high: "Z"
        },
        ru: {
            low: "я",
            high: "Я"
        }, 
        id: "KeyZ",        
    },
    {
        en: {
            low: "x",
            high: "X"
        },
        ru: {
            low: "ч",
            high: "Ч"
        }, 
        id: "KeyX",        
    },
    {
        en: {
            low: "c",
            high: "C"
        },
        ru: {
            low: "с",
            high: "С"
        },   
        id: "KeyC",      
    },
    {
        en: {
            low: "v",
            high: "V"
        },
        ru: {
            low: "м",
            high: "М"
        }, 
        id: "KeyV",        
    },
    {
        en: {
            low: "b",
            high: "B"
        },
        ru: {
            low: "и",
            high: "И"
        },
        id: "KeyB",         
    },
    {
        en: {
            low: "n",
            high: "N"
        },
        ru: {
            low: "т",
            high: "Т"
        }, 
        id: "KeyN",        
    },
    {
        en: {
            low: "m",
            high: "M"
        },
        ru: {
            low: "ь",
            high: "Ь"
        },  
        id: "KeyM",       
    },
    {
        en: {
            low: ",",
            high: "<"
        },
        ru: {
            low: "б",
            high: "Б"
        }, 
        id: "Comma",        
    },
    {
        en: {
            low: ".",
            high: ">"
        },
        ru: {
            low: "ю",
            high: "Ю"
        },
        id: "Period",         
    },
    {
        en: {
            low: "/",
            high: "?"
        },
        ru: {
            low: ".",
            high: ","
        },  
        id: "Slash",    
    },
    {
        en: {
            low: "Shift",
            high: "Shift"
        },
        ru: {
            low: "Shift",
            high: "Shift"
        },  
        id: "ShiftRight",     
    },
    {
        en: {
            low: "Control",
            high: "Control"
        },
        ru: {
            low: "Control",
            high: "Control"
        },  
        id: "ControlLeft",     
    },
    {
        en: {
            low: "win",
            high: "win"
        },
        ru: {
            low: "win",
            high: "win"
        }, 
        id: "MetaLeft",      
    },
    {
        en: {
            low: "Alt",
            high: "Alt"
        },
        ru: {
            low: "Alt",
            high: "Alt"
        },  
        id: "AltLeft",     
    },
    {
        en: {
            low: "space_bar",
            high: "space_bar"
        },
        ru: {
            low: "space_bar",
            high: "space_bar"
        },   
        id: "Space",    
    },
    {
        en: {
            low: "Alt",
            high: "Alt"
        },
        ru: {
            low: "Alt",
            high: "Alt"
        },  
        id: "AltRight",     
    },
    {
        en: {
            low: "Control",
            high: "Control"
        },
        ru: {
            low: "Control",
            high: "Control"
        },      
        id: "ControlRight", 
    },
]
export default buttons;