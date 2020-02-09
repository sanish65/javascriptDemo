const video = document.getElementById('video')
var comm;
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
    const detectionsWithExpressions = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    // res= resizedDetections;
    const neutral = detections[0].expressions.neutral;
    const happy = detections[0].expressions.happy;
    const sad = detections[0].expressions.sad;
    const angry = detections[0].expressions.angry;
    const fearful = detections[0].expressions.fearful;
    const disgusted = detections[0].expressions.disgusted;
    const surprised = detections[0].expressions.surprised;
    const emo = [neutral,happy,sad,angry,fearful,disgusted,surprised];
     
    const largestValue = (values) => {
      let highest= 0 ;
      for(let i=0; i<values.length; i+=1){
        if (values[i] > highest)
        {
          highest = values[i];
        }
      }
      if(highest == emo[0])
      return "neutral";
      if(highest == emo[1])
      return "happy";
      if(highest == emo[2])
      return "sad";
      if(highest == emo[3])
      return "angry";
      if(highest == emo[4])
      return "fearful";
      if(highest == emo[5])
      return "disgusted";
      if(highest == emo[6])
      return "surprised";
         }
         comm = largestValue(emo);
    console.log(largestValue(emo));



  }, 500)
})


const btn = document.querySelector('.talk');
const btn2 = document.querySelector('.talk2');

// const content = document.querySelector('.content');

const SpeechRecognition2 = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition2 =new SpeechRecognition2();


recognition2.onstart = function()
{
    console.log('voice is activated');
};


recognition2.onresult = function(event)
{
    console.log(event);
    // const current = event.resultindex;
    // var comm = console.log(largestValue(emo));
    const transcript2 = "surprised";
    console.log(transcript2);
    speakIt2(transcript2);
};



btn2.addEventListener('click', () => {
  recognition2.start();

});





function speakIt2(mssg)
{
    const speech = new SpeechSynthesisUtterance();
    speech.text = 'invalid detections. Check your Emotions again. ';


    if(mssg.includes('happy'))
    {
       
        speech.text = "You look happy on your overall checkup evaluations";
    }

    else if(mssg.includes('neutral'))
    {
        speech.text = "you look neutral on your overal evaluations";

    }

    else if(mssg.includes('angry'))
    {
        speech.text = "you look angry on your overall evaluation. please leave your aggression ";

    }
    else if(mssg.includes('fearful'))
    {
        speech.text = 'your overall evaluation shows you look fearful. please controll your emotions';

    }
    else if(mssg.includes('surprised'))
    {
        speech.text = 'your overall evaluation shows you look surprised ';

    }
    else if(mssg.includes('sad'))
    {
        speech.text = 'you look sad on your overall evaluations. Click the button on left. I will play a song for you';
        play();


    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

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
    // var comm = console.log(largestValue(emo));
    const transcript = comm;
    console.log(transcript);
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
       
        speech.text = "hey. you look happy";
    }

    else if(mssg.includes('neutral'))
    {
        speech.text = "you look neutral";

    }

    else if(mssg.includes('angry'))
    {
        speech.text = "you look angry right now. Calm down";

    }
    else if(mssg.includes('fearful'))
    {
        speech.text = 'why you look fearful? ';

    }
    else if(mssg.includes('surprised'))
    {
        speech.text = 'why you look surprised? ';

    }
    else if(mssg.includes('sad'))
    {
        speech.text = 'you look sad. Click the button on left. I will play a song for you';
        play();


    }

    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

  function play(){
        var audio = new Audio('/abc.mp3');
        audio.play();
        };



//databaseeeeeeeeeeeeeeeeeeeee
var db=openDatabase("itemDB","1.0","itemDB",65535);
        $(function(){
        
        loadData();
        
             
        //to fetch
        var a,b,c=0;
        
        $("#list").click(function(){
        loadData();
        })
        
        function loadData(){
            $("#itemlist").children().remove();
          db.transaction(function(transaction){
            var sql="SELECT * FROM items ORDER BY id DESC";
            transaction.executeSql(sql,undefined,function(transaction,result){
             if(result.rows.length)
              for(var i=0;i<result.rows.length;i++){
              var row=result.rows.item(i);
              var item=row.item;
              var id=row.id;
            if( item=="neutral"){}
            
        }
      
        
        else{
          alert('No emotions');
        }
        
        
            },function(transaction,err){
              alert('No table found. Click on "Create Table" to create table now');
            })
          })
        }
        
        })


        // function res(){
        //   var db2=openDatabase("itemDB","1.0","itemDB",65535);
        // $(function(){
        
        // loadData();
        
        
        // $("#create").click(function(){
        // db.transaction(function(transaction){
        //   var sql="CREATE TABLE items "+
        //   "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
        //   "item VARCHAR(100) NOT NULL)";
        //   transaction.executeSql(sql,undefined,function(){
        //     alert("Table is created successfully");
        //   },function(){
        //     alert("Table is already being created");
        //   })
        // });
        // });
        // // to remove
        
        // $("#remove").click(function(){
        
        // if(!confirm("Are you sure to delete this table?","")) return;;
        // db.transaction(function(transaction){
        //   var sql="DROP TABLE items";
        //   transaction.executeSql(sql,undefined,function(){
        //     alert("Table is deleted successfully")
        //   },function(transaction,err){
        //     alert(err.message);
        //   })
        // });
        // });
        
        // //to insert
        
        // $("#insert").click(function(){
        // // var item=$("#item").val();
        //  var item=comm;
        // // var qty=$("#quantity").val();
        // db.transaction(function(transaction){
        // var sql="INSERT INTO items(item) VALUES(?)";
        // transaction.executeSql(sql,[item],function(){
        //   alert("New emotion is added successfully");
        // },function(transaction,err){
        //   alert(err.message);
        // })
        // })
        
        // })
        
        
        // //to fetch
        
        // $("#list").click(function(){
        // loadData();
        // })
        
        // function loadData(){
        //     $("#itemlist").children().remove();
        //   db.transaction(function(transaction){
        //     var sql="SELECT * FROM items ORDER BY id DESC";
        //     transaction.executeSql(sql,undefined,function(transaction,result){
        // if(result.rows.length){
        
        // for(var i=0;i<result.rows.length;i++){
        //   var row=result.rows.item(i);
        //   var item=row.item;
        //   var id=row.id;
        //   // var quantity=row.quantity;
        //   $("#itemlist").append('<tr><td>'+id+'</td><td>'+item+'</td></tr>');
        // }
        // }else{
        //   $("#itemlist").append('<tr><td colspan="3" align="center">No Item Found</td></tr>');
        // }
        
        
        //     },function(transaction,err){
        //       alert('No table found. Click on "Create Table" to create table now');
        //     })
        //   })
        // }
        
        // })


        // }
    