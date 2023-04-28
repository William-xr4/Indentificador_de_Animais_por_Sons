var cachorro=0;
var gato=0;
var lobo=0;
var backgroundnoise=0;
var classifier;

function Start_Classification(){
    navigator.mediaDevices.getUserMedia({audio: true});
    classifier=ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/oRXD67dxf/model.json", {probabilityThreshold:0.7}, modelLoaded);
}
function modelLoaded(){
    classifier.classify(gotResults);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        var vermelho=Math.floor(Math.random()*255)+1;
        var verde=Math.floor(Math.random()*255)+1;
        var azul=Math.floor(Math.random()*255)+1;
        var cor="rgb("+vermelho+", "+verde+", "+azul+")";

        document.getElementById("h4").innerHTML="Posso ouvir o som de: "+results[0].label;
        document.getElementById("h3").innerHTML="Gato detectado: "+gato+", cachorro detectado: "+cachorro+", lobo detectado: "+lobo+", backgroundnoise detectado: "+backgroundnoise;
        document.getElementById("h4").style.color=cor;
        document.getElementById("h3").style.color=cor;

        var img=document.getElementById("imagem");

        if(results[0].label=="latido"){
            img.src="cachorro.jpeg";
            cachorro=cachorro+1;
        }
        else if(results[0].label=="miado"){
            img.src="gato.jpeg";
            gato=gato+1;
        }
        else if(results[0].label=="uivo"){
            img.src="lobo.webp";
            lobo=lobo+1;
        }
        else{
            img.src="Orelha.png";
            backgroundnoise=backgroundnoise+1;
        }
    }
}