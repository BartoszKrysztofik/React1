const access_token = localStorage.getItem("access_token");
const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const userContent = document.getElementById("userContent");
const innerContent = document.getElementById("innerContent");
const logoutButton = document.querySelector(".logout");

if (!access_token) {
  userContent.innerHTML = `<h3> Coś poszło nie tak </h3> <p>Taki uzytkownik nie istnieje lub wystapil blad podczas logowania. Sprobuj ponownie pozniej</p> <a href="login.html">Wroc do strony logowania</a>`;
} else {
  getUser();
}
async function getUser() {
  try {
    const response = await fetch(`${BASE_URL}profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    result.forEach((item) => {
      innerContent.innerHTML += `<li>Cześc ${item.firstName} ${item.lastName}<li>`;
    });
  } catch (error) {
    console.log(error);
  }
}

logoutButton.addEventListener("click", () => {
  logout();
});
function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("remember_user");
  window.location.href = "login.html";
}
const remember = Number(localStorage.getItem("remember_user"));
const rememberFlag = Boolean(remember);

window.addEventListener("beforeunload", function (event) {
  if (rememberFlag) {
    return;
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("remember_user");
  }
});
