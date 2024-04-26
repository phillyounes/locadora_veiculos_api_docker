/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão aluga/devolve para cada item da lista
  --------------------------------------------------------------------------------------
*/
const alugarButton = (parent, alugado) => {
	let img = document.createElement("img");
	img.style.width = "20px";
	img.style.height = "20px";
	parent.style.textAlign = "center";
	if (alugado == true) {
		img.src = "https://cdn-icons-png.flaticon.com/512/126/126470.png";
		img.className = "devolve";
	}
	else {
		img.src = "https://cdn-icons-png.flaticon.com/512/126/126469.png";
		img.className = "aluga";
	}
	parent.appendChild(img);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const placa = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(placa)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para alugar um item da lista de acordo com o click no botão aluga
  --------------------------------------------------------------------------------------
*/
const alugaElement = () => {
  let aluga = document.getElementsByClassName("aluga");
  let i;
  for (i = 0; i < aluga.length; i++) {
    aluga[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const placa = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Deseja alugar o veículo?")) {
        alugaItem(placa);
		alert("O carro foi alugado!");
		location.reload();
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para alugar um item da lista de acordo com o click no botão devolve
  --------------------------------------------------------------------------------------
*/
const devolveElement = () => {
  let devolve = document.getElementsByClassName("devolve");
  let i;
  for (i = 0; i < devolve.length; i++) {
    devolve[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const placa = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Deseja realizar a devolução do veículo?")) {
        devolveItem(placa);
		alert("O carro foi devolvido!");
		location.reload();
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let placa = document.getElementById("txtPlaca").value;
  let nome = document.getElementById("txtNome").value;
  let marca = document.getElementById("txtMarca").value;
  let modelo = document.getElementById("txtModelo").value;

  if (placa === '' || nome === '' || marca === '' || modelo === '') {
    alert("Digite a placa, nome, marca e modelo do carro!");
  }
  else {
    postItem(placa, nome, marca, modelo)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (placa, nome, marca, modelo, alugado) => {
  var item = [ placa, nome, marca, modelo, alugado ]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    if (i!=4){
		cel.textContent = item[i];
	}
	else {
		alugarButton(cel, alugado);
	}
  }
  insertButton(row.insertCell(-1))
  document.getElementById("txtPlaca").value = "";
  document.getElementById("txtNome").value = "";
  document.getElementById("txtMarca").value = "";
  document.getElementById("txtModelo").value = "";

  removeElement()
  alugaElement()
  devolveElement()
}







/* --------------------------------------------------------------------------------------
  CHAMADAS AOS ENDPOINTS
  -------------------------------------------------------------------------------------- */

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/carros';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.carros.forEach(carro => insertList(carro.placa, carro.nome, carro.marca, carro.modelo, carro.alugado))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (placa, nome, marca, modelo) => {
  const formData = new FormData();
  formData.append('placa', placa);
  formData.append('nome', nome);
  formData.append('marca', marca);
  formData.append('modelo', modelo);

  let url = 'http://127.0.0.1:5000/carro';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
	.then((carro) => {
	  insertList(carro.placa, carro.nome, carro.marca, carro.modelo, carro.alugado);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/carro?placa=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para marcar um carro como alugado via requisição PUT
  --------------------------------------------------------------------------------------
*/
const alugaItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/carro/aluga?placa=' + item;
  fetch(url, {
    method: 'put'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para marcar um carro como devolvido via requisição PUT
  --------------------------------------------------------------------------------------
*/
const devolveItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/carro/devolve?placa=' + item;
  fetch(url, {
    method: 'put'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()