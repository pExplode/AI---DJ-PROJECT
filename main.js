song1 = "";
song2 = "";
status1 = "";
status2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;

function setup() {
    canvas = createCanvas(450, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() 
{
    console.log("Model is initialized");
}

function preload()
{
    song1 = loadSound("fur_elise.mp3");
    song2 = loadSound("turkish_march.mp3");
}

function draw() {
    image(video, 0, 0, 450, 400);
    fill("red");
    stroke("black")
    status1 = song1.isPlaying();
    status2 = song2.isPlaying();

    if(leftWristScore > 0.2)
    {
    circle(leftWristX-125,leftWristY-50,20);
    song2.stop();

    if(status1 == false)
    {
        song1.play();
        song1.setVolume(1);
        song1.rate(1);
        document.getElementById("song_name").innerHTML = "Song Name = 'Fur Elise'";
    }
    }
    
    if(rightWristScore > 0.2)
    {
    circle(rightWristX-50, rightWristY-50, 20);
    song1.stop();

    if(status2 == false)
    {
        song2.play();
        song2.setVolume(1);
        song2.rate(1);
        document.getElementById("song_name").innerHTML = "Song Name = 'Turkish March'";
    }
    }
    
}


function gotPoses(results) 
{
    if(results.length>0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = "+ leftWristX+" Left wrist Y = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X = "+rightWristX+" Right wrist Y = "+rightWristY);
        leftWristScore = results[0].pose.keypoints[9].score;
        console.log(leftWristScore);
        rightWristScore = results[0].pose.keypoints[10].score;
        console.log(rightWristScore);
    }
}