const email = document.querySelector(".email");

const password = document.querySelector(".password");

const login = document.querySelector(".login");

const error = document.querySelector(".error");

const users = JSON.parse(localStorage.getItem("users"));


login.addEventListener("click", (e) => {
    e.preventDefault();

    const isUser = users.find(item => item.email === email.value);

    if(email.value !== "" && password.value !== "") {
        if(isUser) {
            localStorage.setItem("currentUser", JSON.stringify(isUser));
            localStorage.setItem("access_token", "true");
            window.open("../index.html", "_self");
        } else {
            error.innerHTML = "Данный пользователь не существует!";
        }
    } else {
        error.innerHTML = "Все поля должны быть заполнены";
    }
})



window.addEventListener("load", () => {
    if(localStorage.getItem("access_token") === "true") {
        window.open("../index.html", "_self");
    }
})