/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {

  console.log("chamando getlist...");
  let url = 'http://127.0.0.1:5000/agendamentos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("resposta do servidor:", data);
      data.agenda.forEach(item => insertList(item.profissional, item.paciente, item.servico, item.valor, item.horario, item.data))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList();



/*
  --------------------------------------------------------------------------------------
  Função para enviar novo item ao servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (prof, pac, serv, price, time, data ) => {
  const formData = new FormData();
  formData.append('profissional', prof);
  formData.append('paciente', pac);
  formData.append('servico', serv);
  formData.append('valor', price);
  formData.append('horario', time);
  formData.append('data', data);

  let url = 'http://127.0.0.1:5000/agendamento';
  return fetch(url, {
    method: 'post',
    body: formData
  })
  .then (async (response) => {
    const body = await response.json();

    if (response.status === 200) {
      return {ok: true, data: body};
    }
    
    if (response.status === 409) {
      return {ok: false, conflict: true, mensagem: body.mensagem};
    }
    return {ok: false, mensagem: body.mensagem};
  })
  .catch((error) => {
    console.error('Error:', error);
    return {ok: false, mensagem: "Erro ao conectar com o servidor."};
  });
    
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão de remover
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
  Função para remover um item da tabela e do servidor
  --------------------------------------------------------------------------------------
*/

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("close")) {
    let row = e.target.parentElement.parentElement;
    const profissional = row.children[0].textContent.trim();
    const paciente = row.children[1].textContent.trim();

    if (confirm("Você tem certeza ?")) {
      deleteItem(profissional, paciente);
      row.remove();
      alert("Removido !");
    }
  }
});



/*
  --------------------------------------------------------------------------------------
  Função para deletar item no servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (profissional, paciente) => {
  console.log(profissional, paciente)
  let url = `http://127.0.0.1:5000/agendamento?profissional=${encodeURIComponent(profissional)}&paciente=${encodeURIComponent(paciente)}`;
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
  Função para adicionar um novo item  
  --------------------------------------------------------------------------------------
*/


const newItem = async () => {

  const btnAdicionar = document.querySelector(".addBtn");

  // Feedback visual para o usuário, disabilitando o botão e mostrando "Aguarde..."

  btnAdicionar.disabled = true;
  btnAdicionar.textContent = "Aguarde...";

  let prof = document.getElementById("newProfissional").value;
  let pac = document.getElementById("newPaciente").value;
  let serv = document.getElementById("newService").value;
  let price = document.getElementById("newPrice").value;
  let time = document.getElementById("newTime").value;
  let data = document.getElementById("newData").value;

  

  if (prof === '' || pac === '' || serv === '' || price === '' || time === '' || data === '') {
    alert("Preencha todos os campos !");
    
  
  
  // Restaura o botão

  btnAdicionar.disabled = false;
  btnAdicionar.textContent = "Adicionar";
  return;
  }

  const result = await postItem(prof,pac, serv, price, time, data);

  if (result.ok) {
    insertList(prof, pac, serv, price, time, data);
    alert("Agendamento feito com sucesso !");
  }
  else if (result.conflict) {
    alert("☣️" + result.mensagem)
  }
  else {
    alert("Erro: " + result.mensagem);
  }

  // Restaura o botão após a requisição

  btnAdicionar.disabled = false;
  btnAdicionar.textContent = "Adicionar";
  

}



/*
  --------------------------------------------------------------------------------------
  Função para inserir items na tabela
  --------------------------------------------------------------------------------------
*/
const insertList = (prof, pac, serv, price, time, data) => {

  let item = [prof, pac, serv, price, time, data]
  let table = document.getElementById('myTable');
  let row = table.insertRow();

  for (let i = 0; i < item.length; i++) {
    let cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  let actionCell = row.insertCell(-1);
  insertButton(actionCell)
  document.getElementById("newProfissional").value = "";
  document.getElementById("newPaciente").value = "";
  document.getElementById("newService").value = "";
  document.getElementById("newPrice").value = "";
  document.getElementById("newTime").value = "";
  document.getElementById("newData").value = "";


}

/* ------------------------------------------------------------
    Função para ocultar e mostrar a lista de agendamento
  -------------------------------------------------------------
*/

const toggleLista = () => {
  const container = document.getElementById("listaContainer");
  const botao = document.getElementById("btnMostrar");

  if (container.style.display === "none") {
    container.style.display = "block";
    botao.textContent = "Ocultar lista";
    
  } else {
    container.style.display = "none";
    botao.textContent = "Mostrar lista";
  }
}

const buscarItem = () => {
  const termo = document.getElementById("campoBusca").value.trim();

  if(termo === "") {
    alert("Por favor, insira um termo para a busca ! ");
    return;
  }

  // garante que a lista apareça
  document.getElementById("listaContainer").style.display = "block";
  document.getElementById("btnMostrar").textContent = "Ocultar lista";

  //limpa tabela antes de mostrar os resultados

  document.querySelectorAll("#myTable tr:not(:first-child)").forEach(tr => tr.remove());

  let url = `http://127.0.0.1:5000/agendamento?profissional=${encodeURIComponent(termo)}&paciente=${encodeURIComponent(termo)}`;

  fetch(url)
    .then(response => response.json().then(body => ({status: response.status, body})))
    .then(result => {

      if (result.status === 200) {
        result.body.agenda.forEach(item => insertList(item.profissional, item.paciente, item.servico, item.valor, item.horario, item.data));
      }else {
        alert(result.body.mensagem);
      }
    })
    .catch(error => console.error("Erro:", error));
}