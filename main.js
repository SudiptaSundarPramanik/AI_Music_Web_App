song1="";
song2="";

song1status="";
song2status="";

leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

scoreLeftWrist=0;
scoreRightWrist=0;

function preload(){
    song1=loadSound("we are.mp3");
    song2=loadSound("dreams.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("Model is Loaded!!🥳🥳");
}

function gotPoses(results){
    if(results.length>0){

        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+" Left Wrist Y = "+leftWristY);

        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = "+scoreRightWrist);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristX+" Right Wrist Y = "+rightWristY);
    }
}

function draw(){

    image(video,0,0,600,500);

    song1status=song1.isPlaying();

    song2status=song2.isPlaying();

    fill("#FF0000");

    stroke("#FF0000");

    if(scoreLeftWrist>0.2){

        circle(leftWristX,leftWristY,20);

        song2.stop();

        if(song1status==false){

            song1.play();

            document.getElementById("song_name").innerHTML="We Are song";
        }
    }

        if(scoreRightWrist>0.2){

            circle(rightWristX,rightWristY,20);

            song1.stop();

            if(song2status==false){

                song2.play();

                document.getElementById("song_name").innerHTML="Dreams song";
            }
        }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop(){
    song.stop();
}