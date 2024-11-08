const toast = document.querySelector(".toast-notification");
const toastText = toast.querySelector("h4");
const toastProgress = document.querySelector(".toast-progress");

const delay = 4000;
let timeout;

export const showToastNotification = (text, type = null) => {
  clearTimeout(timeout);

  if (type === "error") {
    toast.style.backgroundColor = "var(--toast-primary-red)";
    toastText.style.color = "var(--toast-secondary-red)";
    toastProgress.style.backgroundColor = "var(--toast-secondary-red)";
  }

  if (type === "warning") {
    toast.style.backgroundColor = "var(--toast-primary-orange)";
    toastText.style.color = "var(--toast-secondary-orange)";
    toastProgress.style.backgroundColor = "var(--toast-secondary-orange)";
  }

  if (type === null) {
    toast.style.backgroundColor = "var(--toast-primary-green)";
    toastText.style.color = "var(--toast-secondary-green)";
    toastProgress.style.backgroundColor = "var(--toast-secondary-green)";
  }

  toast.classList.add("active-toast");
  toastText.textContent = text;

  toastProgress.style.transitionDuration = `0ms`;
  toastProgress.style.width = "100%";

  requestAnimationFrame(() => {
    toastProgress.style.transitionDuration = `${delay}ms`;
    toastProgress.style.width = "0";
  });

  timeout = setTimeout(() => {
    toast.classList.remove("active-toast");
    toastProgress.style.width = "100%";
    toastProgress.style.transitionDuration = `0ms`;
  }, delay);
};
