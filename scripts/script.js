const timerDisplayElement = document.querySelector('.timer-display__time');
const endTimeElement = document.querySelector('.timer-display__end-time');
const timerStartButton = document.querySelector('.timer-button.start');
const timerPauseButton = document.querySelector('.timer-button.pause');
const timerStopButton = document.querySelector('.timer-button.stop');

const SHORT_BREAK = 300;
const LONG_BREAK = 900;

let currentBreak = null;
let interval;
let pauseTimestamp = null;

const timer = (seconds = 1500) => {
    if (interval) {
        clearInterval(interval);
    };

    const currentTime = Date.now();
    const finishTime = currentTime + seconds * 1000;

    displayTimer(seconds);
    displayEndTime(finishTime);

    interval = setInterval(() => {
        const secondsLeft = Math.round((finishTime - Date.now()) / 1000);
        if (secondsLeft <= 0) {
            clearInterval(interval);

            switch (currentBreak) {
                case 'short':
                    timer(SHORT_BREAK);
                    modifyTimerState(currentBreak);
                    currentBreak = 'middle';
                    break;
                case 'middle':
                    timer();
                    currentBreak = 'long';
                    break;
                case 'long':
                    timer(LONG_BREAK);
                    modifyTimerState(currentBreak);
                    currentBreak = null;
                    break;
                default:
                    timer();
                    currentBreak = 'short';
                    break;
            };
        }

        pauseTimestamp = secondsLeft;
        displayTimer(secondsLeft);
    }, 125);
};

const displayEndTime = (timestamp) => {
    const endTime = new Date(timestamp);
    const hours = endTime.getHours();
    const minutes = endTime.getMinutes();

    endTimeElement.textContent = `До ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

const displayTimer = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    const timerView = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    timerDisplayElement.textContent = timerView;
    document.title = timerView;
};

const startTimer = () => {
    timer();
    modifyTimerState('start');
    currentBreak = 'short';
};

const pauseTimer = () => {
    if (timerPauseButton.textContent === 'продолжить') {
        timerPauseButton.textContent = 'поставить таймер на паузу';
        timer(pauseTimestamp);
    } else {
        clearInterval(interval);
        modifyTimerState('pause');
    }
}

const stopTimer = () => {
    clearInterval(interval);
    modifyTimerState('stop');
    currentBreak = null;
}

const modifyTimerState = (state) => {
    switch (state) {
        case 'start': {
            timerStartButton.setAttribute('disabled', true);
            timerPauseButton.removeAttribute('disabled');
            timerStopButton.removeAttribute('disabled');
        }
            break;
        case 'pause': {
            endTimeElement.textContent = 'таймер на паузе';
            document.title = 'таймер на паузе';
            timerPauseButton.textContent = 'продолжить';
        }
            break;
        case 'stop': {
            timerDisplayElement.textContent = 'таймер остановлен';
            endTimeElement.textContent = '--:--';
            document.title = 'таймер остановлен';
            timerStartButton.removeAttribute('disabled');
            timerPauseButton.setAttribute('disabled', true);
            timerPauseButton.textContent = 'поставить таймер на паузу';
            timerStopButton.setAttribute('disabled', true);
        }
            break;
        case 'short':
            endTimeElement.textContent = 'разомнись, ведь у тебя короткий перерыв!';
            break;
        case 'long':
            endTimeElement.textContent = 'папей чаю, ведь у тебя длинный перерыв!';
            break;
        default:
            break;
    }
};

timerStartButton.addEventListener('click', startTimer);
timerPauseButton.addEventListener('click', pauseTimer);
timerStopButton.addEventListener('click', stopTimer);
