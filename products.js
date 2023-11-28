class Product {
    constructor(id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.discountPercentage = discountPercentage;
      this.rating = rating;
      this.stock = stock;
      this.brand = brand;
      this.category = category;
      this.thumbnail = thumbnail;
      this.images = images;
    }
  }
  
  let pageProducts = [];
  
  function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    pageProducts.forEach(product => {
      const productElement = document.createElement('li');
      productElement.innerHTML = `
          <div>${product.title}</div>
          <div> (${product.category})</div>
          <div>${product.description}</div>
          <div>${product.price}</div>
          <div class="image-container"><img src="${product.thumbnail}" alt="${product.title}"></div>
          <a href="#" onclick="removeProduct(${product.id})"><i class="fa fa-trash"></i></a>
          `;
      productList.appendChild(productElement);
    });
  }
  function fetchProducts() {
    // Substitua a URL pela API desejada
    const apiUrl = "https://dummyjson.com/products"; // Alterei para o plural "products"
    // Fazendo uma requisição à API
    fetch(apiUrl)
      .then(response => response.json())
      .then(products => {
        console.log(products);
        // Itera sobre cada produto e adiciona ao pageProducts
        products.products.forEach(product => {
          const newProduct = new Product(
            product.id,
            product.title,
            product.description,
            product.price,
            product.discountPercentage,
            product.rating,
            product.stock,
            product.brand,
            product.category,
            product.thumbnail,
            product.images
          );
          pageProducts.push(newProduct);
        });
  
        // Mostra lista de produtos
        displayProducts();
      })
      .catch(error => console.error("Erro ao obter dados da API:", error));
  }
  
  
  document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
  });
  
  document.getElementById('btnAdicionar').addEventListener('click', function (event) {
    event.preventDefault();
    addProduct();
  });
  
  function addProduct() {
    // Obtenha os valores dos campos do formulário
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const price = document.getElementById('price').value.trim();
    const brand = document.getElementById('brand').value.trim();
    const category = document.getElementById('category').value.trim();
    const thumbnailUrl = document.getElementById('thumbnail').value.trim();

    // Validação dos campos
    if (!isValidString(title, 3, 50)) {
      alert('Por favor, insira um título válido (entre 3 e 50 caracteres).');
      return;
    }
  
    if (!isValidString(description, 3, 50)) {
      alert('Por favor, insira uma descrição válida (entre 3 e 50 caracteres).');
      return;
    }

    if (!isValidPositiveNumber(price) || parseFloat(price) >= 120) {
      alert('Por favor, insira um preço válido (número positivo menor do que 120).');
      return;
    }

  
    if (!isValidString(brand, 3, 50)) {
      alert('Por favor, insira uma marca válida (entre 3 e 50 caracteres).');
      return;
    }
  
    if (!isValidString(category, 3, 50)) {
      alert('Por favor, insira uma categoria válida (entre 3 e 50 caracteres).');
      return;
    }
  
  

    console.log(thumbnailUrl);
  
    if (!isValidUrl(thumbnailUrl)) {
      alert('Por favor, insira uma URL de imagem válida.');
      return;
    }
  
    // Criação do objeto de produto
    const simulatedProduct = {
      id: Date.now(),
      title: title,
      description: description,
      price: parseFloat(price),
      brand: brand,
      category: category,
      thumbnail: thumbnailUrl,
    };
    
    console.log(simulatedProduct);
  
    // Criação do objeto Product
    const newProduct = new Product(
      simulatedProduct.id,
      simulatedProduct.title,
      simulatedProduct.description,
      simulatedProduct.price,
      simulatedProduct.discountPercentage || 0,
      simulatedProduct.rating || 0, 
      simulatedProduct.stock || 0,
      simulatedProduct.brand,
      simulatedProduct.category,
      simulatedProduct.thumbnail
    );
    console.log(newProduct);
  
    // Adiciona o novo produto à lista de produtos
    pageProducts.push(newProduct);


    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('brand').value = '';
    document.getElementById('category').value = '';
    document.getElementById('thumbnail').value = '';

  
    // Mostra a lista de produtos atualizada
    displayProducts();
  }
  
  // Função auxiliar para validar URLs
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  function isValidString(value, minLength, maxLength) {
    const trimmedValue = value.trim();
    return trimmedValue.length >= minLength && trimmedValue.length <= maxLength;
  }
  
  function isValidPositiveNumber(value) {
    const floatValue = parseFloat(value);
    return !isNaN(floatValue) && floatValue > 0;
  }
  function removeProduct(id) {
    pageProducts = pageProducts.filter(product => product.id !== id);
    displayProducts();
  }
  
