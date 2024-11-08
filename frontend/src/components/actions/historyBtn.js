import { changeHistoryCarName, createOilChangeHistoryTable } from "../history";

export const historyBtnAction = (
  clickElement,
  historyContainer,
  carDetails
) => {
  clickElement.addEventListener("click", () => {
    historyContainer.classList.toggle("history-active");

    if (carDetails.history.length > 0) {
      createOilChangeHistoryTable(carDetails.name, carDetails.history);
    } else {
      changeHistoryCarName(carDetails.name);
    }
  });
};
