// Funções que vão pegar os elementos no html pra mim.
const c = c => document.querySelector(c);
const cs = cs => document.querySelectorAll(cs);

// Pegando os elementos.
const buttonStart = c(".start_btn")
const buttonExit = c(".info_box .buttons .quit");
const buttonContinue = c(".info_box .buttons .restart");
const buttonNext = c("footer .next_btn");
const resultButtonQuit = c(".result_box .buttons .quit");
const resultButtonRestart = c(".result_box .buttons .restart");


const infoBox = c(".info_box");
const quizBox = c(".quiz_box");
const resultBox = c(".result_box");
const questionTitle = c(".que_text");
const questionOptionList = c(".option_list");
const totalQuestions = c(".total_que");
const timerSeconds = c(".timer .timer_sec");
const timerText = c(".timer .time_text");
const scoreText = c(".score_text");
const timeLine = c(".quiz_box header .time_line");


let indexQuestion = 0;
let indexQuestionCounter = 1;
let timerSecondsCounter = 15;
let timeLineSecondsCounter = 0;
let counter;
let counterLine;
let score = 0;


buttonStart.onclick = () => {
    infoBox.classList.add("activeInfo");
}

buttonExit.onclick = () => {
    infoBox.classList.remove("activeInfo");
}

buttonContinue.onclick = () => {
    quizBox.classList.add("activeQuiz");
    infoBox.classList.remove("activeInfo");

    showQuestions(indexQuestion);
    timerCounter();
    timerLine(counterLine)
}

buttonNext.onclick = () => {
    timerText.innerHTML = "Time Left";
    timerCounter();
    timerLine(counterLine)
    removeStyleBtnNext();
    if(indexQuestion < questions.length - 1) {
        indexQuestion++;
        indexQuestionCounter++;
        showQuestions(indexQuestion);
    }else {
        handleResult();
    }
}

resultButtonQuit.onclick = () => {
    window.location.reload();
}

resultButtonRestart.onclick = () => {
    restartQuiz();
}

function restartQuiz() {
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult")
    indexQuestion = 0;
    indexQuestionCounter = 1;
    timerSecondsCounter = 15;
    counter;
    score = 0;
    showQuestions(indexQuestion);
}

function handleResult() {
    let lengthQuestions = questions.length;
    let textResult = `<span> and sorry, You got only<p>${score}</p>out of<p>${lengthQuestions}</p></span>`;
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult")
    scoreText.innerHTML = textResult;
}

function showQuestions(indexQuestion) {
    questionsCounter();
    let titleQuestion = `
    
        <div class="que_text">
            <span>${questions[indexQuestion].question}</span> 
        </div>
    
    `
    let optionsTag = 
    
    `
        <div class="option">
            <span>${questions[indexQuestion].options[0]}</span>
        </div> 

        <div class="option">
            <span>${questions[indexQuestion].options[1]}</span>
        </div>

        <div class="option">
            <span>${questions[indexQuestion].options[2]}</span>
        </div>

        <div class="option">
            <span>${questions[indexQuestion].options[3]}</span>
        </div>
    `
    questionOptionList.innerHTML = optionsTag
    questionTitle.innerHTML = titleQuestion;
    
    let allOptions = questionOptionList.querySelectorAll(".option");
    for(let option of allOptions) {
        option.setAttribute("onclick", "select(this)");
    }
}

function select(select) {
    clearInterval(counter)
    addStyleBtnNext();
    let correctQuestion = questions[indexQuestion].answer;
    let allOptions = questionOptionList.querySelectorAll(".option");
    let iconCorrect = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
    let iconIncorrect = `<div class="icon cross"><i class="fas fa-times"></i></div>`
    for(option of allOptions) {
        option.classList.add("disabled")
    }
    if(select.innerText == correctQuestion) {
        score++;
        select.classList.add("correct");                
        select.insertAdjacentHTML("beforeend", iconCorrect);
    }else {
        for(option of allOptions) {
            if(option.innerText == correctQuestion) {
                option.classList.add("correct");
                option.insertAdjacentHTML("beforeend", iconCorrect);
            }
        }
        select.classList.add("incorrect");                
        select.insertAdjacentHTML("beforeend", iconIncorrect);
    }
}

function resultCorrect() {
    let allOptions = cs(".option_list .option");
    let correctQuestion = questions[indexQuestion].answer;
    let iconCorrect = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
    let iconIncorrect = `<div class="icon cross"><i class="fas fa-times"></i></div>`
     /*
    for(option of allOptions) {
        if(option.innerText == questions[indexQuestion].answer) {
            option.classList.add("correct");
        }
    }

    for(option of allOptions) {
        console.log("Ola mundo!")
    } */

    for(option of allOptions) {
        option.classList.add("disabled")
        if(option.innerText == correctQuestion) {
            option.classList.add("correct");                
            option.insertAdjacentHTML("beforeend", iconCorrect);
        }else {
            option.classList.add("incorrect");
            option.insertAdjacentHTML("beforeend", iconIncorrect);
        } 
    }
    addStyleBtnNext();
    
}

function timerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time = "px";
    }
    if(time > 549) {
        clearInterval(counterLine);
    }
}


function timerCounter() {
    timerSecondsCounter = 16;
    counter = setInterval(timer, 1000)
    function timer() {
        timerSecondsCounter--;
        timerSeconds.innerHTML = timerSecondsCounter;

        if(timerSecondsCounter < 10) {
            timerSeconds.innerHTML = `0${timerSecondsCounter}`;
        }
        if(timerSecondsCounter == 0) {
            clearInterval(counter);
            timerText.innerHTML = "Time Out!";
            resultCorrect();
        }
    }
}

function questionsCounter() {
    let questionText = `<span><p>${indexQuestionCounter}</p>Of<p>${questions.length}</p>Questions</span> `
    totalQuestions.innerHTML = questionText;
}

function addStyleBtnNext() {
    buttonNext.style.display = "block"
}

function removeStyleBtnNext() {
    buttonNext.style.display = "none";
}