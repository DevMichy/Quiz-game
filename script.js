const questions = [
    {
        question: "Who are you?",
        answers: [
            {text: "a human", correct: true},
            {text: "a dog", correct: false},
            {text: "a cat", correct: false},
            {text: "a frog", correct: false}
        ]
    },
    {
        question: "What planet do you live in?",
        answers: [
            {text: "saturn", correct: false},
            {text: "venus", correct: false},
            {text: "earth", correct: true},
            {text: "mars", correct: false}
        ]
    },
    {
        question: "How is your blood like?",
        answers: [
            {text: "warm-blooded", correct: true},
            {text: "cold-blooded", correct: false},
            {text: "None of the above", correct: false},
            {text: "All of the above", correct: false}
        ]
    },
    {
        question: "How many people are involved in your conception?",
        answers: [
            {text: "5", correct: false},
            {text: "1", correct: false},
            {text: "8", correct: false},
            {text: "2", correct: true}
        ]
    },
    {
        question: "What keeps everything on the ground in your planet?",
        answers: [
            {text: "radio waves", correct: false},
            {text: "gravity", correct: true},
            {text: "the sun", correct: false},
            {text: "the planetary bodies", correct: false}
        ]
    }
];
const question = document.querySelector('.quiz-question');
const questionNumber = document.querySelector('.quiz-number');
const answerOptions = document.querySelector('.options');
const progressBar = document.querySelector('.progress');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const retakeBtn = document.querySelector('.retake');
const scoreBar = document.querySelector('.score');
const quiz = document.querySelector('.quiz');

let arrayNumber = 0;
let currentQuestion;
let score = 0;

nextBtn.addEventListener('click', () => {
    arrayNumber++;
    startQuiz();
})

prevBtn.addEventListener('click', () => {
    arrayNumber--;
    startQuiz();
})

retakeBtn.addEventListener('click', () => {
    arrayNumber = 0;
    score = 0;
    startQuiz();
    retakeBtn.style.display = 'none';
})

const resetOptions = () => {
    while(answerOptions.firstChild){
        answerOptions.removeChild(answerOptions.firstChild);
    }
}

const checkAnswer = e => {
    const selectedAnswer = e.target;
    const isCorrect = selectedAnswer.dataset.correct === "true";
    if(isCorrect){
        selectedAnswer.style.backgroundColor = 'green';
        score = score + 20;
    } else { 
        selectedAnswer.style.backgroundColor = 'red';
    }
    Array.from(answerOptions.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.style.backgroundColor = 'green';
        }
        button.disabled = true;
    });

    scoreBar.innerHTML = `Score: ${score}`;
}

const startQuiz = () => {
     if(arrayNumber === questions.length){
        quiz.innerHTML = `You scored ${score} out of 100!`;
        answerOptions.innerHTML = '';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        retakeBtn.style.display = "block";
    }

    currentQuestion = questions[arrayNumber];
    quiz.innerHTML = `
            <div class="quiz-number">${arrayNumber + 1}</div>
            <div class="quiz-question">${currentQuestion.question}</div>
            `;
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    scoreBar.innerHTML = `Score: ${score}`;
    progressBar.innerHTML = `${arrayNumber+1}/${questions.length}`;

    resetOptions();
    
    currentQuestion.answers.forEach(option => { 
        const button = document.createElement("button");
        button.innerHTML = option.text;
        button.classList.add('btn');
        answerOptions.appendChild(button);
        if(option.correct){
            button.dataset.correct = option.correct;
        }

        button.addEventListener('click', checkAnswer);
    })

    if (arrayNumber === (questions.length-1)){
        nextBtn.innerHTML = 'Submit';
    } else {
        nextBtn.innerHTML = 'Next';
    }
}

startQuiz();