document.addEventListener('DOMContentLoaded', () => {
  const wordDisplay = document.getElementById('word');
  const wordCard = document.getElementById('word-card');
  const newWordButton = document.getElementById('new-word-button');
  const stopButton = document.getElementById('stop-button'); 
  const body = document.querySelector('body');
  const countdownDisplay = document.getElementById('time');

  let words = localStorage.getItem('words') ? JSON.parse(localStorage.getItem('words')) : ['Example']; 
  let countdownTime = localStorage.getItem('countdownTime') ? parseInt(localStorage.getItem('countdownTime')) : 10; 
  let timerInterval;
  let timerRunning = false; 

  function updateWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const newWord = words[randomIndex];
    wordDisplay.textContent = newWord;

    const randomBorderColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    const lighterBorderColor = lightenColor(randomBorderColor, 60); 
    wordCard.style.borderColor = lighterBorderColor;
  }

  function lightenColor(color, percent) {
    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
  }

  function startTimer() {
    clearInterval(timerInterval);
    countdownTime = localStorage.getItem('countdownTime') ? parseInt(localStorage.getItem('countdownTime')) : 10;
    updateCountdown();
    timerInterval = setInterval(() => {
      countdownTime--;
      updateCountdown();
      if (countdownTime <= 0) {
        updateWord();
        countdownTime = localStorage.getItem('countdownTime') ? parseInt(localStorage.getItem('countdownTime')) : 10;
        updateCountdown();
      }
    }, 1000);
    timerRunning = true;
    stopButton.textContent = 'Stop'; 
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    stopButton.textContent = 'Start'; 
  }

  function updateCountdown() {
    countdownDisplay.textContent = countdownTime;
  }

  newWordButton.addEventListener('click', () => {
    updateWord();
    startTimer(); 
  });

  stopButton.addEventListener('click', () => {
    if (timerRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  updateWord();
  startTimer(); 
});