const question = document.getElementById("question");
const choices =Array.from(document.getElementsByClassName("choice-text")); // to make new array from #choiceText
const counterNo = document.getElementById("counter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false; //user can't answer before everything is loaded. 
let score = 0;
let counter = 0;
let availableQuestions = [];
let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res =>{
        return res.json();
    })
    .then(loadedQuestions =>{
        console.log(loadedQuestions.results);
        //to make questions array
        questions = loadedQuestions.results.map(loadedQuestion =>{
            const formattedQuestion = {
                question: loadedQuestion.question
            };
        //to make answer options
            //to make incorrect answers randomly
            const answerOptions = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1; //Math.floor = round down /
            //to add correct answer
            answerOptions.splice(
                formattedQuestion.answer -1, 0, loadedQuestion.correct_answer); 

                answerOptions.forEach((choice, index) => {
                    formattedQuestion["choice" + (index + 1)] = choice;
                })
                return formattedQuestion;
        });
        startGame();
    })
    .catch(err => {
        console.error(err);
    });

const correctPoints = 10; //when user gets the answer correct, 10 points are given
const maxNoQuestions = 5; //Maximum number of questions

//To start the Quiz
startGame = () => {
    counter = 0; 
    score = 0;
    availableQuestions = [...questions]; // copy all questions from questions array. ... means this array spreads out each of items and put them to a new array
    getNewQuestion();
};

//To go to next Question
getNewQuestion = () => {
    if(availableQuestions.length === 0 || counter >= maxNoQuestions){
        localStorage.setItem("newestScore", score);
        //go to the score and save page
        return window.location.assign("../result/result.html");
    }
    counter++; //counter will increase by 1
    //to make question counter
    counterNo.innerText = `${counter} / ${maxNoQuestions}`;
    //To get a question randomly
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);//to pick one question randomly from questions array
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;
    //to get choices
    choices.forEach(choice => {
        const number = choice.dataset["number"]; //to access to data attribute of choice.
        choice.innerHTML = currentQuestion["choice" + number]; //to get the text of choice
    });
    //to get new question 
    availableQuestions.splice(questionIndex, 1); //to remove one question that user already answered.
    acceptingAnswers = true;
}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers)return;

        acceptingAnswers = false;
        const selectedChoice = e.target; //e.target means the answer user selected
        const selectedAnswer = selectedChoice.dataset["number"]

        const correctOrIncorrect = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';//if selectedAnswer equals currentQuestion.answer, the value of the variable is ”correct".  

        //to get point when the answer is correct
        if(correctOrIncorrect === "correct"){
            incrementScore(correctPoints);
        }
        //to add the background color of the choice when user selected the answer
        selectedChoice.parentElement.classList.add(correctOrIncorrect) //add "correct" or "incorrect" in the class
        
        // to remove the background color of the choice
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(correctOrIncorrect) //remove "correct" or "incorrect" in the class
             //to get a new question
            getNewQuestion();
        }, 1000);
        console.log(correctOrIncorrect);
    });
});

//increment score
incrementScore = num => {
    score = score + num;
    scoreText.innerText = score;
};

