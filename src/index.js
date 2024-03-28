window.Webflow ||= [];
window.Webflow.push(() => {
  function startCountdown(targetDate) {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(function () {
      const now = new Date().getTime();
      const difference = target - now;

      // Calculate time components
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Update the countdown
      document.querySelector('.countdown_hours').innerText = hours < 0 ? '00' : hours;
      document.querySelector('.countdown_min').innerText = minutes < 0 ? '00' : minutes;
      document.querySelector('.countdown_sec').innerText = seconds < 0 ? '00' : seconds;

      setTimeout(() => {
        document.querySelector('.timing-popup_countdown').style.opacity = 1;
      }, 500)

      // When countdown reaches zero
      if (difference < 0) {
        clearInterval(interval);
        document.querySelector('.timing-popup_countdown-cta > div').innerHTML = "Time's up!";

        // Hide elements with class 'hide' and remove promo id
        document.querySelector('.announcement-bar').classList.add('hide');
        document.querySelector('.timing-popup').classList.add('hide');
        sessionStorage.setItem("EndCountdownPromo", "true");
      }
    }, 1000);
  }

  // Start the countdown (YYYY/MM/DD format)
  startCountdown('2024-03-31T23:59:59');
});