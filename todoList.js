// JSON.stringify() - JavaScript obyektini və ya array-i JSON formatlı stringə çevirir.
// Məsələn, array və ya obyekt localStorage kimi yerlərə yazmaq üçün string etmək lazımdır.

// JSON.parse() - JSON formatlı stringi yenidən JavaScript obyektinə və ya array-ə çevirir.
// Məsələn, localStorage-dən oxunan string məlumatı real array və ya obyekt kimi istifadə etmək üçün parse edirik.

const form = document.querySelector("#todoAddForm")
const addInput = document.querySelector("#todoName")
const todoList = document.querySelector(".list-group")
const cardBody1 = document.querySelectorAll(".card-body")[0]
const cardBody2 = document.querySelectorAll(".card-body")[1]
const clearButton = document.querySelector("#todoClearButton")
const filterInput = document.querySelector("#todoSearch")

var todos = [];
runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", pageLoaded)
    cardBody2.addEventListener("click", removeTodoFromUI)
    clearButton.addEventListener("click", removeAllTodosFromEverywhere)
    filterInput.addEventListener("keyup", filterTodos)
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const myTodoList = document.querySelectorAll(".list-group-item")

    if (myTodoList.length > 0) {
        myTodoList.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display: block")
            }
            else {
            todo.setAttribute("style","display: none !important")//bootstrapda bir class none olmasina icaze vermir !important yazdiqda bunu aradan qaldirmaq olar
            }
        }
        )
    }
    else {
        showAlert("warning", "You don't have any todo...")
    }
}

function removeAllTodosFromEverywhere() {
    const myTodoList = document.querySelectorAll(".list-group-item");
    if (myTodoList.length > 0) {
        //ekrandan silme
        myTodoList.forEach(function (todo) {
            todo.remove();
        })
        //storagedan silme
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos))
        showAlert("success", "All todos removed successfully!")
    }
    else {
        showAlert("warning", "You don't have any todo...")
    }
}

function removeTodoFromUI(e) {
    //Ekrandan silme
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        //Local Storage'dan silme
        removeTodoFromStorage(todo.textContent);
        showAlert("success", "Your Todo has been removed...");
    }
}

function removeTodoFromStorage(removedTodo) {
    checkTodosOnStorage();
    todos.forEach(function (todo, index) {
        if (removedTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function pageLoaded() {
    checkTodosOnStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}

function addTodo(e) {
    console.log("Submit Event has been worked...")
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("danger", "please enter a valid input")
    }
    else {
        //UI'a elave etme
        addTodoToUI(inputText);
        //Storage elave eteme
        addTodoToStorage(inputText);
        showAlert("success", "Your todo added your list successfully!")

    }
    e.preventDefault(); //Submit ferqli bir sehifeye yonlendirdiyi ucun preventDefault ile bunun qarsisini aliriq..

}

function addTodoToUI(newTodo) {
    const li = document.createElement("li")
    li.className = "list-group-item d-flex justify-content-between"
    li.textContent = newTodo

    const a = document.createElement("a")
    a.href = "#"
    a.className = "delete-item"

    const i = document.createElement("i")
    i.className = "fa fa-remove"

    a.appendChild(i)
    li.appendChild(a)
    todoList.appendChild(li)

    addInput.value = "";
}

function addTodoToStorage(newTodo) {
    checkTodosOnStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos))

}

function checkTodosOnStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    const div = document.createElement("div")
    div.className = `alert alert-${type}`;
    div.role = "alert"
    div.textContent = message;

    cardBody1.appendChild(div)

    //asagidaki funksiya iki parametr alir -yerine yetireceyi metod ve vaxt.
    //birinci parametri ile div'imizi yox eledi, ikinci parametrinde ise bunu ne zaman edeceyini mueyyen etdi.
    setTimeout(function () {
        div.remove();
    }, 2500)
}

