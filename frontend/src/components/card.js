import { BASE_URL } from "../config/apiEndpoints";

export const createCarCard = (name, distance, iconUrl) => {
  const div = document.createElement("div");
  const cardHeaderDiv = document.createElement("div");
  const imgDiv = document.createElement("div");
  const ctaDiv = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const clearDistanceBtn = document.createElement("button");
  const historyBtn = document.createElement("button");
  const img = document.createElement("img");

  div.classList.add("car-card");
  cardHeaderDiv.classList.add("card-header-container");
  imgDiv.classList.add("img-container");
  img.classList.add("car-icon");
  h3.classList.add("car-name");
  p.classList.add("car-distance");
  ctaDiv.classList.add("card-cta");
  clearDistanceBtn.classList.add("btn", "clear-distance-btn");
  historyBtn.classList.add("btn", "history-btn");

  h3.innerText = `მანქანა: ${name}`;
  img.src = `${BASE_URL}${iconUrl}`;
  img.alt = `${name}`;
  p.innerHTML = `განვლილი მანძილი: <span>${distance} კმ</span>`;
  clearDistanceBtn.innerText = "მანძილის განულება";
  historyBtn.innerText = "ისტორია";

  imgDiv.appendChild(img);
  cardHeaderDiv.appendChild(imgDiv);
  cardHeaderDiv.appendChild(h3);
  ctaDiv.appendChild(clearDistanceBtn);
  ctaDiv.appendChild(historyBtn);

  div.appendChild(cardHeaderDiv);
  div.appendChild(p);
  div.appendChild(ctaDiv);

  return div;
};
