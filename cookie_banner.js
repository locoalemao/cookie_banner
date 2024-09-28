document.addEventListener("DOMContentLoaded", function () {
  // Load cookie banner HTML and functionality
  const cookieBannerContainer = document.getElementById("cookie-banner");

  if (!cookieBannerContainer) {
    return;
  }

  fetch("cookie_banner.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      cookieBannerContainer.innerHTML = html;

      const cookieBanner = document.getElementById("cmpbox");
      const acceptCookiesButton = document.getElementById("cmpwelcomebtnyes");
      const customSettingsButton = document.getElementById("cmpwelcomebtncustom");
      const closeButton = document.querySelector(".cmpclose a");

      // Elements for advanced settings
      const mainContent = document.getElementById("main-content");
      const advancedContent = document.getElementById("advanced-content");
      const saveButton = document.getElementById("save-preferences");
      const customBtnText = document.getElementById("cmpbntcustomtxt");

      if (!cookieBanner || !acceptCookiesButton || !customSettingsButton || !closeButton) {
        return;
      }

      // Show banner only if cookies were not previously accepted
      if (!localStorage.getItem("cookiesAccepted")) {
        cookieBanner.style.display = "flex";
      } else {
        cookieBanner.style.display = "none";
      }

      // Event listener for accepting all cookies
      acceptCookiesButton.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.style.display = "none";
      });

      // Event listener for opening and closing advanced settings
      customSettingsButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (mainContent && advancedContent) {
          if (mainContent.style.display === "none") {
            mainContent.style.display = "block";
            advancedContent.style.display = "none";
            customBtnText.textContent = "CONFIGURAÇÕES";
          } else {
            mainContent.style.display = "none";
            advancedContent.style.display = "block";
            customBtnText.textContent = "< VOLTAR";
          }
        }
      });

      // Event listener for saving preferences in advanced settings
      if (saveButton) {
        saveButton.addEventListener("click", function () {
          const preferences = {
            functional: document.getElementById("functional-cookies").checked,
            performance: document.getElementById("performance-cookies").checked,
            advertising: document.getElementById("advertising-cookies").checked,
          };
          localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
          localStorage.setItem("cookiesAccepted", "true");
          cookieBanner.style.display = "none";
        });
      }

      // Event listener for closing the banner
      closeButton.addEventListener("click", function (event) {
        event.preventDefault();
        cookieBanner.style.display = "none";
      });
    })
    .catch((error) => console.error("Error loading cookie banner:", error));
});
