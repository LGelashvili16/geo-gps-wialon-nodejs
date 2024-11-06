import { createCard } from "./components/card.js";
import { fetchCars } from "./services/api.js";

const template = document.querySelector(".card-template");
const clone = template.cloneNode(true);

const loader = document.querySelector(".loader");
loader.style.display = "block";

const carsData = await fetchCars();

loader.style.display = "none";

const fragment = document.createDocumentFragment();
const carsContainer = document.querySelector(".cars-container");

export const initialization = () => {
  carsContainer.innerHTML = "";
  carsContainer.appendChild(clone);
  console.log(carsData);
  carsData.forEach((car) => {
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
};

initialization();
