import { BASE_URL } from "../../config/apiEndpoints";

// fd82ce59664d0b7f93fa52ff089d637f94A6FF4F2DE7AEB7A556D0904251B509E774B32C

// fd82ce59664d0b7f93fa52ff089d637fA0D917422E2128FF7157D78F8FFC3BAFF11B2EEF

// let token =
//   "fd82ce59664d0b7f93fa52ff089d637f63D2423B8426033160E79398BFA0E74568E2D83B";

function showLoginButton() {
  const loginWrapper = document.querySelector(".login-wrapper");

  if (loginWrapper) {
    loginWrapper.style.display = "inline-block";
  }
}

function hideLoginButton() {
  const loginWrapper = document.querySelector(".login-wrapper");

  if (loginWrapper) {
    loginWrapper.style.display = "none";
  }
}

let token = localStorage.getItem("wialon_token");

const validateToken = async () => {
  if (token) {
    try {
      const response = await fetch(
        `https://local.geogps.ge/wialon/ajax.html?svc=token/login&params={"token":"${token}"}`
      );
      const result = await response.json();

      if (result.error) {
        console.error("Token is invalid:", result.error);
        showLoginButton();
      } else {
        console.log("User authenticated successfully:", result);
        hideLoginButton();
      }
    } catch (error) {
      console.error("An error occurred during token validation:", error);
      showLoginButton();
    }
  } else {
    showLoginButton();
  }
};

export function handleRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("access_token");

  if (token) {
    localStorage.setItem("wialon_token", token);

    // clear url
    // window.history.replaceState({}, document.title, window.location.pathname);
    validateToken();
  } else {
    validateToken();
  }
}

function redirectToLogin() {
  const redirectUrl = encodeURIComponent(window.location.href);
  window.location.href = `${BASE_URL}/login.html?access_type=token&duration=0&redirect_uri=${redirectUrl}`;
}
