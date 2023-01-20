const create = document.querySelector(".btn");

const modulWindow = document.querySelector(".card");

const close = document.querySelector(".close");

const add = document.querySelector(".add");

const name = document.querySelector(".name");

const surname = document.querySelector(".surname");

const image = document.querySelector(".image");

const age = document.querySelector(".age");

const about = document.querySelector(".about");

const error = document.querySelector(".error");

const container = document.querySelector(".banner");

const names = document.querySelector(".names");

const signOut = document.querySelector(".sign_out");


create.addEventListener("click", e => {
    e.preventDefault();

    modulWindow.classList.add("modul");
}) 


close.addEventListener("click", e =>  {
    e.preventDefault();

    modulWindow.classList.remove("modul");
})


window.addEventListener("load", () => {
    if(!localStorage.getItem("student")) {
        localStorage.setItem("student", JSON.stringify([]))
    } else {
        const students = JSON.parse(localStorage.getItem("student"));

        const studentWithID = students.map((item, index) => {
            return {...item, id: index};
        })

        localStorage.setItem("student", JSON.stringify(studentWithID));

        const newStudents = JSON.parse(localStorage.getItem("student"));

        cardTemplate(newStudents);
    }
})


add.addEventListener("click", (e) => {
    e.preventDefault();

    if(name.value !== "" && surname.value !== "" && image.value !== "" && age.value !== "" && about.value !=="") {
        const allStudents = JSON.parse(localStorage.getItem("student"));

        localStorage.setItem("student", JSON.stringify(
            [
                ...allStudents,
                {
                    name: name.value,
                    surname: surname.value,
                    image: image.value,
                    age: age.value,
                    about: about.value
                }
            ]
        ))

        window.location.reload();

    } else {
        error.innerHTML = "Все поля должны быть заполнены!";
    }
})



function cardTemplate(base) {
    const template = base.map(({name, surname, image, age, about, id}) => {
        return `
            <div class="about_student">
                <img src=${image} alt=""/>

                <h2>Name: <span>${name}</span></h2>

                <h2>Surname: <span>${surname}</span></h2>

                <h2>Age: <span>${age}</span></h2>

                <h2>About: <span>${about}</span></h2>

                <div class="inline_buttons">
                    <button class="edit" onclick="editStudent(${id})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${id})">Delete</button>
                </div>
            </div>
        `
    }).join(" ");

    container.innerHTML = template;
}


function deleteStudent(id) {
    const student = JSON.parse(localStorage.getItem("student"));

    const filtered = student.filter(item => item.id !== id);

    localStorage.setItem("student", JSON.stringify(filtered));

    window.location.reload();
}


function editStudent(id) {
    const student = JSON.parse(localStorage.getItem("student"));

    const changes = student.map(item => {
        if(item.id === id) {
            return {
                ...item,
                name: prompt("Change name"),
                surname: prompt("Cgange surname"),
                age: prompt("Change age"),
                about: prompt("Change about")
            }
        } else {
            return item
        }
    })

    localStorage.setItem("student", JSON.stringify(changes));

    window.location.reload();
}


window.addEventListener("load", () => {
    if(!localStorage.getItem("access_token") || localStorage.getItem("access_token") === "false") {
        window.open("../auth.html", "_self");
    }
})


window.addEventListener("load", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    names.innerHTML = currentUser.name;
})


signOut.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.setItem("access_token", "false");
    localStorage.setItem("currentUser", null);
    window.open("../auth.html", "_self");
})