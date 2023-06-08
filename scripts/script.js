const timerDisplayElement = document.querySelector('.timer-display__time');
const endTimeElement = document.querySelector('.timer-display__end-time');
const timerStartButton = document.querySelector('.timer-button.start');
const timerStopButton = document.querySelector('.timer-button.stop');

let interval;

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
        if (secondsLeft < 0) {
            clearInterval(interval);
            return console.log('Таймер всё! Перерыв');
        }

        displayTimer(secondsLeft);
    }, 1000);
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
}

const stopTimer = () => {
    clearInterval(interval);
    timerDisplayElement.textContent = 'Таймер остановлен';
    endTimeElement.textContent = '--:--';
    document.title = 'таймер остановлен';
}

timerStartButton.addEventListener('click', startTimer);
timerStopButton.addEventListener('click', stopTimer);
