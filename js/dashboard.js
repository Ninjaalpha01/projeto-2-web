document.addEventListener("DOMContentLoaded", function() {
    checkIfLoggedInAndRedirect();
    displayUserLists();

    document.getElementById("addListBtn").addEventListener("click", addNewList);
    document.getElementById("logoutBtn").addEventListener("click", logoutUser);
});

function checkIfLoggedInAndRedirect() {
    var user = localStorage.getItem("user");
    if (!user) {
        redirectToLoginPage();
    } else {
        displayUserName();
    }
}

function displayUserName() {
    var user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("userName").textContent = user.name;
}

function displayUserLists() {
    var currentUser = JSON.parse(localStorage.getItem("user"));
    var lists = currentUser.lists || [];
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
    
    var currentUser = JSON.parse(localStorage.getItem("user"));
    var newList = {
        id: crypto.randomUUID(),
        name: listName,
        functions: [],
        products: []
    };
    
    currentUser.lists.push(newList);
    updateCurrentUserInLocalStorage(currentUser);

    var listsContainer = document.getElementById("list-table").getElementsByTagName("tbody")[0];
    var newRow = createListTableRow(newList);
    listsContainer.appendChild(newRow);

    listNameInput.value = "";
}

function updateCurrentUserInLocalStorage(user) {
    var users = JSON.parse(localStorage.getItem("users"));
    var updatedUsers = users.map(function(element) {
        if (element.name === user.name) {
            element.lists = user.lists;
        }
        return element;
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
