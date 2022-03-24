import './styles/main.scss';
import './styles/responsive.scss';

//Checking if user has a key in localStorage for a rest timer
if (localStorage.getItem('resTimer') != null) {
    var restTimer = localStorage.getItem('resTimer');
    if (document.querySelector('#res-time') != null) {
        document.querySelector('#res-time').value =
            localStorage.getItem('resTimer');
    }
}
//If not, set a default value and then storage this value.
else {
    var restTimer = 5;
    localStorage.setItem('resTimer', restTimer);
}

//The same but for a pomodoro timer
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

//Some variables
var minutesCount = 0;
var showMinutes = '';
var showSeconds = '';
var seconds = 0;
var showTime = '';
var stop = false;
var start = false;
const url = document.location.href;
const alarm = document.querySelector('#alarm');

//Function to start the timer counter
function startTimer() {
    //The timer variable use setInterval method, wich calls a generic function every 1000ms.
    //This generic function decreases 1 in a seconds counter variable. When this counter comes to 0
    //decreases 1 in a minutes counter variable. The result of this is updated every second on the user's screen.
    //When the times runs out, an alarm sounds.
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

        document.querySelector('#clock').innerHTML = showTime;
    }, 10);
}

//Function to reset the timer
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
        document.querySelector('#clock').innerHTML = showMinutes + ':00';
    }
}

//Just checking if the button is on screen
if (document.querySelector('#changeBtn') != null) {
    //This button storage the changed vlaues
    document.querySelector('#changeBtn').onclick = function(event) {
        localStorage.setItem('pomTimer', document.querySelector('#pom-time').value);
        localStorage.setItem('resTimer', document.querySelector('#res-time').value);
        alert('Valores alterados com sucesso!');
        event.preventDefault();
    };
}
//Checking if start button is on the screen
if (document.querySelector('#startBtn') != null) {
    //Start button function to call the start timer counter
    document.querySelector('#startBtn').onclick = function() {
        if (!start) {
            startTimer();
            start = true;
            stop = false;
        } else if (stop) {
            stop = false;
            startTimer();
        }
    };

    //Reset button to reset the timer counter
    document.querySelector('#resetBtn').onclick = function() {
        resetTimer();
    };

    //Stop button to stop the timer counter
    document.querySelector('#stopBtn').onclick = function() {
        stop = true;
        alarm.pause();
        alarm.currentTime = 0;
    };

    //When the alarm sounds, the user can just click on the screen to stop it.
    window.onclick = function() {
        alarm.pause();
        alarm.currentTime = 0;
    };
}

//When the application is running, the resetTimer is called to show the timer to the user.
window.onload = resetTimer;