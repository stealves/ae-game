"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/prices.js
  var pricesAddCurrency = (prices) => {
    if (prices.length > 0) {
      prices.forEach((priceElement) => {
        let priceText = priceElement.textContent;
        let priceNumber = parseFloat(priceText.replace(/[^\d\.]/g, ""));
        let formattedPrice = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(priceNumber);
        priceElement.textContent = formattedPrice;
      });
    }
  };

  // src/utils/countdown.js
  var countdown = (date, popup) => {
    const target = new Date(date).getTime();
    const countdown2 = popup.querySelector(".timing-popup_countdown");
    const countdownHours = popup.querySelector(".countdown_hours");
    const countdownMinutes = popup.querySelector(".countdown_min");
    const countdownSeconds = popup.querySelector(".countdown_sec");
    const interval = setInterval(function() {
      const now = (/* @__PURE__ */ new Date()).getTime();
      const difference = target - now;
      const hours = Math.floor(difference / (1e3 * 60 * 60));
      const minutes = Math.floor(difference % (1e3 * 60 * 60) / (1e3 * 60));
      const seconds = Math.floor(difference % (1e3 * 60) / 1e3);
      countdownHours.innerText = hours < 0 ? "00" : hours;
      countdownMinutes.innerText = minutes < 0 ? "00" : minutes;
      countdownSeconds.innerText = seconds < 0 ? "00" : seconds;
      if (difference < 0) {
        clearInterval(interval);
        document.querySelector(".timing-popup_countdown-cta > div").innerHTML = "Time's up!";
        sessionStorage.setItem("EndCountdownPromo", "true");
        setTimeout(() => {
          popup.remove();
        }, 500);
      } else {
        setTimeout(() => {
          countdown2.style.opacity = 1;
        }, 500);
      }
    }, 1e3);
  };

  // src/utils/popup.js
  var showPopupOnce = (popup) => {
    const trigger = popup.querySelector("#promo-trigger");
    if (sessionStorage.getItem("PromoPop") !== "true") {
      setTimeout(function() {
        trigger.click();
        sessionStorage.setItem("PromoPop", "true");
      }, 2e3);
    }
  };
  var setTimingPopup = (popup) => {
    const endDate = popup.getAttribute("data-end");
    const target = new Date(endDate).getTime();
    const now = (/* @__PURE__ */ new Date()).getTime();
    if (target > now) {
      countdown(endDate, popup);
      const countdownBar = popup.querySelector(".timing-popup_countdown-bar");
      const countdownBarClose = countdownBar.querySelector(".timing-popup_countdown-close");
      const openButton = popup.querySelector(".timing-popup_float-button");
      countdownBar.classList.add("is-visible");
      countdownBarClose.addEventListener("click", () => {
        countdownBar.classList.toggle("is-visible");
        openButton.classList.toggle("is-visible");
      });
      if (window.location.pathname === "/") {
        showPopupOnce(popup);
      }
    }
  };

  // src/index.js
  window.Webflow ||= [];
  window.Webflow.push(() => {
    const thisYear = (/* @__PURE__ */ new Date()).getFullYear();
    document.querySelector(".copyright-year").textContent = thisYear;
    const prices = document.querySelectorAll(".section_price_price");
    pricesAddCurrency(prices);
    const timingPopup = document.querySelector(".timing-popup");
    if (timingPopup) {
      setTimingPopup(timingPopup);
    }
  });
})();
//# sourceMappingURL=index.js.map
