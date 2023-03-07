const username = document.getElementById("username");
const saveScore = document.getElementById("saveScore");
const finalScore = document.getElementById("finalScore")
const newestScore = localStorage.getItem("newestScore");
const highScore= JSON.parse(localStorage.getItem("highScore")) || [];

finalScore.innerText = newestScore;

username.addEventListener("keyup", ()=>{
    saveScore.disabled = !username.value; //if there is no name in input box, save button is unable to be clicked
})

saveHighScore = (e) => {
    e.preventDefault(); 

    //to save name and score
    const score = {
        score: newestScore,
        name: username.value
    };
    highScore.push(score); // to add new save data to the end of array
    highScore.sort((a,b)=> { //sort by the higher score
        return b.score - a.score;
    });
    highScore.splice(5); // top 5 score

    localStorage.setItem("highScore", JSON.stringify(highScore)); //to set the data of score in the local storage
    window.location.assign("../ranking/ranking.html"); // to show the results in ranking.html
}