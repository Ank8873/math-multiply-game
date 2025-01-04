let playing=false;
let score;
let timeremaining;
let action;
let correctanswer;

//if we click on start button
document.getElementById("startreset").onclick=function()
{
    //if we are playing
    if(playing==true)
    {
        location.reload();//reload the page
    }
    else
    {
        //if we are not playing
        //change the mode of playing
        playing=true;
        score=0;
        document.getElementById("scorevalue").innerHTML=score;
        //to show the countdown box
        show("timeremaining");
        timeremaining=60;
        document.getElementById("trvalue").innerHTML=timeremaining;
        //hide game over
        hide("gameover");
        //to change button to reset game
        document.getElementById("startreset").innerHTML="Reset Game";
        //show the countdown box
        showCountDown();
        //generate Question & Answer
        generateQA();

    }
}
//show function and hide function
function show(id)
{
    document.getElementById(id).style.display="block";
}
function hide(id)
{
    document.getElementById(id).style.display="none";
}
//function for countdown and stopCountDown
function showCountDown()
{
    action=setInterval(function(){
        timeremaining--;
        document.getElementById("trvalue").innerHTML=timeremaining;
        if(timeremaining==0)
        {
            //game over;
            stopCountDown();
            show("gameover");
            document.getElementById("gameover").innerHTML=
            `<p>Game Over!</p>
            <p>Your Score is ${score}</p>
            `;
            hide("timeremaining");
            hide("correct");
            hide("incorrect");
            playing=false;
            document.getElementById("startreset").innerHTML="Start Game"
        }
    },1000);
}
function stopCountDown()
{
    clearInterval(action);
}
//function for generating Question & Answer
function generateQA()
{
    let x= 1+Math.floor(9*Math.random());
    let y=1+Math.floor(9*Math.random());
    correctanswer=x*y;
    document.getElementById("question").innerHTML=x +"x" +y;
    let correctposition=1+Math.round(3*Math.random());
    //fill the correct box
    document.getElementById("option"+correctposition).innerHTML=correctanswer;
    //fill wrong boxes
    var answer=[correctanswer];
    for(i=1;i<5;i++)
    {
        if(i!=correctposition)
        {
            let wronganswer;
            do
            {
                wronganswer=(1+Math.floor(9*Math.random())) *(1+Math.floor(9*Math.random()));
            }
            while(answer.indexOf(wronganswer)>-1);
            answer.push(wronganswer);
            document.getElementById("option" + i).innerHTML=wronganswer;
        }
    }
}
//if we click on answer box
for(i=1;i<5;i++)
    {
        document.getElementById('option' +i).onclick=function()
        {
            //if we are playing game
            if(playing==true)//yes
            {
                if(this.innerHTML==correctanswer)//we have clicked on that button on which the correct answer
                //then we have to increase the score by 1
                {
                    score++;
                document.getElementById('scorevalue').innerHTML=score;
                show('correct');
                hide('incorrect');
                setInterval(function()
                {
                    hide('correct');
                },1000)
                generateQA();
            }
            else
            {
                //if we have given the wrong answer
                show('incorrect');
                hide('correct');
                setInterval(function()
                {
                    hide('incorrect');
                },1000)
            }
        }
    }
}