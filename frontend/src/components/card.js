import { BASE_URL } from "../config/apiEndpoints";
import { getRemainingDistanceDetails } from "../utils/distanceCalculation";
import { historyBtnAction } from "./actions/historyBtn";
import { intervalFormAction } from "./actions/intervalForm";
import { resetDistanceBtnAction } from "./actions/resetDistanceBtn";
import { settingsBtnAction } from "./actions/settingsBtn";

const historyContainer = document.querySelector(".history-container");

export const createCard = (
  id,
  name,
  totalDistance,
  initialDistance,
  threshold,
  iconUrl,
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

  resetDistanceBtnAction(resetDistanceBtn, cardCta, {
    id,
    initialDistance,
    totalDistance,
  });

  historyBtnAction(historyBtn, historyContainer, {
    name,
    history,
  });

  intervalFormAction(intervalForm, cardCta, { id, threshold });

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
