document.addEventListener("DOMContentLoaded", function(){
    //click start 
    const overlay = document.getElementById("start-overlay");
    const startBtn = document.getElementById("click-button");
    //click function start
    startBtn.addEventListener("click", function(){
        document.body.style.background = "#f2d8ff";  

        overlay.style.opacity = "0";
        overlay.style.transition = "0.5s";

        setTimeout(function(){
            overlay.style.display = "none";
        },500);

    });

});

//balance ball 
window.onload = function() {

    var bar = document.querySelector('.loading');    
    var ball = document.getElementById('ball');       
    var container = document.getElementById('animation-container'); 
    var progressFill = document.getElementById('progress-fill'); 
 
    var containerWidth = 400;      
    var containerHeight = 120;      
    var barLength = 300;           
    var barHalf = barLength / 2;     
    var barHeight = 6;             
    var ballRadius = 10;            
    var centerX = containerWidth / 2;   
    var centerY = containerHeight / 2;  
    var limit = barHalf - ballRadius;   

    //physics Variables
    var angle = 0;          
    var ballPos = 0;       
    var ballVel = 0;      

    var g = 0.18;           
    var friction = 0.97;  
    var maxAngle = 0.5;   

    var targetAngle = 0;    
    var animationId = null;

    // Loading variables
    var loadingProgress = 0;  
    var targetTimeInSeconds = 15; 
    var loadingSpeed = 100 / (targetTimeInSeconds * 60); 
    var balanceThreshold = 20; 
    var isComplete = false;    

    function onMouseMove(e) {
        var mouseX = e.clientX; 
        var windowWidth = window.innerWidth; 
        var normalized = (mouseX / windowWidth) * 2 - 1; 
        targetAngle = normalized * maxAngle; 
    }

    function resetBall() {
        ballPos = 0;          
        ballVel = 0;         
        targetAngle = 0;    
        angle = 0;
        bar.style.transform = 'translate(-50%, -50%) rotate(0rad)'; 
        updateVisual();
    }

    function updateVisual() {
        bar.style.transform = 'translate(-50%, -50%) rotate(' + angle + 'rad)';

        var offsetX = ballPos * Math.cos(angle); 
        var offsetY = ballPos * Math.sin(angle);
        
        var normalOffset = ballRadius + barHeight / 2; 
        var normX = -Math.sin(angle) * normalOffset;
        var normY = -Math.cos(angle) * normalOffset;   

        var ballX = centerX + offsetX + normX;
        var ballY = centerY + offsetY + normY;

        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';
    }

    function updateLoading() {
        if (isComplete) return; 
        
        if (Math.abs(ballPos) < balanceThreshold) {
            loadingProgress = Math.min(loadingProgress + loadingSpeed, 100);
        } else {
            loadingProgress = Math.max(loadingProgress - loadingSpeed, 0);
        }
        
        progressFill.style.width = loadingProgress + '%';
        
        if (loadingProgress >= 100) {
            isComplete = true;
            progressFill.style.backgroundColor = "#4CAF50"; 
            
            var message = document.createElement('div');
            message.style.fontSize = "24px";
            message.style.marginTop = "20px";
            message.style.color = "#4CAF50";
            document.querySelector('section').appendChild(message);
        }
    }

    function updatePhysics() {
        var now = performance.now(); 
        angle = angle + (targetAngle - angle) * 0.9; 

        var acceleration = -g * Math.sin(angle);
        ballVel = ballVel + acceleration; 
        ballVel = ballVel * friction; 
        ballPos = ballPos + ballVel; 

        if (ballPos > limit || ballPos < -limit) {
            resetBall();
        }

        updateVisual();
        updateLoading(); 
        animationId = requestAnimationFrame(updatePhysics);
    }

    bar.style.top = '50%';
    bar.style.left = '50%';
    bar.style.transform = 'translate(-50%, -50%) rotate(0rad)';

    window.addEventListener('mousemove', onMouseMove);
    resetBall();

    if (animationId != null) {
        cancelAnimationFrame(animationId);
    }
    animationId = requestAnimationFrame(updatePhysics); 
};
