import { User } from "./modules/user.js";
import { List } from "./modules/list.js";

document.addEventListener("DOMContentLoaded", function() {
    checkIfLoggedInAndRedirect();
    displayUserLists();

    document.getElementById("addListBtn").addEventListener("click", addNewList);
    document.getElementById("logoutBtn").addEventListener("click", logoutUser);
});

function checkIfLoggedInAndRedirect() {
    const currentUser = User.fromJSON(sessionStorage.getItem("user"));
    if (!currentUser) {
        redirectToLoginPage();
        return null;
    } else {
        displayUserName(currentUser.name);
        return currentUser;
    }
}


function displayUserLists() {
    const currentUser = checkIfLoggedInAndRedirect();
    if (!currentUser) {
        return;
    }

    var lists = currentUser.lists;
    var listsContainer = document.getElementById("list-table").getElementsByTagName("tbody")[0];
    clearListContainer(listsContainer);

    lists.forEach(function(list) {
        var newRow = createListTableRow(list);
        listsContainer.appendChild(newRow);
    });
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
    window.location.reload();
}

function displayUserName(userName) {
    document.getElementById("userName").textContent = userName;
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
        <td>${formatDate(list.createdAt)}</td>
        <td><button class="editBtn">Editar</button><button class="deleteBtn">Excluir</button></td>
    `;

    var editBtn = newRow.querySelector(".editBtn");
    editBtn.addEventListener("click", function() {
        window.location.href = "list.html?id=" + list.id;
    });

    var deleteBtn = newRow.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", function() {
        deleteList(list.id);
    });

    deleteBtn.style.backgroundColor = "red";

    return newRow;
}

function deleteList(listId) {
    var currentUser = User.fromJSON(sessionStorage.getItem("user"));
    var updatedLists = currentUser.lists.filter(function(l) {
        return l.id !== listId;
    });
    currentUser.lists = updatedLists;
    updateUserList(currentUser);
}

function formatDate(date) {
    if (typeof date === "string") {
        date = new Date(date);
    }

    var formattedDate = `${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())} - ${addLeadingZero(date.getDate())}/${addLeadingZero(date.getMonth() + 1)}/${date.getFullYear()}`;
    return formattedDate;
}

function addLeadingZero(number) {
    return number < 10 ? "0" + number : number;
}
