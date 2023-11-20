class User {
    constructor(id, nome, sobrenome, email, idade, foto) {
      this.id = id;
      this.nome = nome;
      this.sobrenome = sobrenome;
      this.email = email;
      this.idade = idade;
      this.foto = foto;
    }
  }
  
  let pageUsers = [];
  
  document.addEventListener("DOMContentLoaded", function () {
    fetchUsers();
  });
  
  function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        pageUsers = users.map(user => new User(user.id, user.name, user.username, user.email, user.phone));
        displayUsers();
      });
  }
  
  function displayUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    pageUsers.forEach(user => {
      const userElement = document.createElement('li');
      userElement.innerHTML = `
        <div>${user.nome} (${user.sobrenome})</div>
        <div>${user.email}</div>
        <div>${user.idade}</div>
        <img src="${user.foto}" alt="Foto do usuário" />
        <a href="#" onclick="removeUser(${user.id})"><i class="fa fa-trash"></i></a>
      `;
      userList.appendChild(userElement);
    });
  }
  
  
  function addUser() {
    const id = Date.now();
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;
    const foto = document.getElementById('foto').value;
  
    if (!nome) {
      alert('Por favor, insira o nome.');
      return;
    }
  
    if (!sobrenome) {
      alert('Por favor, insira o sobrenome.');
      return;
    }
  
    if (!email) {
      alert('Por favor, insira o e-mail.');
      return;
    } else {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email).toLowerCase())) {
        alert('Por favor, insira um e-mail válido.');
        return;
      }
    }
  
    if (!idade.value) {
        alert('Por favor, insira a idade.');
        return;
      } else if (isNaN(idade.value)) {
        alert('Por favor, insira um número válido para a idade.');
        return;
      } else if (idade.value <= 0 || idade.value > 110) {
        alert('Por favor, insira uma idade entre 1 a 110.');
        return;
      }
      
      
    if (!foto) {
      alert('Por favor, insira a foto.');
      return;
    }
   
  
    const newUser = new User(id, nome, sobrenome, email, idade, foto);
    pageUsers.push(newUser);
    displayUsers();
  }
  
  function removeUser(id) {
    pageUsers = pageUsers.filter(user => user.id !== id);
    displayUsers();
  }
  
  document.getElementById('btnAdicionar').addEventListener('click', function(event) {
    event.preventDefault();
    addUser();
  });