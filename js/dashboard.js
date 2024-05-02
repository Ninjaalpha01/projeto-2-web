import { User } from "./models/user.js";
import { List } from "./modules/list.js";

document.addEventListener("DOMContentLoaded", function() {
    checkIfLoggedInAndRedirect();
    displayUserLists();

    document.getElementById("addListBtn").addEventListener("click", addNewList);
    document.getElementById("logoutBtn").addEventListener("click", logoutUser);
});

function checkIfLoggedInAndRedirect() {
    const user = new User(JSON.parse(localStorage.getItem("user")));
    if (!user) {
        redirectToLoginPage();
    } else {
        displayUserName();
    }
}

function displayUserName() {
    const user = new User(JSON.parse(localStorage.getItem("user")));
    document.getElementById("userName").textContent = user.name;
}

function displayUserLists() {
    const currentUser = new User(JSON.parse(localStorage.getItem("user")));
    var lists = currentUser.lists;
    var listsContainer = document.getElementById("list-table").getElementsByTagName("tbody")[0];
    clearListContainer(listsContainer);

    lists.forEach(function(list) {
        var newRow = createListTableRow(list);
        listsContainer.appendChild(newRow);
    });
}

function clearListContainer(container) {
    container.innerHTML = "";
}

function createListTableRow(list) {
    var newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${list.id}</td>
        <td>${list.name}</td>
        <td>Funções</td>
    `;
    return newRow;
}

function addNewList() {
    var listNameInput = document.getElementById("listName");
    var listName = listNameInput.value.trim();
    
    if (listName === "") {
        alert("Por favor, insira um nome para a lista.");
        return;
    }
    
    var currentUser = new User(localStorage.getItem("user"));
    var newList = new List(listName);
    
    currentUser.lists.push(newList);
    updateUserList(currentUser);

    var listsContainer = document.getElementById("list-table").getElementsByTagName("tbody")[0];
    var newRow = createListTableRow(newList);
    listsContainer.appendChild(newRow);

    listNameInput.value = "";
}

function updateUserList(newUser) {
    var users = JSON.parse(localStorage.getItem("users"));
    var updatedUsers = users.map(function(user) {
        if (user.name === newUser.name) {
            user.lists = newUser.lists;
        }
        return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
}

function logoutUser() {
    localStorage.removeItem("user");
    redirectToLoginPage();
}

function redirectToLoginPage() {
    window.location.href = "login.html";
}