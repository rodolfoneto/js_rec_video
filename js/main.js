let camera = document.querySelector("#camera");
let video = document.querySelector("#video")
let _console = document.querySelector("#console");

let camera_canvas = document.querySelector('#camera_canvas');
let camera_start_btn = document.querySelector('#start_camera');
let camera_stop_btn = document.querySelector('#stop_camera');

let flag_record_video = false;
let chunk = [];
window.onload = () => {
    if(navigator.mediaDevices) {
        const options = {mimetype: 'video/webm'}
        const constraint = { audio: true, video: true };

        let onSuccess = function(stream) {
            const mediaRecoder = new MediaRecorder(stream);
            mediaRecoder.start();
            camera_canvas.srcObject = stream;
            camera_start_btn.onclick = () => {
                chunk = new Array();
                flag_record_video = true;
                log('camera start');
            }

            camera_stop_btn.onclick = () => {
                flag_record_video = false;
                log('camera stop');
            }

            mediaRecoder.ondataavailable = function(e) {
                console.log((e.data && e.data.size > 0 && flag_record_video));
                if(e.data && e.data.size > 0 && flag_record_video) {
                    log('push chuck');
                    chunk.push(e.data);
                }
            }
        }

        let onError = function(err) {
            console.log(err);
        }

        navigator.mediaDevices.getUserMedia(constraint).then(onSuccess, onError);
    } else {
        console.log('getUserMedia not supported.');
    }
}

function log($arg) {
    _console.innerHTML += $arg + '<br \/>';
}