Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';

    });
}

console.log("ml5 version using "+ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ZxKRVDpA2/model.json',modelLoaded);

function modelLoaded(){
    console.log("model is loaded");
}

prediction_1="";
prediction_2="";

function speak(){
    var synth= window.speechSynthesis;
    speakdata_1="The first prediction is "+prediction_1;
    speakdata_2=" and the second prediction is "+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speakdata_1+speakdata_2);
    synth.speak(utterThis);
}

function check(){
    img= document.getElementById("captured_image");
    classifier.classify(img,gotResult);

}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction_1= results[0].label;
        prediction_2= results[1].label;
        document.getElementById("result_emotion_name").innerHTML=prediction_1;
        document.getElementById("result_emotion_name2").innerHTML=prediction_2;
        speak();
        
        if (prediction_1 == "happy"){
            document.getElementById("update_emoji").innerHTML="&#128522";
        }
         if (prediction_1 == "sad"){
            document.getElementById("update_emoji").innerHTML="&#128532";
        }
        if (prediction_1 == "angry"){
            document.getElementById("update_emoji").innerHTML="&#128548";
        }
        if (prediction_2 == "happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522";
        }
        if (prediction_2 == "sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532";
        }
        if (prediction_2 == "angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548";
        }
    }
}