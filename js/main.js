// DOM selection

// sign up
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");

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
  var userObj = {
    name: signupName.value.trim(),
    email: signupEmail.value.trim(),
    password: signupPassword.value.trim(),
  };
  userList.push(userObj);
  localStorage.setItem("users", JSON.stringify(userList));
}

// sign in
function signinUser() {
  for (let i = 0; i < userList.length; i++) {
    if (
      userList[i].email == signinEmail.value &&
      userList[i].password == signinPassword.value
    ) {
      localStorage.setItem("userName", userList[i].name);
      localStorage.setItem("isLoggedIn", "true");
      location.replace("home.html");
      break;
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

// function signupValidation(input) {
//     var Regex = {
//         signupName: ,
//         signupEmail: ,
//         signupPassword: ,
//     }
// }
