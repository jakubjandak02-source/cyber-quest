<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🚀 Cyber Quest</title>
<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg,#020617,#1e3a8a,#0f172a);
  color: white;
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:100vh;
  overflow:hidden;
}

.game {
  width:90%;
  max-width:800px;
  background:rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  border-radius:25px;
  padding:30px;
  box-shadow:0 0 30px rgba(0,0,0,0.5);
  animation:fade 1s;
}

@keyframes fade {
  from {opacity:0; transform:translateY(20px);} 
  to {opacity:1; transform:translateY(0);} 
}

h1 {
  text-align:center;
  font-size:42px;
}

.score, .timer {
  text-align:center;
  font-size:20px;
  margin:10px 0;
}

.question {
  font-size:28px;
  margin:25px 0;
  text-align:center;
}

.option {
  width:100%;
  padding:16px;
  margin:10px 0;
  border:none;
  border-radius:15px;
  background:rgba(255,255,255,0.12);
  color:white;
  font-size:18px;
  cursor:pointer;
  transition:0.3s;
}

.option:hover {
  transform:scale(1.03);
  background:rgba(255,255,255,0.25);
}

.next {
  margin-top:20px;
  width:100%;
  padding:15px;
  border:none;
  border-radius:15px;
  background:#22c55e;
  color:white;
  font-size:20px;
  cursor:pointer;
  display:none;
}

.explanation {
  margin-top:20px;
  background:rgba(0,0,0,0.25);
  padding:15px;
  border-radius:15px;
  font-size:18px;
}

.badge {
  text-align:center;
  margin-top:15px;
  font-size:22px;
}

.progress {
  height:12px;
  background:rgba(255,255,255,0.1);
  border-radius:20px;
  overflow:hidden;
  margin-top:15px;
}

.progress-bar {
  height:100%;
  width:0%;
  background:#38bdf8;
  transition:0.5s;
}

.final {
  text-align:center;
  font-size:30px;
}
</style>
</head>
<body>

<div class="game">
  <h1>🚀 Cyber Quest</h1>

  <div class="score" id="score"></div>
  <div class="timer">⏱ Čas: <span id="time">15</span>s</div>

  <div class="progress">
    <div class="progress-bar" id="bar"></div>
  </div>

  <div class="question" id="question"></div>
  <div id="answers"></div>
  <div class="explanation" id="explanation"></div>
  <div class="badge" id="badge"></div>

  <button class="next" id="nextBtn">Další mise 🚀</button>
</div>

<audio id="correctSound">
  <source src="https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg">
</audio>

<audio id="wrongSound">
  <source src="https://actions.google.com/sounds/v1/cartoon/boing.ogg">
</audio>

<script>
const questions = [
{
q:'Co znamená zkratka CPU?',
a:['Central Processing Unit','Computer Personal Unit','Cyber Power Utility'],
correct:'Central Processing Unit',
exp:'CPU je mozek počítače 🧠'
},
{
q:'Které heslo je nejbezpečnější?',
a:['123456','heslo123','X7!kP9@qL'],
correct:'X7!kP9@qL',
exp:'Silné heslo obsahuje čísla, znaky i velká písmena 🔐'
},
{
q:'Co je phishing?',
a:['Hackerský útok','Grafická karta','Programovací jazyk'],
correct:'Hackerský útok',
exp:'Phishing se snaží ukrást tvoje údaje 🎣'
},
{
q:'K čemu slouží firewall?',
a:['Ochraně sítě','Těžbě krypta','Tvorbě videí'],
correct:'Ochraně sítě',
exp:'Firewall blokuje nebezpečná spojení 🛡️'
},
{
q:'Která firma vytvořila Windows?',
a:['Apple','Microsoft','Google'],
correct:'Microsoft',
exp:'Windows vytvořil Microsoft 💻'
}
];

let current = 0;
let score = 0;
let time = 15;
let timer;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const explanationEl = document.getElementById('explanation');
const scoreEl = document.getElementById('score');
const badgeEl = document.getElementById('badge');
const nextBtn = document.getElementById('nextBtn');
const timeEl = document.getElementById('time');
const bar = document.getElementById('bar');

function startTimer(){
  clearInterval(timer);
  time = 15;
  timeEl.innerText = time;

  timer = setInterval(()=>{
    time--;
    timeEl.innerText = time;

    if(time <= 0){
      clearInterval(timer);
      lockAnswers();
      explanationEl.innerHTML = '⏰ Čas vypršel!';
      nextBtn.style.display='block';
    }
  },1000);
}

function lockAnswers(){
  document.querySelectorAll('.option').forEach(btn=>btn.disabled=true);
}

function updateProgress(){
  let percent = ((current)/questions.length)*100;
  bar.style.width = percent + '%';
}

function loadQuestion(){
  updateProgress();
  startTimer();

  explanationEl.innerHTML='';
  badgeEl.innerHTML='';
  nextBtn.style.display='none';

  const q = questions[current];
  scoreEl.innerHTML = `⭐ Body: ${score}`;
  questionEl.innerHTML = q.q;
  answersEl.innerHTML='';

  q.a.forEach(answer=>{
    const btn = document.createElement('button');
    btn.className='option';
    btn.innerText=answer;

    btn.onclick=()=>{
      clearInterval(timer);
      lockAnswers();

      if(answer === q.correct){
        score++;
        btn.style.background='#22c55e';
        explanationEl.innerHTML='✅ '+q.exp;
        badgeEl.innerHTML='🏅 Získal jsi XP bonus!';
        document.getElementById('correctSound').play();
      } else {
        btn.style.background='#ef4444';
        explanationEl.innerHTML='❌ Špatně! '+q.exp;
        document.getElementById('wrongSound').play();
      }

      nextBtn.style.display='block';
      scoreEl.innerHTML = `⭐ Body: ${score}`;
    }

    answersEl.appendChild(btn);
  })
}

nextBtn.onclick=()=>{
  current++;

  if(current < questions.length){
    loadQuestion();
  } else {
    finishGame();
  }
}

function finishGame(){
  updateProgress();
  bar.style.width='100%';

  let rank='🧑‍💻 Začátečník';

  if(score >= 4) rank='🔥 Cyber Expert';
  else if(score >= 3) rank='⚡ Hacker Master';

  document.querySelector('.game').innerHTML=`
    <div class='final'>
      <h1>🏆 Mise dokončena!</h1>
      <p>Získal/a jsi <b>${score}</b> bodů z ${questions.length}</p>
      <h2>${rank}</h2>
      <button class='next' style='display:block' onclick='restartGame()'>Hrát znovu 🔄</button>
    </div>
  `;
}

function restartGame(){
  location.reload();
}

loadQuestion();
</script>

</body>
</html>
