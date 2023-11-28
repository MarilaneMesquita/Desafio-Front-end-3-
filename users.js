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

function displayUsers() {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  pageUsers.forEach(user => {
    const userElement = document.createElement('li');
    userElement.innerHTML = `
        <div>${user.nome}</div>
        <div> (${user.sobrenome})</div>
        <div>${user.email}</div>
        <div>${user.idade}</div>
        <div class="image-container"><img src="${user.foto}"></div>
        <a href="#" onclick="removeUser(${user.id})"><i class="fa fa-trash"></i></a>
      `;
    userList.appendChild(userElement);
  });
}
function fetchUsers() {
  // Substitua a URL pela API desejada
  const apiUrl = "https://dummyjson.com/users";
  // Fazendo uma requisição à API
  fetch(apiUrl)
    .then(response => response.json())
    .then(users => {
      // Itera sobre a lista de usuários e cria elementos HTML
      users.users.forEach(user => {
        pageUsers.push(new User(user.id, user.firstName, user.lastName, user.email, user.age, user.image));
      });
      console.log(pageUsers);
      // Mostra lista de usuários
      displayUsers();
    })
    .catch(error => console.error("Erro ao obter dados da API:", error));
}


document.addEventListener("DOMContentLoaded", function () {
  fetchUsers();
});

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

  if (!idade) {
    alert('Por favor, insira a idade.');
    return;
  } else if (isNaN(idade)) {
    alert('Por favor, insira um número válido para a idade.');
    return;
  } else if (parseInt(idade) <= 0 || parseInt(idade) > 110) {
    alert('Por favor, insira uma idade entre 1 a 110.');
    return;
  }
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  const reader = new FileReader();
  reader.onloadend = function() {}
  const newUser = new User(id, nome, sobrenome, email, idade, foto);
  pageUsers.push(newUser);


  // Limpa os campos do formulário após adicionar o usuário
  document.getElementById('nome').value = '';
  document.getElementById('sobrenome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('idade').value = '';
  document.getElementById('foto').value = '';




  displayUsers();
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}


function removeUser(id) {
  pageUsers = pageUsers.filter(user => user.id !== id);
  displayUsers();
}
displayUsers();


document.getElementById('btnAdicionar').addEventListener('click', function (event) {
  event.preventDefault();
  addUser();
});


function removeUserByName() {
  const nomeUsuario = document.getElementById('inputUsuario').value;
  
  if (!nomeUsuario) {
    alert('Por favor, digite um nome de usuário.');
    return;
  }

  const usuario = pageUsers.find(user => user.nome === nomeUsuario);

  if (!usuario) {
    alert('Usuário não encontrado.');
    return;
  }

  pageUsers = pageUsers.filter(user => user.id !== usuario.id);
  displayUsers();
  document.getElementById('inputUsuario').value = ''; // Limpa o campo de entrada
}
