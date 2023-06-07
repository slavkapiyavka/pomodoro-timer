let interval;
const timer = (seconds) => {
    const currentTime = Date.now();
    const finishTime = currentTime + seconds * 1000;

    displayTimer(seconds);

    interval = setInterval(() => {
        const secondsLeft = Math.round((finishTime - Date.now()) / 1000);
        if (secondsLeft > 0) {
            displayTimer(secondsLeft);
        } else {
            clearInterval(interval);
            return console.log('Таймер всё! Перерыв');;
        }
    }, 1000);
}

const displayTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const restSeconds = seconds % 60;

    console.log(`${minutes}:${restSeconds}`);
}