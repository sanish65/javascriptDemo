const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    // res= resizedDetections;
    // console.log(result);

  }, 500)
})


const btn = document.querySelector('.talk');
const content = document.querySelector('.content');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition =new SpeechRecognition();



recognition.onstart = function()
{
    console.log('voice is activated');
};





recognition.onresult = function(event)
{
    console.log(event);
    // const current = event.resultindex;
    const transcript = "sad";
    speakIt(transcript);
};






btn.addEventListener('click', () => {
    recognition.start();

});


function speakIt(mssg)
{
    const speech = new SpeechSynthesisUtterance();
    speech.text = 'cant tell your emotions. Please express openly';


    if(mssg.includes('happy'))
    {
       
        speech.text = "you look happy right now";
    }

    else if(mssg.includes('neutral'))
    {
        speech.text = "you look neutral right now";

    }

    else if(mssg.includes('angry'))
    {
        speech.text = "you look angry right now.calm down";

    }
    else if(mssg.includes('surprised'))
    {
        speech.text = 'you look surprised ';

    }
    else if(mssg.includes('sad'))
    {
        speech.text = 'you look sad. Click the button on left. I will play a song for you';

    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

