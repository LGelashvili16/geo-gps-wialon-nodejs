// import { addOilChangeRecord } from "../../../backend/src/services/dbService";
import { BASE_URL } from "../config/apiEndpoints";
import { getRemainingDistanceDetails } from "../utils/distanceCalculation";
import { changeHistoryCarName, createOilChangeHistory } from "./history";

export const createCarCard = (
  name,
  totalDistance,
  initialDistance,
  threshold,
  iconUrl
) => {
  const { remaining: remainingDistance, color: remainingDistanceColor } =
    getRemainingDistanceDetails(initialDistance, totalDistance, threshold);

  const div = document.createElement("div");
  const cardHeaderDiv = document.createElement("div");
  const imgDiv = document.createElement("div");
  const ctaDiv = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const pInitialDistance = document.createElement("p");
  const pRemainingDistance = document.createElement("p");
  const clearDistanceBtn = document.createElement("button");
  const historyBtn = document.createElement("button");
  const img = document.createElement("img");

  div.classList.add("car-card");
  cardHeaderDiv.classList.add("card-header-container");
  imgDiv.classList.add("img-container");
  img.classList.add("car-icon");
  h3.classList.add("car-name");
  p.classList.add("car-distance");
  pInitialDistance.classList.add("car-initial-distance");
  pRemainingDistance.classList.add("car-remaining-distance");
  ctaDiv.classList.add("card-cta");
  clearDistanceBtn.classList.add("btn", "clear-distance-btn");
  historyBtn.classList.add("btn", "history-btn");

  h3.innerText = `მანქანა: ${name}`;
  img.src = `${BASE_URL}${iconUrl}`;
  img.alt = `${name}`;
  p.innerHTML = `სულ განვლილი მანძილი: <span><strong>${totalDistance}</strong> კმ</span>`;
  pInitialDistance.innerHTML = `ათვლა დაიწყო: <span><strong>${initialDistance}</strong> კმ-დან</span>`;
  pRemainingDistance.innerHTML = `დარჩენილი მანძილი: <span style="color: ${remainingDistanceColor}; textAlign: right"><strong>${remainingDistance}</strong> კმ</span>`;
  clearDistanceBtn.innerText = "მანძილის განულება";
  historyBtn.innerText = "ისტორია";

  imgDiv.appendChild(img);
  cardHeaderDiv.appendChild(imgDiv);
  cardHeaderDiv.appendChild(h3);
  ctaDiv.appendChild(clearDistanceBtn);
  ctaDiv.appendChild(historyBtn);

  div.appendChild(cardHeaderDiv);
  div.appendChild(pRemainingDistance);
  div.appendChild(pInitialDistance);
  div.appendChild(p);
  div.appendChild(ctaDiv);

  return div;
};

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
  const intervalInput = clone.getElementById("interval-input");
  const intervalBtn = clone.querySelector(".change-threshold-btn");

  const carCard = clone.querySelector(".car-card");

  const carIcon = clone.querySelector(".car-icon");
  const carName = clone.querySelector(".car-name");

  const carRemainingDistance = clone.querySelector(".car-remaining-distance");
  const carIntervalDistance = clone.querySelector(".car-interval-distance");
  const carInitialDistance = clone.querySelector(".car-initial-distance");
  const carDistance = clone.querySelector(".car-distance");

  carCard.setAttribute("data-id", id);

  settingsBtn.addEventListener("click", () => {
    cardCta.classList.toggle("active-cta");
  });

  resetDistanceBtn.addEventListener("click", () => {
    // const date = new Date();
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();

    // const fullYear = `${year}-${month}-${day}`;

    // addOilChangeRecord(id);
    cardCta.classList.remove("active-cta");
  });

  historyBtn.addEventListener("click", () => {
    historyContainer.classList.toggle("history-active");

    if (history.length > 0) {
      createOilChangeHistory(name, totalDistance, resetDate);
    } else {
      changeHistoryCarName(name);
    }
  });

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
