import './styles/main.scss';
import './styles/responsive.scss';

var restTimer = 5;
var pomTimer = 30;
var minutes_count = 0;
var show_minutes = '';
var show_seconds = '';
var seconds = 0;
var show_time = '';
var stop = false;
var start = false;
const url = document.location.href;
/* var alarm = document.getElementById('alarm'); */

function startTimer() {
    //Variável timer que utiliza a função setInterval, que chama uma função dentro de um intervalo de tempo em ms.
    //Neste caso, a função setInteval chama uma função genérica a cada 1000ms que diminui 1 segundo  do contador
    //de segundos. Quando este contador zera, diminui 1 no contador de minutos. A cada segunda o timer é atualizado
    //na tela do usuário. Quando o tempo expira, a função setInterval é interrompida pela chamada da função clearInterval().
    var timer = setInterval(function() {
        if (stop == true) {
            clearInterval(timer);
        }

        if (seconds < 0) {
            minutes_count--;
            seconds = 59;
        }

        if (minutes_count >= 0) {
            show_minutes = ('000' + minutes_count).slice(-2);
            show_seconds = ('000' + seconds).slice(-2);
            show_time = show_minutes + ':' + show_seconds;
        } else {
            show_time = '00:00';
            clearInterval(timer);
            alarm.play();
        }

        seconds--;

        document.getElementById('clock').innerHTML = show_time;
    }, 10);
}

function resetTimer() {
    if (url == 'http://localhost:3000/pages/rest.html') {
        minutes_count = restTimer;
    } else {
        minutes_count = pomTimer;
    }
    stop = true;
    start = false;
    seconds = 0;
    show_minutes = ('000' + minutes_count).slice(-2);
    document.getElementById('clock').innerHTML = show_minutes + ':00';
}

document.querySelector("#main-form").onclick = function (event) {
    event.preventDefault();
    console.log("dasdf");

    const setting = "30" // vai pegar do input
    localStorage.setItem("time", setting)
}

document.getElementById('startBtn').onclick = function() {
    if (!start) {
        startTimer();
        start = true;
        stop = false;
    } else if (stop) {
        stop = false;
        startTimer();
    }
};

document.getElementById('resetBtn').onclick = function() {
    resetTimer();
};

document.getElementById('stopBtn').onclick = function() {
    stop = true;
    alarm.pause();
    alarm.currentTime = 0;
};

window.onload = resetTimer;
window.onclick = function() {
    alarm.pause();
    alarm.currentTime = 0;
};
