import { pricesAddCurrency } from "./utils/prices.js"
import { setTimingPopup } from "./utils/popup.js"

window.Webflow ||= []
window.Webflow.push(() => {
  // Copyright date
  const thisYear = new Date().getFullYear()
  document.querySelector('.copyright-year').textContent = thisYear

  // Prices add currency
  const prices = document.querySelectorAll('.section_price_price')
  pricesAddCurrency(prices)

  // Set timing popup
  const timingPopup = document.querySelector('.timing-popup')
  if (timingPopup) {
    setTimingPopup(timingPopup)
  }
})