let hrs, mins, ext, alarmOn = false;
const displayAlarm = document.getElementById('displayAlarm');
const body = document.getElementsByTagName('body')[0];
const btns = document.getElementsByClassName('btns')[0];
let audio = document.getElementById("audio");

const div = document.createElement('div');
div.setAttribute('id','listAlarms');
btns.appendChild(div);

// Add zero for single digits
function addZero(time) {
    time = time.toString();
    return time.length < 2 ? "0" + time : time;
}
// Style background image
function bgStyle() {
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
}
// Pause alarm
function pauseAlarm() {
    audio.pause();
    audio.currentTime = 0;
    alarmOn = false;
}
// Stop alarm
function stopAlarm() {
    audio.pause();
    audio.currentTime = 0;
    hrs = '';
    mins = '';
    alarmOn = false;
    // document.getElementById('hrs').value = '';
    // document.getElementById('mins').value = '';
}

alarm();
setInterval(alarm, 1000);
function alarm() {
    let date = new Date();
    displayAlarm.innerHTML = formatTime(date);

    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let amOrPm = hours >= 12 ? "PM" : "AM";

        // Convert to 12 hour format
        hours = (hours % 12) || 12;

        // Add zero before single digits
        hours = addZero(hours);
        minutes = addZero(minutes);
        seconds = addZero(seconds);

        // Change background image
        if ((Number(hours) > 2 && Number(hours) <= 6) && amOrPm == "AM") {
            bgStyle();
            body.style.backgroundImage = "url('./assets/e-morning.jpg')";
        }
        else if ((Number(hours) > 6 && Number(hours) < 12) && amOrPm == "AM") {
            bgStyle();
            body.style.backgroundImage = "url('./assets/morning.jpg')";
        }
        else if ((Number(hours) <= 12 && Number(hours) < 4) && amOrPm == "PM") {
            bgStyle();
            body.style.backgroundImage = "url('./assets/afternoon.jpg')";
        }
        else if ((Number(hours) >= 4 && Number(hours) <= 6) && amOrPm == "PM") {
            bgStyle();
            body.style.backgroundImage = "url('./assets/evening.jpeg')";
            displayAlarm.style.color = "#6666cc";
        }
        else if ((Number(hours) > 6 && amOrPm == "PM") || (Number(hours) <= 2 && amOrPm == "AM") || (Number(hours) == 12 && amOrPm == "AM")) {
            bgStyle();
            displayAlarm.style.color = "#fff2e6";
            body.style.backgroundImage = "url('./assets/night.jpeg')";
        }

        // Set alarm
        document.getElementById('set').onclick = function() {
            hrs = document.getElementById('hrs').value;
            mins = document.getElementById('mins').value;
            ext = document.getElementById("ext").value;
            alarmOn = true;
            hrs = Number(hrs);
            mins = Number(mins);
            document.getElementById('listAlarms').innerHTML += addZero(hrs) + " " + addZero(mins) + " " + ext + "<br />";
            if (hrs > 12 || mins > 59) {
                document.getElementById('hrs').value = '';
                document.getElementById('mins').value = '';
                alert("Re-enter the time.");
            }
            else if(hrs == 0 ) {
                document.getElementById('hrs').value = '';
                document.getElementById('mins').value = '';
                alert("No time selected");
            }
            document.getElementById('hrs').value = '';
            document.getElementById('mins').value = '';
        }

        // Snooze
        document.getElementById('snooze').onclick = function() {
            if (alarmOn) {
                pauseAlarm();
                mins += 5;
                hrs += Math.trunc(mins/60);
                hrs = (hrs % 12) || 12;
                mins = mins % 60;
                alarmOn = true;
                alert(`Snoozing until ${addZero(hrs)}:${addZero(mins)} ${ext}`);
            }
        }

        // Stop alarm
        document.getElementById('stop').onclick = function() {
            stopAlarm();
        }

        // Clear alarm log
        document.getElementById('clear').onclick = function() {
            document.getElementById('listAlarms').innerHTML = "";
        }

        // Play alarm sound
        if (hours == hrs && minutes == mins && amOrPm == ext && alarmOn) {
            audio.play();
            audio.onended = () => {
                stopAlarm();
            }
        }
        return `${hours}:${minutes}:${seconds} ${amOrPm}`;
    }
}
