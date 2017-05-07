class MorseParse {
    constructor() {
        MorseParse.instance = this;
    }
    getMorse(str) {
        str = str.toUpperCase();
        let arr = [];
        str.split('').forEach((char, i) => {
            if (char == MorseParse.spaceChar) {
                arr.pop();
                arr.push(MorseRecord.spaceSymbol.word);
            } else {
                arr.push(MorseParse.morseReverse[char] ? MorseParse.morseReverse[char] : MorseParse.errChar);
                if (typeof str[i + 1] !== 'undefined') {
                    arr.push(MorseRecord.spaceSymbol.char);
                }
            }
        });
        return arr;
    }
    getString(morse) {
        let wordArr = morse.join('').split(MorseRecord.spaceSymbol.word);
        let arr = wordArr.map(word => {
            let charArr = word.split(MorseRecord.spaceSymbol.char);
            return charArr.map(char => {
                return MorseParse.morse[char] ? MorseParse.morse[char] : MorseParse.errChar;
            });
        });

        let str = '';
        arr.forEach((charArr, i) => {
            charArr.forEach(char => {
                str += char;
            })
            if (typeof arr[i+1] !== 'undefined') {
                str += MorseParse.spaceChar;
            }
        });
        return str;
    }
}
MorseParse.instance = null;
MorseParse.morse = {
    '.-': 'A',
    '-...': 'B',
    '-.-.': 'C',
    '-..': 'D',
    '.': 'E',
    '..-.': 'F',
    '--.': 'G',
    '....': 'H',
    '..': 'I',
    '.---': 'J',
    '-.-': 'K',
    '.-..': 'L',
    '--': 'M',
    '-.': 'N',
    '---': 'O',
    '.--.': 'P',
    '--.-': 'Q',
    '.-.': 'R',
    '...': 'S',
    '-': 'T',
    '..-': 'U',
    '...-': 'V',
    '.--': 'W',
    '-..-': 'X',
    '-.--': 'Y',
    '--..': 'Z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
    '.-.-.-': '.',
    '---...': ':',
    '--..--': ',',
    '-.-.-.': ';',
    '..--..': '?',
    '-...-': '=',
    '.---.': '\'',
    '-..-.': '/',
    '-.-.--': '!',
    '-...-': '-',
    '..--.-': '_',
    '.-..-.': '"',
    '-.--.': '(',
    '-.--.-': ')',
    '...-..-': '$',
    '.-...': '&',
    '.--.-.': '@',
    '.-.-.': '+'
}
MorseParse.spaceChar = ' ';
MorseParse.errChar = '[*]';
// 将键值兑换
MorseParse.morseReverse = {};
for (var key in MorseParse.morse) {
    MorseParse.morseReverse[MorseParse.morse[key]] = key;
}
new MorseParse();