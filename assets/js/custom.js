// TIMER
let time_hr = 0, time_mn = 0, time_sc = 0, time_ms = 0;
let timer_id;

// Buttons:
let bstart = document.getElementById('bStart');
let bpause = document.getElementById('bPause');
let bstop = document.getElementById('bStop');
// Display
let display = document.getElementById('timer_display');
let statList = document.getElementById('statList');

function timerStart() {
    bstart.setAttribute('disabled', 'disabled');
    bpause.removeAttribute('disabled');
    bstop.removeAttribute('disabled');

    console.log('timer', 'start');
    timer_id = setInterval(tick, 100);
}
function timerPause() {
    bstart.removeAttribute('disabled');
    bpause.setAttribute('disabled', 'disabled');
    bstop.removeAttribute('disabled');

    console.log('timer', 'pause');
    clearInterval(timer_id);
}
function timerStop() {
    bstart.removeAttribute('disabled');
    bpause.setAttribute('disabled', 'disabled');
    bstop.setAttribute('disabled', 'disabled');

    console.log('timer', 'stop');
    clearInterval(timer_id);

    // Reset vars
    time_hr = time_mn = time_sc = time_ms = 0;
  
    display.innerHTML = getTime();
}

function getTime(time_hr = 0, time_mn = 0, time_sc = 0, time_ms = 0) {
    return (time_hr < 10 ? "0" + time_hr : time_hr) + ":" +
        (time_mn < 10 ? "0" + time_mn : time_mn) + ":" +
        (time_sc < 10 ? "0" + time_sc : time_sc) + "." +
        (time_ms < 10 ? "0" + time_ms / 100 : time_ms / 100);
}

function tick() {
    time_ms += 100;

    if (time_ms == 1000) {
        time_ms = 0;
        time_sc++;
    }

    if (time_sc == 60) {
        time_sc = 0;
        time_mn++;
    }

    if (time_mn == 60) {
        time_mn = 0;
        time_hr++;
    }

    if (time_hr == 12) {
        time_hr = 0;
        timerStop();
    }

    display.innerHTML = getTime(time_hr, time_mn, time_sc, time_ms);
}

function fixTime() {
    // Create element
    var item = document.createElement("li");
    item.innerHTML = getTime(time_hr, time_mn, time_sc, time_ms);
    item.setAttribute("class", "list-group-item");

    if (statList.childNodes.length == 5) {
        statList.removeChild(statList.childNodes[0]);
    }

    statList.appendChild(item);
}