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
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const cpf = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(cpf)
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
  let cpf = document.getElementById("txtCpf").value;
  let nome = document.getElementById("txtNome").value;
  let email = document.getElementById("txtEmail").value;
  let cep = document.getElementById("txtCep").value;
  let endereco = document.getElementById("txtLogradouro").value;
  let bairro = document.getElementById("txtBairro").value;
  let uf = document.getElementById("txtUF").value;
  let municipio = document.getElementById("txtMunicipio").value;
  let numero = document.getElementById("txtNumero").value;
  let complemento = document.getElementById("txtComplemento").value;

  if (cpf === '' || nome === '' || email === '') {
    alert("Digite o cpf, nome e e-mail do cliente!");
  }
  else {
    postItem(cpf, nome, email, cep, endereco, bairro, uf, municipio, numero, complemento)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (cpf, nome, email, cep, endereco, bairro, uf, municipio, numero, complemento) => {
  var item = [ cpf, nome, email, cep, endereco, bairro, uf, municipio, numero, complemento ]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
	cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("txtCpf").value = "";
  document.getElementById("txtNome").value = "";
  document.getElementById("txtEmail").value = "";
  document.getElementById("txtCep").value = "";
  document.getElementById("txtLogradouro").value = "";
  document.getElementById("txtBairro").value = "";
  document.getElementById("txtUF").value = "";
  document.getElementById("txtMunicipio").value = "";
  document.getElementById("txtNumero").value = "";
  document.getElementById("txtComplemento").value = "";

  removeElement()
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
  let url = 'http://127.0.0.1:5000/clientes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.clientes.forEach(cliente => insertList(cliente.cpf, cliente.nome, cliente.email, cliente.cep, cliente.endereco, cliente.bairro, cliente.uf, cliente.municipio, cliente.numero, cliente.complemento))
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
const postItem = async (cpf, nome, email, cep, endereco, bairro, uf, municipio, numero, complemento) => {
  const formData = new FormData();
  formData.append('cpf', cpf);
  formData.append('nome', nome);
  formData.append('email', email);
  formData.append('cep', cep);
  formData.append('endereco', endereco);
  formData.append('bairro', bairro);
  formData.append('uf', uf);
  formData.append('municipio', municipio);
  formData.append('numero', numero);
  formData.append('complemento', complemento);

  let url = 'http://127.0.0.1:5000/cliente';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
	.then((cliente) => {
	  insertList(cliente.cpf, cliente.nome, cliente.email, cliente.cep, cliente.endereco, cliente.bairro, cliente.uf, cliente.municipio, cliente.numero, cliente.complemento);
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
  let url = 'http://127.0.0.1:5000/cliente?cpf=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => {
		response.json()
		alert('Cliente removido!');
	})
    .catch((error) => {
      console.error('Ocorreu um erro ao excluir o cliente.\nErro:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para buscar o endereço pelo CEP
  --------------------------------------------------------------------------------------
*/

const buscaCep = () => {
	var cep = document.getElementById("txtCep").value;

	document.getElementById("txtLogradouro").value = "";
	document.getElementById("txtBairro").value = "";
	document.getElementById("txtUF").value = "";
	document.getElementById("txtMunicipio").value = "";

	let url = 'http://127.0.0.1:5000/consulta-cep?cep=' + cep;
	fetch(url, {
		method: 'get'
	})
    .then((response) => response.json())
	.then((endereco) => {
    if (endereco.mesage != "Não encontrado") {
      document.getElementById("txtLogradouro").value = endereco.logradouro;
      document.getElementById("txtBairro").value = endereco.bairro;
      document.getElementById("txtUF").value = endereco.uf;
      document.getElementById("txtMunicipio").value = endereco.localidade;
    }
    else{
      alert("Cep não encontrado!")
    }
	})
    .catch((error) => {
      console.error('Cep não encontrado:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()