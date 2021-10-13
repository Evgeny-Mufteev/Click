let clicks = 0;

const TIMEOUT = 5000;

const display = document.querySelector('#display'),
      button = document.querySelector('#button'),
      counter = document.querySelector('#counter'),
      restart = document.querySelector(".restart_js"),
      raitingList = document.querySelector(".raiting__list_js"),
      cryPhraseBlock = document.querySelector(".cryPhrase_js"),
      liveHearth = document.querySelector(".live-hearth");
 
let objPhrases = {
        0: "Так не работает!",
        10: "Ужасно!",
        20: "Плохо!",
        30: "Не плохо!",
        40: "Приемлимо!",
        50: "Нормально!"
    };
 
recordTablePull(raitingList);
checkLives();
drawLives(liveHearth, checkLives());

if(checkLives()!=0){
    button.onclick = start;
}else{
    button.innerText = "Посмотреть рекламу!";
}



let buttonOpenList = document.querySelector(".background-menu__title_js"),
    menuList = document.querySelector(".background-menu__list_js"),
    menuElement = document.querySelectorAll(".background-menu__element_js");

buttonOpenList.addEventListener("click", () => openList(menuList));
menuElement.forEach(el => {
    el.addEventListener("click", () => switchBackground(el));

    let backgroundColor = el.getAttribute("data-color");
    if(backgroundColor)
        el.style.background = backgroundColor;
});

button.onclick = start;


function start() {
    let audio = document.querySelector("#audioClick_js");

    const startTime = Date.now();
 
    counter.textContent = clicks;

    display.textContent = formatTime(TIMEOUT);
    button.onclick = () => {
        console.log(audio);
        counter.textContent = ++clicks;
        audio.play();
    }

    const interval = setInterval(() => {
        const delta  = Date.now() - startTime;
        display.textContent = formatTime(TIMEOUT - delta);
    }, 100);

    const timeout = setTimeout(() => {
        editLives(-1);
        drawLives(liveHearth, checkLives());


        button.onclick = null;

        let cryPhrase = '';
        for (let key in objPhrases) {
            
            if(clicks >= key)
               cryPhrase = objPhrases[key];

        }

        cryPhraseBlock.textContent = cryPhrase;

        let Name = document.querySelector(".input-name-form__input_js");

        document.querySelector(".input-name-form_js").style.display = "block";
        document.querySelector(".input-name-form__submit_js").addEventListener("click", function(){
            if(Name.value){
                if(localStorage.getItem("recordTable")){
                    localStorage.setItem("recordTable", localStorage.getItem("recordTable")+`^${Name.value}&${clicks}`);
                }else{
                    localStorage.setItem("recordTable", `${Name.value}&${clicks}`);
                }
            }else{
                return;
            }

            document.querySelector(".input-name-form_js").style.display = "none";
            recordTablePull(raitingList);
        });
        
        clearInterval(interval)
        clearTimeout(timeout);
    }, TIMEOUT);
};
 

// Уже лишнее, но решили усложнить
function formatTime(ms) {
    return Number.parseFloat(ms / 1000).toFixed(2);
}

function recordTablePull(raitingList){
    let recordTable = localStorage.getItem("recordTable");
    if(recordTable){
        raitingList.innerHTML = "";

        recordTable = recordTable.split("^");
        recordTable.forEach((el, i, arr) => {
            arr[i] = el.split("&");
        });

        recordTable = checkRecordTable(recordTable);

        let j = 0;
        while (j<3){
            let max = 0, maxI = 0;
            recordTable.forEach((el, i) => {
                if(el[1]>max){
                    max = el[1];
                    maxI = i;
                }
            });

            let LeaderName = `${recordTable[maxI][0]} ${recordTable[maxI][1]} очк.`;
            recordTable[maxI] = 0;

            addLeaderName(raitingList, LeaderName);

            j++;
        }

    }


    return;
}

function addLeaderName(raitingList, LeaderName){
    let li = document.createElement('li'),
        span = document.createElement('span');

    span.classList.add("raiting__name");
    span.classList.add("raiting__name_js");
    span.innerText = LeaderName;
    li.append(span);
    raitingList.append(li);

    return;
}

function checkRecordTable(recordTable){
    let count = recordTable.length,
        i = 3,
        arNull = Array('',0);

    if(count>=3) return recordTable;

    count = 3-recordTable.length;
    while(i>=count){

        recordTable.push(arNull);

        i--;
    }

    return recordTable;
}


function openList(list){
    if(!list) return;
    
    console.log("click");

    list.classList.toggle("noDisplay");
}

function switchBackground(element){
    if(!element) return;

    let color = element.getAttribute("data-color");

    if(!color) return;

    document.body.style.background = color;
}

function checkLives(){
    let countLives = localStorage.getItem("lives");
    if(!countLives)
        localStorage.setItem("lives", 3);

    return countLives;
}

function editLives(count){
    if(!count) return;

    localStorage.setItem("lives", Number(localStorage.getItem("lives"))+count);
}

function drawLives(hearthParent, countLives){
    let arrSvg = hearthParent.querySelectorAll("svg");
    arrSvg.forEach(el => {
        el.style.fill = "black";
    });
    arrSvg.forEach(el => {
        if(countLives>0){
            el.style.fill = "red";

            countLives--;
        }else{
            return;
        }
    });
}


