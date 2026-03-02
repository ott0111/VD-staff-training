let currentQuestion = 0
let score = 0
let username = ""

const startBtn = document.getElementById("startQuizBtn")

if(startBtn){

startBtn.onclick = () => {

username = document.getElementById("usernameInput").value.trim()

if(!username){
alert("Enter your Discord username first.")
return
}

document.getElementById("usernameBox").style.display = "none"
document.getElementById("quizArea").style.display = "block"

document.getElementById("totalQ").innerText = questions.length

loadQuestion()

}

}

function loadQuestion(){

let q = questions[currentQuestion]

document.getElementById("currentQ").innerText = currentQuestion + 1
document.getElementById("questionText").innerText = q.question

let answersContainer = document.getElementById("answersContainer")

answersContainer.innerHTML = ""

q.answers.forEach((answer,index)=>{

let btn = document.createElement("button")

btn.className = "answer-btn"
btn.innerText = answer

btn.onclick = () => selectAnswer(index)

answersContainer.appendChild(btn)

})

}

function selectAnswer(index){

let q = questions[currentQuestion]

if(index === q.correct){
score++
}

currentQuestion++

if(currentQuestion < questions.length){
loadQuestion()
}
else{
finishQuiz()
}

}

async function finishQuiz(){

localStorage.setItem("voidScore",score)
localStorage.setItem("voidUser",username)

await supabaseClient
.from("quiz_results")
.insert([
{
username: username,
score: score,
total: questions.length
}
])

window.location.href = "success.html"

}
