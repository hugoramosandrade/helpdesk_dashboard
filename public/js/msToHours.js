function msToHours(ms) {
    let seconds = parseInt((ms / 1000) % 60);
    let minutes = parseInt((ms / (1000 * 60)) % 60);
    let hours = parseInt(ms / (1000 * 60 * 60));

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
}