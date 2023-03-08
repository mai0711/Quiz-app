//to get register info
const actionBtn = document.getElementById("action-btn");
const fullName = document.getElementById("fullName");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const getName = localStorage.getItem("setName");
const getEmail = localStorage.getItem("email");
const getPassword = localStorage.getItem("password");
const passwordError = document.getElementById("passwordError");
const errorMessage = document.getElementById("errorMessage");

document.addEventListener('DOMContentLoaded', function() {
    loginEmail.value = getEmail;
    loginPassword.value = getPassword;
});

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

function validateEmail(email) {
    let regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

//after click login button
let email = $("#loginEmail").val();
let password = $("#loginPassword").val();

actionBtn.addEventListener("click", ()=> {
    if(loginEmail.value === getEmail && loginPassword.value === getPassword){
        location.replace("../afterLogin/afterLogin.html");
    }
    if(loginEmail.value !== getEmail || loginPassword.value !== getPassword){
        alert("Email or Password is wrong!");
    }
    localStorage.setItem("setName", getName);
});

//To close login and register page when I clicked outside of the page
const modal = document.getElementById("login-modal");
document.addEventListener("click", (e) => {
    if(e.target == modal){
        modal.style.display = "none";
    }
});