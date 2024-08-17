const formlog = document.getElementById("login-form");
const BtnLog = document.getElementById("login-form-submit");
const ErrorMessage = document.getElementById("login-error-msg");
BtnLog.addEventListener("click", (e) => {
    e.preventDefault();
    const username = formlog.username.value;
    const password = formlog.password.value;
    if (username === "admin" && password === "devdarshan") { 
        alert("You have successfully logged in."); 
        document.location.href = "customers.html";
    } 
    else { 
        alert("Incorrect username and password. Try again!");
    }
})