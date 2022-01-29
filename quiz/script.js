let questionsCount = questions.length
let actualQuestion = 0
let points = 0

let progressJump = 100/questionsCount
function progress(){
  document.querySelector('.progress--bar').style.width = `${Math.floor(progressJump*(actualQuestion))}%`
}

function createQuiz(){
  document.querySelector('.questionArea').style.display = 'block'

  let optAdd = `<div class="question">${questions[actualQuestion].question}</div>`
  
  for (let i in questions[actualQuestion].options) {
    optAdd += `
    <div class="option" data-answer="${i}">
        <span>${+i+1}</span>
        ${questions[actualQuestion].options[i]}
    </div>
    `
  }
  document.querySelector('.questionArea').innerHTML = optAdd
  let quizQuests = document.querySelectorAll('.option')
  quizQuests.forEach(e => {
    e.addEventListener('click', ()=>{
      let correctAnswer = questions[actualQuestion].answer
      if (e.getAttribute('data-answer') == correctAnswer){
        points++
        e.style.border = '2px solid #080'
      } else {
        e.style.border = '2px solid #800'
      }
      setTimeout(()=>{
        next()
      },500)
    })
  })
}

function createScore(){
  document.querySelector('.progress--bar').style.width = '100%'
  document.querySelector('.questionArea').style.display = 'none'
  document.querySelector('.scoreArea').style.display = 'block'
  let percentage = (points/questionsCount)*100

  if(percentage>=60){
    document.querySelector('.scorePct').style.color = '#080'
    document.querySelector('.scoreText1').innerHTML = 'Parabéns'
  } else {
    document.querySelector('.scorePct').style.color = '#800'
    document.querySelector('.scoreText1').innerHTML = 'Da pra Melhorar'
  }

  document.querySelector('.scorePct').innerHTML = `Acertou ${percentage.toFixed(0)}%`
  document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questionsCount} questões e acertou ${points}.`
}

function next(){
  actualQuestion ++
  if (actualQuestion < questionsCount){
    createQuiz()
    progress()
  } else {
    createScore()
  }
}

createQuiz()