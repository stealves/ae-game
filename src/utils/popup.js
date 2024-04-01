import { countdown } from "./countdown.js"

const showPopupOnce = (popup) => {
    const trigger = popup.querySelector('#promo-trigger')

    if (sessionStorage.getItem("PromoPop") !== "true") {
        setTimeout(function () {
            trigger.click()
            sessionStorage.setItem("PromoPop", "true")
        }, 2000) // Wait for 5 seconds
    }
}

export const setTimingPopup = (popup) => {
    const endDate = popup.getAttribute('data-end')

    const target = new Date(endDate).getTime()
    const now = new Date().getTime()

    if (target > now) {
        // Start Countdown
        countdown(endDate, popup)

        // Show Countdown
        const countdownBar = popup.querySelector('.timing-popup_countdown-bar')
        const countdownBarClose = countdownBar.querySelector('.timing-popup_countdown-close')
        const openButton = popup.querySelector('.timing-popup_float-button')

        countdownBar.classList.add('is-visible')
        countdownBarClose.addEventListener('click', () => {
            countdownBar.classList.toggle('is-visible')
            openButton.classList.toggle('is-visible')
        })

        if (window.location.pathname === "/") {
            showPopupOnce(popup)
        }
    }
}
