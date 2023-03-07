//To show the modal
$(function() {
    $("#login-btn").click(function(){
    $("#login-modal").fadeIn();
    })
  });

//To close login and register page when I clicked outside of the page
const modal = document.getElementById("login-modal");
document.addEventListener("click", (e) => {
        if(e.target == modal){
            modal.style.display = "none";
        }
    });

// To switch to the button(login button and register button)
  $(".tablinks").click(function(event) {
    showTab(event, $(this).attr("data-tab")); //read tabName
  })

  function showTab(event, tabName){
    $(".tabcontent").hide();
    $(".tablinks").removeClass("active");
    $("#" + tabName).show(); //#register or #login
    $(event.currentTarget).addClass("active");
  }
  
//To submit the information of login
$("#login").submit(function(ev){
  ev.preventDefault();

  let email = $("#loginEmail").val();
  let password = $("#loginPassword").val();

  if(!validateEmail(email)){
    $("#emailError").text("Please enter a valid email address.");
  }
  
  if(password.length < 8){
    $("#passwordError").text("Please enter a password which is bigger than 8 characters.");
  }

  if(validateEmail(email) && password.length > 8 ){
    $("#emailError").text("");
    $("#passwordError").text("");
  }
})

//login
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const passwordError = document.getElementById("passwordError");
const errorMessage = document.getElementById("errorMessage");
const getEmail = localStorage.getItem("email");
const getPassword = localStorage.getItem("password");
let email = $("#loginEmail").val();
let password = $("#loginPassword").val();

loginBtn.addEventListener("click", ()=> {
  if(loginEmail.value === getEmail && loginPassword.value === getPassword){
    location.replace("../afterLogin/afterLogin.html");
  }
  if(loginEmail.value !== getEmail || loginPassword.value !== getPassword){
    alert("Email or Password is wrong!");
  }
});

//To submit the information of Sign up
$("#register").click(function(ev){
  ev.preventDefault();

  let email = $("#registerEmail").val();
  let password = $("#registerPassword").val();
  let confirmPassword = $("#confirmPassword").val();

  if(!validateEmail(email)){
    $("#registerEmailError").text("Please enter a valid email address.");
  }else{
    $("#registerEmailError").text("");
  }

  if(password.length < 8){
    $("#registerPasswordError").text("Please enter a password which is more than 8 characters.");
  }else{
    $("#registerPasswordError").text("");
  }

  if(password !== confirmPassword){
    $("#confirmPasswordError").text("Passwords does not match!")
  }else{
    $("#confirmPasswordError").text("");
  }

  if(validateEmail(email) && password.length > 8 && password == confirmPassword){
    $("#registerEmailError").text("");
    $("#registerPasswordError").text("");
    $("#confirmPasswordError").text("");
  }
})

function validateEmail(email) {
  let regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

// to send the information of register page to login page
const registerName = document.getElementById("fullName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const form = document.getElementById("register");
const register= document.getElementById("register-btn");

  function passRegisterValue(){
    const setName = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    localStorage.setItem("setName", setName);
    localStorage.setItem("email", email);
    localStorage.setItem("password",password);
    location.replace("../login/login.html");
  }

