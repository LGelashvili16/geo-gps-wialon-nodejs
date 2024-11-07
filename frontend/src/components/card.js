import { BASE_URL } from "../config/apiEndpoints";
import { initialization } from "../main";
import { changeInterval, resetInterval } from "../services/api";
import { getRemainingDistanceDetails } from "../utils/distanceCalculation";
import { historyBtnAction } from "./actions/historyBtn";
import { intervalFormAction } from "./actions/intervalForm";
import { resetDistanceBtnAction } from "./actions/resetDistanceBtn";
import { settingsBtnAction } from "./actions/settingsBtn";
import { changeHistoryCarName, createOilChangeHistoryTable } from "./history";
import { showToastNotification } from "./toastNotification";

const historyContainer = document.querySelector(".history-container");

export const createCard = (
  id,
  name,
  totalDistance,
  initialDistance,
  threshold,
  iconUrl,
  resetDate,
  history
) => {
  const { remaining: remainingDistance, color: remainingDistanceColor } =
    getRemainingDistanceDetails(initialDistance, totalDistance, threshold);

  const template = document.querySelector(".card-template");
  const clone = template.content.cloneNode(true);

  const settingsBtn = clone.querySelector(".settings-btn");

  const cardCta = clone.querySelector(".card-cta");

  const resetDistanceBtn = clone.querySelector(".reset-distance-btn");
  const historyBtn = clone.querySelector(".history-btn");

  const intervalForm = clone.getElementById("interval-form");

  const carCard = clone.querySelector(".car-card");

  const carIcon = clone.querySelector(".car-icon");
  const carName = clone.querySelector(".car-name");

  const carRemainingDistance = clone.querySelector(".car-remaining-distance");
  const carIntervalDistance = clone.querySelector(".car-interval-distance");
  const carInitialDistance = clone.querySelector(".car-initial-distance");
  const carDistance = clone.querySelector(".car-distance");

  carCard.setAttribute("data-id", id);

  settingsBtnAction(settingsBtn, cardCta);

  // settingsBtn.addEventListener("click", () => {
  //   cardCta.classList.toggle("active-cta");
  // });

  resetDistanceBtnAction(resetDistanceBtn, cardCta, {
    id,
    initialDistance,
    totalDistance,
  });

  // resetDistanceBtn.addEventListener("click", async () => {
  //   try {
  //     if (initialDistance === totalDistance) {
  //       showToastNotification("ათვლა უკვე განახლებულია!", "warning");
  //       return;
  //     }

  //     resetDistanceBtn.innerText = "დაელოდეთ...";
  //     resetDistanceBtn.disabled = true;
  //     await resetInterval(id, totalDistance);

  //     // initialization();
  //     showToastNotification("ათვლა წარმატებით განახლდა!");
  //   } catch (error) {
  //     console.error("Error resetting interval:", error);
  //     showToastNotification("ათვლის განახლებისას მოხდა შეცდომა!", "error");
  //   } finally {
  //     cardCta.classList.remove("active-cta");
  //     resetDistanceBtn.innerText = "დაწიყე ათვლა თავიდან";
  //     resetDistanceBtn.disabled = false;
  //   }
  // });

  historyBtnAction(historyBtn, historyContainer, {
    name,
    totalDistance,
    resetDate,
    history,
  });

  // historyBtn.addEventListener("click", () => {
  //   historyContainer.classList.toggle("history-active");

  //   if (history.length > 0) {
  //     createOilChangeHistoryTable(name, totalDistance, resetDate, history);
  //   } else {
  //     changeHistoryCarName(name);
  //   }
  // });

  intervalFormAction(intervalForm, cardCta, { id, threshold });

  // intervalForm.addEventListener("submit", (e) => {
  //   const intervalInput = e.target.interval.value;
  //   const formBtn = e.target.btn;

  //   try {
  //     e.preventDefault();

  //     formBtn.disabled = true;

  //     if (threshold === +intervalInput) {
  //       showToastNotification(
  //         "შეიყვანე განსხვავებული ათვლის ინტერვალი!",
  //         "warning"
  //       );
  //       return;
  //     }

  //     if (intervalInput) {
  //       changeInterval(id, intervalInput);
  //       showToastNotification("ათვლის ინტერვალი განახლდა!");
  //       cardCta.classList.remove("active-cta");
  //     }
  //   } catch (error) {
  //     showToastNotification("ინტერვალი უკვე განახლებულია!", "error");
  //   } finally {
  //     formBtn.disabled = false;
  //   }
  // });

  carIcon.src = `${BASE_URL}${iconUrl}`;
  carName.innerText = `მანქანა: ${name}`;

  carRemainingDistance.insertAdjacentHTML(
    "afterend",
    `<span style="color: ${remainingDistanceColor}; textAlign: right"><strong>${remainingDistance}</strong> კმ</span>`
  );

  carIntervalDistance.insertAdjacentHTML(
    "afterend",
    `<span style="textAlign: right"><strong>${threshold}</strong> კმ</span>`
  );

  carInitialDistance.insertAdjacentHTML(
    "afterend",
    `<span style="textAlign: right"><strong>${initialDistance}</strong> კმ</span>`
  );

  carDistance.insertAdjacentHTML(
    "afterend",
    `<span style="textAlign: right"><strong>${totalDistance}</strong> კმ</span>`
  );

  return clone;
};
