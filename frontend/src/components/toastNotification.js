const toast = document.querySelector(".toast-notification");
const toastText = toast.querySelector("h4");
const toastProgress = document.querySelector(".toast-progress");

const delay = 4000;

export const showToastNotification = (text, type = null) => {
  if (type === "error") {
    toast.style.backgroundColor = "#ff05059a";
    toastText.style.color = "#b80a0a";
    toastProgress.style.backgroundColor = "#b80a0a";
  }

  if (type === "warning") {
    toast.style.backgroundColor = "#ff975b9a";
    toastText.style.color = "#ff5e00";
    toastProgress.style.backgroundColor = "#ff5e00";
  }

  toast.classList.add("active-toast");
  toastText.textContent = text;

  toastProgress.style.transitionDuration = `${delay}ms`;

  requestAnimationFrame(() => {
    toastProgress.style.width = "0";
  });

  setTimeout(() => {
    toast.classList.remove("active-toast");
    toastProgress.style.width = "100%";
    toastProgress.style.transitionDuration = `0ms`;
  }, delay);
};