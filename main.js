import './styles/main.scss';
import './styles/responsive.scss';

console.log(localStorage.getItem('resTimer'));

if (localStorage.getItem('resTimer') != null) {
    var restTimer = localStorage.getItem('resTimer');
    if (document.querySelector('#res-time') != null) {
        document.querySelector('#res-time').value =
            localStorage.getItem('resTimer');
    }
} else {
    var restTimer = 5;
    localStorage.setItem('resTimer', restTimer);
}

if (localStorage.getItem('pomTimer') != null) {
    var pomTimer = localStorage.getItem('pomTimer');
    if (document.querySelector('#pom-time') != null) {
        document.querySelector('#pom-time').value =
            localStorage.getItem('pomTimer');
    }
} else {
    var pomTimer = 30;
    localStorage.setItem('pomTimer', pomTimer);
}
var minutesCount = 0;
var showMinutes = '';
var showSeconds = '';
var seconds = 0;
var showTime = '';
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
            minutesCount--;
            seconds = 59;
        }

        if (minutesCount >= 0) {
            showMinutes = ('000' + minutesCount).slice(-2);
            showSeconds = ('000' + seconds).slice(-2);
            showTime = showMinutes + ':' + showSeconds;
        } else {
            showTime = '00:00';
            clearInterval(timer);
            alarm.play();
        }

        seconds--;

        document.getElementById('clock').innerHTML = showTime;
    }, 1000);
}

function resetTimer() {
    if (url == 'http://localhost:3000/pages/rest.html') {
        minutesCount = restTimer;
    } else {
        minutesCount = pomTimer;
    }
    stop = true;
    start = false;
    seconds = 0;
    showMinutes = ('000' + minutesCount).slice(-2);
    if (document.querySelector('#clock') != null) {
        document.getElementById('clock').innerHTML = showMinutes + ':00';
    }
}

if (document.querySelector('#changeBtn') != null) {
    document.querySelector('#changeBtn').onclick = function(event) {
        localStorage.setItem('pomTimer', document.querySelector('#pom-time').value);
        localStorage.setItem('resTimer', document.querySelector('#res-time').value);
        alert('Valores alterados com sucesso!');
        event.preventDefault();
    };
}

if (document.getElementById('startBtn') != null) {
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

    window.onclick = function() {
        alarm.pause();
        alarm.currentTime = 0;
    };
}

window.onload = resetTimer;