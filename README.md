
# 📘 CRM Clínicas – Front-End

#### Interface web desenvolvida em HTML, CSS e JavaScript puro, funcionando como uma SPA (Single Page Application) para interação com a API de agendamentos.

O sistema permite:

 - Criar novos agendamentos

 - Listar todos os agendamentos

 - Buscar por profissional ou paciente

 - Remover agendamentos

 - Interagir com a API sem recarregar a página

 - Este repositório contém apenas o front-end da aplicação.


## 🚀 Tecnologias Utilizadas

 - **HTML5**

 - **CSS3**

 - **JavaScript (ES6+)**

 - **Fetch API**

 - **SPA sem frameworks**
## 📂 Estrutura do Projeto

![App Screenshot](https://i.ibb.co/cS1jrfRF/Captura-de-tela-2026-04-02-101617.png)
## 🖥️ Funcionalidades

✔ Criar agendamento

Formulário com campos:

 - Profissional

 - Paciente

 - Serviço

 - Valor

 - Horário

 - Data

Ao clicar em Adicionar, o front envia um POST para a API.

-------
✔ Listar agendamentos

Botão Mostrar lista exibe ou oculta a tabela.

Os dados são carregados via GET /agendamentos.

-----

✔ Buscar agendamentos

Campo de busca permite procurar por:

 - Nome do profissional

 - Nome do paciente

A busca usa:

 - GET /agendamento?profissional=termo&paciente=termo

---

✔ Remover agendamento

Cada linha da tabela possui um botão X.

Ao clicar:

 - Confirmação é exibida

 - O front envia um DELETE para a API

 - A linha é removida da tabela

---

## 🔗 Integração com a API

O front se comunica com a API através de requisições:

**GET /agendamentos**

Carrega todos os registros.

**POST /agendamento**

Cria um novo agendamento.

**GET /agendamento**

Busca por profissional ou paciente.

**DELETE /agendamento**

Remove um agendamento específico.

---


## 🧩 Como Executar o Front-End

1. Baixe ou clone o repositório.

2. Abra a pasta do projeto.

3. Clique duas vezes no arquivo:

```bash
  index.html
```
A página abrirá diretamente no navegador — não é necessário servidor.

⚠ Importante:

A API deve estar rodando em:

```bash
  http://127.0.0.1:5000
```




## 🎨 Design e Experiência

O front-end utiliza:

 - Layout moderno com Poppins

 - Paleta roxa elegante (#6d28d9)

 - Tabela responsiva

 - Inputs com foco animado

 - Botões com hover

 - SPA real (sem recarregar a página)
## 📸 Capturas de Tela

 - Tela inicial

![App Screenshot](https://i.ibb.co/JW5Q00Xb/Captura-de-tela-2026-04-02-110652.png)

 - Criando um agendamento

 ![App Screenshot](https://i.ibb.co/tppdMqBw/Captura-de-tela-2026-04-02-110950.png)
 
 - Lista de agendamentos

 ![App Screenshot](https://i.ibb.co/sphnbkcC/Captura-de-tela-2026-04-02-111152.png)

 - Busca 

 ![App Screenshot](https://i.ibb.co/V0dPbHGg/Captura-de-tela-2026-04-02-111412.png)
