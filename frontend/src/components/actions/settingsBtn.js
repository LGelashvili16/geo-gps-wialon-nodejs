export const settingsBtnAction = (clickElement, cardCta) => {
  clickElement.addEventListener("click", () => {
    cardCta.classList.toggle("active-cta");
  });
};
