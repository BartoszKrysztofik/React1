const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const terms = document.getElementById("terms");
//nie moge dodac #, nie dziala od razu, do sprawdzenia

const success = document.getElementById("success");
const failed = document.getElementById("failed");
const main = document.querySelector("main");
const popup = document.querySelector("#popup");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateRegisterForm()) {
    const data = {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
    };
    console.log("data", data);
    register(data);
    localStorage.setItem("registered_email", email.value);
  } else {
    console.log("nie ma requesta - błąd walidacji");
  }
});
function validateRegisterForm() {
  let proceed = {
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    terms: true,
  };
  const firstNameError = document.querySelector("#firstNameError");
  const lastNameError = document.querySelector("#lastNameError");
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");
  const termsError = document.querySelector("#termsError");

  const firstNameRegex = /^[A-Z][a-z]{1,19}$/;
  const lastNameRegex = /^[A-Z][a-z]{1,19}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!firstNameRegex.test(firstName.value)) {
    firstName.classList.add("error");
    firstNameError.classList.add("visible");
    proceed.firstName = false;
  } else {
    firstName.classList.remove("error");
    firstNameError.classList.remove("visible");
    proceed.firstName = true;
  }
  if (!lastNameRegex.test(lastName.value)) {
    lastName.classList.add("error");
    lastNameError.classList.add("visible");
    proceed.lastName = false;
  } else {
    lastName.classList.remove("error");
    lastNameError.classList.remove("visible");
    proceed.lastName = true;
  }
  if (!emailRegex.test(email.value)) {
    email.classList.add("error");
    emailError.classList.add("visible");
    proceed.email = false;
  } else {
    email.classList.remove("error");
    emailError.classList.remove("visible");
    proceed.email = true;
  }
  if (!passwordRegex.test(password.value)) {
    password.classList.add("error");
    passwordError.classList.add("visible");
    proceed.password = false;
  } else {
    password.classList.remove("error");
    passwordError.classList.remove("visible");
    proceed.password = true;
  }
  if (!terms.checked) {
    terms.classList.add("error");
    termsError.classList.add("visible");
    proceed.terms = false;
  } else {
    terms.classList.remove("error");
    termsError.classList.remove("visible");
    proceed.terms = true;
  }

  function shouldProceed(proceed) {
    for (let key in proceed) {
      if (!proceed[key]) {
        return false;
      }
    }
    return true;
  }
  return shouldProceed(proceed);
}

async function register(data) {
  try {
    const response = await fetch(`${BASE_URL}auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("response", response);
    if (response.status === 200 || 201 || 204) {
      const result = await response.json();
      console.log(result);
      handleSuccess();
    } else if (response.status === 403 || 404) {
      handleFailure("Taki uzytkownik istnieje, uzyj innego maila");
      return;
    }
    console.log("response-status", response.status);
  } catch (error) {
    handleFailure("Cos poszlo nie tak");
    console.log(error);
  }
  console.log("response1", response);
}
const handleSuccess = function () {
  main.classList.add("blur");
  popup.classList.add("showPopup");
  setTimeout(() => {
    main.classList.remove("blur");
    popup.classList.remove("showPopup");
    success.classList.add("show");
    setTimeout(() => {
      success.classList.remove("show");
      window.location.href = "confirm.html";
    }, 1500);
  }, 1500);
};

const handleFailure = function (message) {
  failed.innerHTML = message;
  failed.classList.add("show");
  setTimeout(() => {
    failed.classList.remove("show");
  }, 1500);
};
