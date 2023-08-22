const BASE_URL = "https://ds-elp2-be.herokuapp.com/";

const form = document.getElementById("form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const remember = document.querySelector("#rememberCheckbox");

const main = document.querySelector("main");
const popup = document.querySelector("popup"); //#popup? sprawdzic to!

const success = document.getElementById("success");
const failed = document.getElementById("failed");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateRegisterForm()) {
    const data = {
      email: email.value,
      password: password.value,
    };
    console.log("data", data);
    login(data);
  } else {
    console.log("error");
    return;
  }
});

async function login(data) {
  try {
    const response = await fetch(`${BASE_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("response.headers", response);
    const result = await response.json();
    if (result.message == "Unauthorized") {
      handleFailure();
    } else {
      handleSuccess(result);
    }
  } catch (error) {
    console.log(error);
  }
}

const handleSuccess = function (result) {
  main.classList.add("blur");
  popup.classList.add("showPopup");
  setTimeout(() => {
    main.classList.remove("blur");
    popup.classList.remove("showPopup");
    localStorage.setItem("access_token", result.access_token);
    success.classList.add("show");
    setTimeout(() => {
      success.classList.remove("show");
      if (remember.checked) {
        localStorage.setItem("remember_user", 1);
      } else {
        localStorage.setItem("remember_user", 0);
      }
      window.location.href = "profile.html";
    }, 1000);
  }, 1000);
};
const handleFailure = function () {
  failed.classList.add("show");
  setTimeout(() => {
    failed.classList.remove("show");
  }, 1000);
};

function validateRegisterForm() {
  let proceed = {
    email: true,
    password: true,
  };
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  ///^[A-Z][a-z]{1,19}$/;

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
