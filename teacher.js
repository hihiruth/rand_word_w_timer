document.addEventListener('DOMContentLoaded', () => {
  const wordListTextarea = document.getElementById('word-list');
  const saveWordsButton = document.getElementById('save-words');
  const countdownTimeInput = document.getElementById('countdown-time');
  const saveCountdownButton = document.getElementById('save-countdown');

  // Load words from localStorage
  const storedWords = localStorage.getItem('words');
  if (storedWords) {
    wordListTextarea.value = JSON.parse(storedWords).join('\n');
  }

  // Load countdown time from localStorage
  const storedCountdownTime = localStorage.getItem('countdownTime');
  if (storedCountdownTime) {
    countdownTimeInput.value = storedCountdownTime;
  }

  saveWordsButton.addEventListener('click', () => {
    const words = wordListTextarea.value.split('\n').filter(word => word.trim() !== '');
    localStorage.setItem('words', JSON.stringify(words));
    alert('Words saved!');
  });

  saveCountdownButton.addEventListener('click', () => {
    const countdownTime = parseInt(countdownTimeInput.value);
    if (!isNaN(countdownTime) && countdownTime > 0) {
      localStorage.setItem('countdownTime', countdownTime);
      alert('Countdown time saved!');
    } else {
      alert('Please enter a valid countdown time (positive number).');
    }
  });
});