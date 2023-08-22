const subtitle = document.querySelector(".subtitle");
const submit = document.querySelector(".submit");

const email = localStorage.getItem("registered_email");
const sendEmail = () => {
  if (!email) {
    return;
  } else {
    subtitle.innerHTML = `Wyslalismy wlasnie do ciebie link na adres: 
    ${email}. Otworz link, by dokonczyc rejestracje`;
  }
};
sendEmail();
submit.addEventListener("click", () => {
  localStorage.removeItem("registered_email");
});

window.addEventListener("beforeunload", (e) => {
  localStorage.removeItem("registered_email");
});
