const historyContainer = document.querySelector(".history-container");
const historyCarname = historyContainer.querySelector(".history-carname");
const closeBtn = historyContainer.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
  historyContainer.classList.remove("history-active");
});

export const createOilChangeHistory = (carName, distance, date) => {
  historyCarname.textContent = carName;

  console.log(historyCarname);

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = `
    <tr>
     <td>${carName}</td>
     <td>${distance}</td>
     <td>${date}</td>
    </tr>
  `;
};

export const changeHistoryCarName = (carName) => {
  historyCarname.textContent = carName;
};
