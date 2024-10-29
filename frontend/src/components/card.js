export const createCarCard = (name, distance) => {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const btn = document.createElement("button");

  div.classList.add("car-card");
  h3.classList.add("car-name");
  p.classList.add("car-distance");

  h3.innerText = `მანქანა: ${name}`;
  p.innerText = `განვლილი მანძილი: ${distance}კმ`;
  btn.innerText = "მანძილის განულება";

  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(btn);

  return div;
};
