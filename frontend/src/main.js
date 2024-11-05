import { createCarCard, createCard } from "./components/card.js";
import { fetchCars } from "./services/api.js";

const loader = document.querySelector(".loader");
loader.style.display = "block";

const carsData = await fetchCars();

loader.style.display = "none";

const fragment = document.createDocumentFragment();
const app = document.querySelector("#app");
const carsContainer = document.querySelector(".cars-container");

console.log(carsData);
carsData.forEach((car) => {
  // const card = createCarCard(
  //   car.car_name,
  //   car.total_distance,
  //   car.initial_distance,
  //   car.next_oil_change_km,
  //   car.icon_url
  // );
  const card = createCard(
    car.car_id,
    car.car_name,
    car.total_distance,
    car.initial_distance,
    car.next_oil_change_km,
    car.icon_url,
    car.last_reset_date,
    car.history
  );
  fragment.appendChild(card);
});

carsContainer.appendChild(fragment);

// const settingsBtn = document.querySelector(".settings-btn");
// const cardCta = document.querySelector(".card-cta");

// settingsBtn.addEventListener("click", () => {
//   cardCta.classList.toggle("active-cta");
// });
