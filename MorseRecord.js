class MorseRecord {
    constructor() {
        this.keydownTime = null; // 按下的时间
        this.keyupTime = null; // 抬起时间
        this.cache = []; // 存储

        this.timer = null; // 计算结束时长
        this.timeout = 3000; // N毫秒无输入结束

        this.firstInput = true;
        this.recording = false;
    }
    keydown() {
        this.keydownTime = Date.now();
        let spaceTime = Date.now() - this.keyupTime;

        if (spaceTime >= MorseRecord.spaceTime.char && spaceTime < MorseRecord.spaceTime.word && !this.firstInput) {
            this.cache.push(MorseRecord.spaceSymbol.char);
        }
        if (spaceTime >= MorseRecord.spaceTime.word && !this.firstInput) {
            this.cache.push(MorseRecord.spaceSymbol.word);
        }
        clearTimeout(this.timer);
    }
    keyup() {
        let time = Date.now() - this.keydownTime;
        if (time >= MorseRecord.dashTime) {
            this.cache.push(MorseRecord.morseSymbol.dash);
        } else {
            this.cache.push(MorseRecord.morseSymbol.dot);
        }
        this.keyupTime = Date.now();
        this.firstInput = false;
        this.checkTime();
    }
    checkTime() {
        this.timer = setTimeout(() => {
            //console.log(this.cache.join(''));
            // console.log(MorseParse.instance.getString(this.cache));
            this.reset();
        }, this.timeout);
    }
    reset() {
        this.keydownTime = null; // 按下的时间
        this.keyupTime = null; // 抬起时间
        this.cache = []; // 存储
        this.timer = null; // 计算结束时长
        this.firstInput = true;
        this.recording = false;
    }
    start() {
        this.recording = true;
    }
    stop() {
        this.recording = false;
    }
    getMorse() {
        return this.cache;
    }
}

MorseRecord.dashTime = 210; // dash 的最短市场

MorseRecord.spaceSymbol = {
    char: ' ',
    word: '   '
};
MorseRecord.spaceTime = {
    char: 300,
    word: 700
};
MorseRecord.morseSymbol = {
    dot: '.',
    dash: '-'
}; // 符号