export const countdown = (date, popup) => {
    const target = new Date(date).getTime()
    const countdown = popup.querySelector('.timing-popup_countdown')
    const countdownHours = popup.querySelector('.countdown_hours')
    const countdownMinutes = popup.querySelector('.countdown_min')
    const countdownSeconds = popup.querySelector('.countdown_sec')

    const interval = setInterval(function () {
        const now = new Date().getTime()
        const difference = target - now

        // Calculate time components
        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        // Update the countdown
        countdownHours.innerText = hours < 0 ? '00' : hours
        countdownMinutes.innerText = minutes < 0 ? '00' : minutes
        countdownSeconds.innerText = seconds < 0 ? '00' : seconds

        // When countdown reaches zero
        if (difference < 0) {
            clearInterval(interval)
            document.querySelector('.timing-popup_countdown-cta > div').innerHTML = "Time's up!"

            // End countdown cookie
            sessionStorage.setItem("EndCountdownPromo", "true")

            // Remove popup
            setTimeout(() => {
                popup.remove()
            }, 500)

        } else {
            // Show countdown
            setTimeout(() => {
                countdown.style.opacity = 1;
            }, 500)
        }
    }, 1000)
}