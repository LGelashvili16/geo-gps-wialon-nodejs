import { resetInterval } from "../../services/api";
import { showToastNotification } from "../toastNotification";

export const resetDistanceBtnAction = (clickElement, cardCta, carDetails) => {
  clickElement.addEventListener("click", async () => {
    try {
      if (carDetails.initialDistance === carDetails.totalDistance) {
        showToastNotification("ათვლა უკვე განახლებულია!", "warning");
        return;
      }

      clickElement.innerText = "დაელოდეთ...";
      clickElement.disabled = true;
      await resetInterval(carDetails.id, carDetails.totalDistance);

      // initialization();
      showToastNotification("ათვლა წარმატებით განახლდა!");
    } catch (error) {
      console.error("Error resetting interval:", error);
      showToastNotification("ათვლის განახლებისას მოხდა შეცდომა!", "error");
    } finally {
      cardCta.classList.remove("active-cta");
      clickElement.innerText = "დაწიყე ათვლა თავიდან";
      clickElement.disabled = false;
    }
  });
};
