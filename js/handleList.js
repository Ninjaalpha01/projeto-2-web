import { User } from "./user.js";

document.addEventListener("DOMContentLoaded", function() {
    checkIfLoggedInAndRedirect();
    loadListInfo();
});

function checkIfLoggedInAndRedirect() {
    const user = User.fromJSON(sessionStorage.getItem("user"));
    if (!user) {
        redirectToLoginPage();
    } else {
        displayUserName();
    }
}

function loadListInfo() {
    const user = User.fromJSON(sessionStorage.getItem("user"));
    const listId = new URLSearchParams(window.location.search).get("id");
    const list = user.lists.find(list => list.id === listId);
    if (!list) {
        alert("Lista não encontrada!");
        redirectToDashboard();
    }
    document.getElementById("listName").textContent = list.name;
    list.items.forEach(item => addItemToList(item));
}