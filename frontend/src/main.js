import { createCarCard } from "./components/card.js";
import { fetchCars } from "./services/api.js";

const carsData = await fetchCars();

const fragment = document.createDocumentFragment();
const app = document.querySelector("#app");
const carsContainer = document.querySelector(".cars-container");

console.log(carsData);
carsData.forEach((car) => {
  const card = createCarCard(car.nm, car.cnm_km, car.uri);
  fragment.appendChild(card);
});

carsContainer.appendChild(fragment);
