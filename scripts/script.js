let interval;
const timer = (seconds) => {
    const currentTime = Date.now();
    const finishTime = currentTime + seconds * 1000;

    displayTimer(seconds);

    interval = setInterval(() => {
        const secondsLeft = Math.round((finishTime - Date.now()) / 1000);
        if (secondsLeft > 0) {
            console.log(secondsLeft);
        } else {
            clearInterval(interval);
            return console.log('Таймер всё! Перерыв');;
        }
    }, 1000);
}
