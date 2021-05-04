// ANALOGE UHR
setInterval(setAnalogClock, 1000);

const secondHand = document.querySelector('#analogSekunde');
const minuteHand = document.querySelector('#analogMinute');
const hourHand = document.querySelector('#analogStunde');

function setAnalogClock(){
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
};

function setRotation(element, rotationRatio){
    element.style.setProperty('--rotation', rotationRatio * 360 + 'deg');
};

setAnalogClock();

// ------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------- //

// DIGITALE UHR
let appStart = true;
setInterval(setDigitalClock, 1000);

function setDigitalClock(){
    secondTick();
    const currentDate = new Date();
    const second = currentDate.getSeconds();
    const minute = currentDate.getMinutes();
    const hour = currentDate.getHours();

    if(second == 0 || appStart){
        resetColoring();
        colorDigits(hourElements, hour);
        colorDigits(minuteElements, minute);
        appStart = false;
    };
};

const secondDots = document.querySelectorAll('.second-dot');
function secondTick(){
    secondDots.forEach( dot => {
        dot.classList.toggle('aktiver-balken');
    });
};

const hourElements = document.querySelectorAll('.digital-stunde');
const minuteElements = document.querySelectorAll('.digital-minute');

function resetColoring(){
    document.querySelectorAll('.aktiver-balken').forEach( element => {
        element.classList.remove('aktiver-balken');
    });
};

function colorDigits(digitColumns, time){

    time = time.toString();
    if(time.length == 1){
        time = '0'+time;
    };
    time = Array.from(time);

    digitColumns.forEach( (clockDigit, i) => {
        const schema = numberSchema[time[i]];

        schema.forEach( column => {
            column[1].forEach( (bar,i) => {
                clockDigit.children[column[0]].children[bar].classList.add('aktiver-balken');
            });

        });

    });
};

// array mit vorgefertigten INDEX für färbung
const numberSchema = [
/* 0 */ [[0,[0,1]],[1,[0,2]],[2,[0,1]]],
/* 1 */ [[2,[0,1]]],
/* 2 */ [[0,[1]],[1,[0,1,2]],[2,[0]]],
/* 3 */ [[1,[0,1,2]],[2,[0,1]]],
/* 4 */ [[0,[0]],[1,[1]],[2,[0,1]]],
/* 5 */ [[0,[0]],[1,[0,1,2]],[2,[1]]],
/* 6 */ [[0,[0,1]],[1,[0,1,2]],[2,[1]]],
/* 7 */ [[1,[0]],[2,[0,1]]],
/* 8 */ [[0,[0,1]],[1,[0,1,2]],[2,[0,1]]],
/* 9 */ [[0,[0]],[1,[0,1]],[2,[0,1]]]
];

setDigitalClock();