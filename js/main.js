// DOM selection

// sign up
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var Check = document.getElementById("Check");

// sign in
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

// home
var userName = document.getElementById("userName");

// users array
var userList = [];
if (localStorage.getItem("users")) {
  userList = JSON.parse(localStorage.getItem("users"));
}

// sign up
function signupUser() {
  var emailExists = false;
  for (var i = 0; i < userList.length; i++) {
    if (signupEmail.value.trim() === userList[i].email) {
      emailExists = true;
      break;
    }
  }

  if (!signupName.value || !signupEmail.value || !signupPassword.value) {
    inputsRequired();
  } else if (emailExists === true) {
    emailCheck();
  } else if (
    !signupValidation(signupName) ||
    !signupValidation(signupEmail) ||
    !signupValidation(signupPassword)
  ) {
    validationBox();
  } else {
    var userObj = {
      name: signupName.value.trim(),
      email: signupEmail.value.trim(),
      password: signupPassword.value.trim(),
    };
    userList.push(userObj);
    localStorage.setItem("users", JSON.stringify(userList));
    success();
  }
}

// sign in
function signinUser() {
  if (!signinEmail.value || !signinPassword.value) {
    inputsRequired();
  } else {
    for (let i = 0; i < userList.length; i++) {
      if (
        userList[i].email == signinEmail.value &&
        userList[i].password == signinPassword.value
      ) {
        localStorage.setItem("userName", userList[i].name);
        localStorage.setItem("isLoggedIn", "true");
        location.replace("home.html");
        break;
      } else {
        incorrect();
      }
    }
  }
}

// sign out
function signoutUser() {
  localStorage.removeItem("userName");
  localStorage.removeItem("isLoggedIn");
}

// display userName
var name = localStorage.getItem("userName");
if (name) {
  userName.innerHTML = `Welcome ${name}`;
} else {
  userName.innerHTML = `Welcome Guest`;
}

function signupValidation(input) {
  var Regex = {
    signupName: /^[A-Z]/,
    signupEmail:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    signupPassword:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  };
  if (Regex[input.id].test(input.value)) {
    return true;
  } else {
    return false;
  }
}

function success() {
  Check.innerHTML = `<span class="text-success m-3">Success</span>`;
}

function inputsRequired() {
  Check.innerHTML = `<span class="text-danger m-3">All inputs is required</span>`;
}

function emailCheck() {
  Check.innerHTML = `<span class="text-danger m-3">email already exists</span>`;
}

function incorrect() {
  Check.innerHTML = `<span class="text-danger m-3">incorrect email or password</span>`;
}

function validationBox() {
  Check.innerHTML = `<span class="text-danger m-3">Name must Start with a Capital letter<br>
    Email must be valid<br>
    Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, number and special character</span>`;
}
