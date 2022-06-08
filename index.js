const times = document.querySelectorAll('.time');
const prevTimes = document.querySelectorAll('.previous-time');
const timeFrames = document.querySelectorAll('.wtf');
const daily = document.querySelector('#daily');
const weekly = document.querySelector('#weekly');
const monthly = document.querySelector('#monthly');
const dots = document.querySelectorAll('.dot');
const lowerCards = document.querySelectorAll('.lower-card');

window.addEventListener('load', () => {
    getData('weekly');
    weekly.classList.add('active');
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        dot.parentElement.parentElement.classList.remove('retain');
        dot.parentElement.parentElement.classList.add('change');
        console.log(dot.parentElement.parentElement.classList);
    });
});

lowerCards.forEach(lowerCard => {
    lowerCard.addEventListener('click', () => {
        if (lowerCard.classList.contains('change') && lowerCard.classList.contains('retain'))
            lowerCard.classList.remove('change');

        lowerCard.classList.add('retain');
        console.log(lowerCard.classList);
    });
});

daily.addEventListener('click', () => {
    removeActive();
    daily.classList.add('active');
    getData('daily');
});

weekly.addEventListener('click', () => {
    removeActive();
    weekly.classList.add('active');
    getData('weekly');
});

monthly.addEventListener('click', () => {
    removeActive();
    monthly.classList.add('active');
    getData('monthly');
});

function removeActive() {
    timeFrames.forEach((timeFrame) => {
        timeFrame.classList.remove('active');
    });
}

async function getData(tf) {
    const response = await fetch('./data.json');
    const data = await response.json();

    if (tf === 'daily') {
        for (i = 0; i < 6; i++) {
            let timeVal = data[i].timeframes.daily.current;
            times[i].innerHTML = `${timeVal}hrs`;
            let prevTimeVal = data[i].timeframes.daily.previous;
            prevTimes[i].innerHTML = `Last Day - ${prevTimeVal}hrs`
        }
    }
    else if (tf === 'weekly') {
        for (i = 0; i < 6; i++) {
            let timeVal = data[i].timeframes.weekly.current;
            times[i].innerHTML = `${timeVal}hrs`;
            let prevTimeVal = data[i].timeframes.weekly.previous;
            prevTimes[i].innerHTML = `Last Week - ${prevTimeVal}hrs`
        }
    }
    else {
        for (i = 0; i < 6; i++) {
            let timeVal = data[i].timeframes.monthly.current;
            times[i].innerHTML = `${timeVal}hrs`;
            let prevTimeVal = data[i].timeframes.monthly.previous;
            prevTimes[i].innerHTML = `Last Month - ${prevTimeVal}hrs`
        }
    }
}

