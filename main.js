let clicks = 1;

const TIMEOUT = 5000;

const display = document.querySelector('#display');
const button = document.querySelector('#button');
const counter = document.querySelector('#counter');
 
let objPhrases = {
    0: "Так не работает!",
    10: "Ужасно!",
    20: "Плохо!",
    30: "Не плохо!",
    40: "Приемлимо!",
    50: "Нормально"
}

button.onclick = start;

function start() {
    const startTime = Date.now();

    display.textContent = formatTime(TIMEOUT);
    button.onclick = () => counter.textContent = clicks++;

    const interval = setInterval(() => {
        const delta  = Date.now() - startTime;
        display.textContent = formatTime(TIMEOUT - delta);
    }, 100);

    const timeout = setTimeout(() => {
        button.onclick = null;

        let cryPhrase = '';
        for (let key in objPhrases) {
            
            if(clicks >= key)
               cryPhrase = objPhrases[key];

        }
        display.textContent = cryPhrase;
        clearInterval(interval)
        clearTimeout(timeout);
    }, TIMEOUT);
};
 

// Уже лишнее, но решили усложнить
function formatTime(ms) {
    return Number.parseFloat(ms / 1000).toFixed(2);
}
