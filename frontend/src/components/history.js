const historyContainer = document.querySelector(".history-container");
const historyCarname = historyContainer.querySelector(".history-carname");
const tbody = document.querySelector("tbody");
const closeBtn = historyContainer.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
  historyContainer.classList.remove("history-active");
  tbody.innerHTML = "";
});

export const createOilChangeHistoryTable = (
  carName,
  distance,
  changeDate,
  history
) => {
  historyCarname.textContent = carName;

  console.log(history);

  history.forEach((element) => {
    const date = new Date(element.oil_change_date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    tbody.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
       <td>${carName}</td>
       <td>${element.kilometers}</td>
       <td>${day}-${month}-${year}</td>
      </tr>
    `
    );
  });
};

export const changeHistoryCarName = (carName) => {
  historyCarname.textContent = carName;
};
