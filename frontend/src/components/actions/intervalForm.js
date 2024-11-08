import { changeInterval } from "../../services/api";
import { showToastNotification } from "../toastNotification";
import { initialization } from "../../main";

export const intervalFormAction = (intervalForm, cardCta, carDetails) => {
  intervalForm.addEventListener("submit", (e) => {
    const intervalInput = e.target.interval.value;
    const formBtn = e.target.btn;

    try {
      e.preventDefault();

      formBtn.disabled = true;

      if (carDetails.threshold === +intervalInput) {
        showToastNotification(
          "შეიყვანე განსხვავებული ათვლის ინტერვალი!",
          "warning"
        );
        return;
      }

      if (intervalInput) {
        changeInterval(carDetails.id, intervalInput);
        showToastNotification("ათვლის ინტერვალი განახლდა!");
        cardCta.classList.remove("active-cta");
        initialization();
      }
    } catch (error) {
      showToastNotification("ინტერვალი უკვე განახლებულია!", "error");
    } finally {
      formBtn.disabled = false;
    }
  });
};
