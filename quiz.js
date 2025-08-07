function checkAnswer(formId, questionName, correctAnswer, resultId) {
  const form = document.getElementById(formId);
  const options = form.elements[questionName];
  const result = document.getElementById(resultId);
  let selected = null;

  for (let option of options) {
    if (option.checked) {
      selected = option.value;
      break;
    }
  }

  if (selected === null) {
    result.textContent = "Veuillez sélectionner une réponse.";
    result.style.color = "orange";
    return;
  }

  if (selected === correctAnswer) {
    result.textContent = "Bonne réponse ✅";
    result.style.color = "green";
  } else {
    result.textContent = "Mauvaise réponse ❌";
    result.style.color = "red";
  }
}

function checkAllAnswers() {
  let score = 0;
  const totalQuestions = 30;
  const correctAnswers = {
    1:'c', 2:'c', 3:'a', 4:'b', 5:'a', 6:'b', 7:'c', 8:'d', 9:'a', 10:'b',
    11:'a', 12:'c', 13:'b', 14:'d', 15:'a', 16:'c', 17:'c', 18:'b', 19:'b', 20:'c',
    21:'c', 22:'a', 23:'b', 24:'a', 25:'c', 26:'b', 27:'b', 28:'b', 29:'b', 30:'c'
  };

  for (let i = 1; i <= totalQuestions; i++) {
    const formId = 'quiz' + i;
    const groupName = 'q' + i;
const resultId = 'result' + i;

    const radios = document.getElementsByName(groupName);
    let selected = null;
    for (let radio of radios) {
      if (radio.checked) selected = radio.value;
    }

    if (selected === correctAnswers[i]) {
      score++;
    }

    checkAnswer(formId, groupName, correctAnswers[i], resultId);
  }

  document.getElementById("finalScore").innerText = `Votre score est : score /{totalQuestions}`;
}

// ----- Minuteur -----
const duration = 300; // 5 minutes en secondes
let timeRemaining = duration;
let timerInterval;

function startTimer() {
  const timerDisplay = document.getElementById('timer');
  timerInterval = setInterval(() => {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    timerDisplay.textContent = `Temps restant : ${minutes}: ${seconds < 10 ? '0' : ''} ${seconds}`;
    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      alert("Temps écoulé ! Résultats automatiques.");
      checkAllAnswers();
    }
    timeRemaining--;
  }, 1000);
}

// Lancer le minuteur au chargement de la page
window.onload = () => {
  startTimer();
};

