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


    if(mssg.includes('How are you??'))
    {
        const finalText=
        greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    }
    
    else if(mssg.includes('what is the time'))
    {
        speech.text = 'It is '+new Date().getHours() + " " + new Date().getMinutes()+" right now";

    }
    else if(mssg.includes('hi there') || mssg.includes('Hello'))
    {
        speech.text = "hi. How can I help you";

    }
    else if(mssg.includes('what is the date'))
    {
        speech.text = 'It is '+new Date() + " " + new Date().getMinutes()+" right now";

    }
    else if(mssg.includes('what is your name') || mssg.includes('tell me about yourself'))
    {
        speech.text = 'I am JS. Your help partner. I help you get through your hard time';

    }
    // else if(mssg.includes('hello'))
    // {
    //     speech.text = 'HI. How can I help you';

    // }
    else if(mssg.includes('Check my emotion'))
    {
        location.href="face.html"
        speech.text = "Sure thing!";

    }
    else if(mssg.includes('I dont know what to do.'))
    {
        speech.text = 'Take a deep breathe, close your eyes and feel your breathing slowly. Compose your thoughts. Why dont you leave what you doing and take a walk.';

    }
    else if(mssg.inlcudes('I feel alone, I have no friends')){
        speech.text = 'you are an amazing human being, why dont you join a peer support group?'
    }
    else if(mssg.includes('I feel lost.')) {
    speech.text="I'll talk you through it. Tell me what happened. I'm listening"
    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

