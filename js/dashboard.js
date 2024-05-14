import { User } from "./modules/user.js";
import { List } from "./modules/list.js";

document.addEventListener("DOMContentLoaded", function() {
    checkIfLoggedInAndRedirect();
    displayUserLists();

    document.getElementById("addListBtn").addEventListener("click", addNewList);
    document.getElementById("logoutBtn").addEventListener("click", logoutUser);
});

function checkIfLoggedInAndRedirect() {
    const user = User.fromJSON(sessionStorage.getItem("user"));
    if (!user) {
        redirectToLoginPage();
    } else {
        displayUserName();
    }
}

function displayUserName() {
    const user = User.fromJSON(sessionStorage.getItem("user"));
    document.getElementById("userName").textContent = user.name;
}

function displayUserLists() {
    const currentUser = User.fromJSON(sessionStorage.getItem("user"));
    if (!currentUser) {
        return; // Se não houver usuário logado, não há listas para exibir
    }

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

function addNewList() {
    var listNameInput = document.getElementById("listName");
    var listName = listNameInput.value.trim();
    
    if (listName === "") {
        alert("Por favor, insira um nome para a lista.");
        return;
    }
    
    var currentUser = User.fromJSON(sessionStorage.getItem("user"));
    var newList = new List(listName);
    

    currentUser.lists.push(newList);
    updateUserList(currentUser);

    var listsContainer = document.getElementById("list-table").getElementsByTagName("tbody")[0];
    var newRow = createListTableRow(newList);
    listsContainer.appendChild(newRow);

    listNameInput.value = "";
}

function updateUserList(newUser) {
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var updatedUsers = users.map(function(user) {
        if (user.name === newUser.name) {
            user.lists = newUser.lists;
        }
        return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
}

function logoutUser() {
    sessionStorage.removeItem("user");
    redirectToLoginPage();
}

function redirectToLoginPage() {
    window.location.href = "login.html";
}

function createListTableRow(list) {
    var newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${list.id}</td>
        <td>${list.name}</td>
        <td><button class="editBtn">Editar</button></td>
    `;

    var editBtn = newRow.querySelector(".editBtn");
    editBtn.addEventListener("click", function() {
        window.location.href = "editList.html?id=" + list.id;
    });

    return newRow;
}
