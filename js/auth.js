import { User } from './modules/user.js';

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes('login.html')) {
        var registerPageBtn = document.getElementById('registerPageBtn');
        var loginForm = document.getElementById('loginForm');
        registerPageBtn.addEventListener('click', redirectToRegisterPage);
        loginForm.addEventListener('submit', handleLoginFormSubmit);
    } else {
        var loginPageBtn = document.getElementById('loginPageBtn')
        var cadastroForm = document.getElementById('cadastroForm');
        
        loginPageBtn.addEventListener('click', redirectToLoginPage);
        cadastroForm.addEventListener('submit', handleCadastroFormSubmit);
    }
});

function handleCadastroFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validateCadastroForm(name, email)) {
        return;
    }

    const user = new User(name, email, password);

    addUser(user);

    document.getElementById('cadastroForm').reset();

    alert('Usuário cadastrado com sucesso!');
    redirectToLoginPage();
}

function validateCadastroForm(name, email) {
    const listUsers = getUsers();

    if (listUsers.find(user => user.email === email)) {
        alert('E-mail já cadastrado!');
        return false;
    }

    if (listUsers.find(user => user.name === name)) {
        alert('Nome de usuário já cadastrado!');
        return false;
    }

    return true;
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function addUser(user) {
    const listUsers = getUsers();
    listUsers.push(user);
    localStorage.setItem('users', JSON.stringify(listUsers));
}

function redirectToLoginPage() {
    window.location.href = 'login.html';
}

function redirectToRegisterPage() {
    window.location.href = 'register.html';
}

function handleLoginFormSubmit(event) {
    event.preventDefault();
    login();
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    const users = getUsers();
    const user = users.find(user => user.name === username && user.password === password);

    if (user) {
        console.log(user);
        localStorage.setItem("user", user.toJSON());
        window.location.href = "../pages/dashboard.html";
    } else {
        alert("Login Failed. Please check your username and password.");
    }
}
