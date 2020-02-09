const btn = document.querySelector('.talk');
const content = document.querySelector('.content');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition =new SpeechRecognition();



const greetings = ['going good,what about you',
                    'i am good',
                    'hey,there.going great'];

// const time = ['time is 8 AM',
//                 'it is night',
//                 'it is day'];


recognition.onstart = function()
{
    console.log('voice is activated');
};





recognition.onresult = function(event)
{
    console.log(event);
    // const current = event.resultindex;
    const transcript = event.results[0][0].transcript;
    content.textContent = transcript;
    speakIt(transcript);
};






btn.addEventListener('click', () => {
    recognition.start();

});


function speakIt(mssg)
{
    const speech = new SpeechSynthesisUtterance();
    speech.text = 'I dont know what you said';


    if(mssg.includes('how are you'))
    {
        const finalText=
        greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    }

    else if(mssg.includes('what is the time'))
    {
        speech.text = 'It is '+new Date().getHours() + " " + new Date().getMinutes()+" right now";

    }
    else if(mssg.includes('hi there'))
    {
        speech.text = "hey. How can i help you";

    }
    else if(mssg.includes('what is the date'))
    {
        speech.text = 'It is '+new Date() + " " + new Date().getMinutes()+" right now";

    }
    else if(mssg.includes('what is your name') || mssg.includes('who are you'))
    {
        speech.text = 'i am JS. Your help partner';

    }
    else if(mssg.includes('hello'))
    {
        speech.text = 'hi';

    }
    else if(mssg.includes('check'))
    {
    speech.text = "i am detecting your face now. please click on the button";
        a="<button>click me</button>";
        document.write(a.link("face.html"));
        // // document.getElementById('btn1').enabled=true;

    }
    else if(mssg.includes('help me'))
    {
        speech.text = 'How can i help you? I can check your emotion';

    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

