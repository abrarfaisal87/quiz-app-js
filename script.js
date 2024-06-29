const question = [
    {
        question:"Have you ever had feelings for a same-gender close friend?",
        answers:[
            {text : 'I think so. That’s why I’m taking this quiz.',correct:false},
            {text : 'Wait, what’s the difference between friendship and a crush.',correct:false},
            {text : 'Don’t think so, but we’re so close people joke that we’re dating.',correct:false},
            {text : 'Nope. We’re just friends.',correct:true},
        ]
    },
    {
        question:"Have you ever kissed someone or wanted to kiss someone of the same gender?",
        answers:[
            {text : 'Definitely, and it was great.',correct:false},
            {text : 'I haven’t done it, but I want to try it.',correct:false},
            {text : 'Yeah, and I’m not sure how I felt about it.',correct:false},
            {text : 'Nope. Not interested.',correct:true},
        ]
    },
    {
        question:"Has anyone ever asked you if you were gay?",
        answers:[
            {text : 'People pretty much assume that about me all the time.',correct:false},
            {text : 'I’ve been asked that once or twice.',correct:false},
            {text : 'No one has asked directly if I’m gay, but I wouldn’t be surprised if they did ask.',correct:false},
            {text : 'Never. People assume I’m straight.',correct:true},
        ]
    },
    {
        question:"How would you feel about identifying as gay?",
        answers:[
            {text : 'Yeah, that feels right.',correct:false},
            {text : 'It honestly makes me a little nervous, but also kinda fits.',correct:false},
            {text : 'I’m not sure how I feel.',correct:false},
            {text : 'No, I really don’t think that’s me.',correct:true},
        ]
    },
    {
        question:"Have you ever felt attracted to someone of the same gender?",
        answers:[
            {text : 'Yes.',correct:false},
            {text : 'Yeah, but everyone has, right?',correct:false},
            {text : 'People of the same gender are just objectively more attractive.',correct:false},
            {text : 'Nope.',correct:true},
        ]
    },
    {
        question:"How do you feel about dating someone of the opposite gender?",
        answers:[
            {text : 'I’m not interested. That would feel like a chore.',correct:false},
            {text : 'I wouldn’t mind, and I’ve either wanted to do it or have done it.',correct:true},
            {text : 'Maybe, but I’m not really interested in anyone.',correct:false},
            {text : 'I’d definitely date (or have dated) someone of the opposite gender.',correct:true},
        ]
    },
    {
        question:"Do you ever fantasize about being with someone of the same gender?",
        answers:[
            {text : 'Yeah. Pretty often.',correct:false},
            {text : 'Sometimes.',correct:false},
            {text : 'Yes, but I’m not sure I’d actually end up with someone of the same gender.',correct:false},
            {text : 'No.',correct:true},
        ]
    },
    {
        question:"Would you be comfortable using an LGBTQ+ dating app?",
        answers:[
            {text : 'Absolutely! I already have one downloaded.',correct:false},
            {text : 'I’m open to giving one a try.',correct:false},
            {text : 'Not really, but I won’t rule it out completely.',correct:false},
            {text : 'No. That makes me uncomfortable.',correct:true},
        ]
    },
]

const questionElement = document.getElementById('question')
const answerBtn = document.getElementById('answer-button')
const nextBtn = document.getElementById('next-btn')

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextBtn.innerHTML = 'Next';
    showQuestions();
}

//resetState removes next btn and removes all the elements in the answer-button div
function resetState(){
    nextBtn.style.display='none';
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}


function showQuestions(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML =  questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        let button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add('btn')
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',(e)=>{
          const selectedBtn = e.target;
          const isCorrect =  selectedBtn.dataset.correct === 'true';
          if(isCorrect) {
            selectedBtn.classList.add('correct');
            score++;
            }
          else selectedBtn.classList.add('incorrect');

          Array.from(answerBtn.children).forEach(button =>{
            if(button.dataset.correct === 'true'){
                button.classList.add('correct')
            }
            button.disabled = true;
          });
          nextBtn.style.display='block';
        })
    })
}


function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestions();
    }
    else{
        showScore();
    }
}


function showScore(){
    resetState();
    if(score === question.length){
           const image = document.createElement("img")
           image.src = 'chad.jpg'
           image.classList.add('img')
           questionElement.innerHTML = "Congratulations. You are straight."
           questionElement.appendChild(image);
    }
    else {
        questionElement.innerHTML = "You have problems, Go see a doctor!"
        const image1 = document.createElement("img");
           image1.src = "uargeh.jpg";
           image1.classList.add('img')
           questionElement.appendChild(image1);
    }
    // questionElement.innerHTML = `You have scored ${score} out of ${question.length} !`;
    nextBtn.innerHTML = "Test Again";
    nextBtn.style.display = 'block';
}



nextBtn.addEventListener('click',()=>{
    if(currentQuestionIndex < question.length){
        handleNextBtn();
    }
    else {
        startQuiz();
    }
})
startQuiz();