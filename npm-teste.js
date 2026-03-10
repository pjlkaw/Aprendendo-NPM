import chalk from "chalk"; // CORES
import axios from "axios";  //API
import inquirer from "inquirer"; //INPUT
import Groq from "groq-sdk"; //AI

import 'dotenv/config'

console.log(
  chalk.yellow(
    chalk.bgGray(" JSON PlaceHolder com Chalk, Axios, Inquirer, Math e Implementação de IA")
  )
);

async function buscaUsuarios(id) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const data = response.data;

    console.log(chalk.bgGray(chalk.blue(`${id} - ${data.name} `)));
    console.log(chalk.red("==========================="));
    return data;
  } catch {
    console.log(chalk.red("Erro"));
    return null;
  }
}
const users = []; // usuarios encontrados - usado para verificar se há valores em certo usuario ou não e outras coisas
async function iniciar() {
  for (let i = 1; i <= 10; i++) {
    const user = await buscaUsuarios(i);
    if (user) {
      users.push(user);
    }
  }
  //
  // INFORMAÇÕES DE UM USUARIO - PADRONIZAÇÃO
  function informacoes(usuarioEncontrado) {
    console.log(chalk.green(`Nome: ${usuarioEncontrado.name}`));
    console.log(chalk.green(`Email: ${usuarioEncontrado.email}`));
    console.log(chalk.green(`Usuário: ${usuarioEncontrado.username} `));
    console.log(chalk.green(`Telefone: ${usuarioEncontrado.phone}`));
    console.log(chalk.green(`Website: ${usuarioEncontrado.website}`));
    console.log(chalk.red("==========================="));
    console.log(chalk.red("FIM DO PROGRAMA"));
    console.log(chalk.red("==========================="));
  }
  //Escolha de função para busca
  const escolha = await inquirer.prompt([
    {
      type: "rawlist",
      name: "escolha",
      message: "Escolha o que quer fazer:",
      choices: [
        { name: chalk.yellow(" Busca por nome "), value: "1" },
        { name: chalk.yellow(" Busca por ID "), value: "2" },
        { name: chalk.yellow(" Busca por email "), value: "3" },
        { name: chalk.yellow(" Busca Aleatória "), value: "4" },
        { name: chalk.yellow(" Busca com AI "), value: "5" },
      ],
    },
  ]);
  //valores de usuário
  let usuarioEncontrado;
  let number;
  //Busca por nome
  if (escolha.escolha == "1") {
    const resposta = await inquirer.prompt([
      {
        type: "input",
        name: "nome",
        message: "Escreva o nome de algum usuário da lista para pesquisar..:",
        validate(value) {
          usuarioEncontrado = users.find(
            (user) => user.name.toLowerCase() === value.toLowerCase()
          );
          return usuarioEncontrado
            ? true
            : "Digite um nome válido ou reveja sua escrita";
        },
      },
    ]);
    console.log(chalk.red("==========================="));
    console.log(chalk.green(`\nUsuário encontrado: ${usuarioEncontrado.name}`));
    console.log(chalk.magenta(`Email: ${usuarioEncontrado.email}`));
    console.log(chalk.red("==========================="));
    //perguntar se usuario quer mais informações ou não
    const respostaExtra = await inquirer.prompt([
      {
        type: "confirm",
        name: "input",
        message: "Gostaria de mais informações desse usuário?",
        default: true,
      },
    ]);
    if (respostaExtra) {
      informacoes(usuarioEncontrado);
    } else {
      console.log(chalk.red("==========================="));
      console.log(chalk.red("FIM DO PROGRAMA"));
      console.log(chalk.red("==========================="));
    }
  }
  //Busca por ID
  else if (escolha.escolha == "2") {
    const resposta = await inquirer.prompt([
      {
        type: "input",
        name: "number",
        message:
          "Escolha o número de algum usuário para inspecionar (entre 1 e 10) ..: ",
        validate(value) {
          const num = Number(value);
          return num >= 1 && num <= 10
            ? true
            : "Isso não é um número de 1 a 10";
        },
      },
    ]);
    number = resposta.number;
    async function informacoesID() {
      const user = await buscaUsuarios(Number(number));

      if (user) {
        console.log(chalk.green(`Nome: ${user.name}`));
        console.log(chalk.green(`Email: ${user.email}`));
        console.log(chalk.green(`Usuário: ${user.username} `));
        console.log(chalk.green(`Telefone: ${user.phone}`));
        console.log(chalk.green(`Website: ${user.website}`));
        console.log(chalk.red("==========================="));
        console.log(chalk.red("FIM DO PROGRAMA"));
        console.log(chalk.red("==========================="));
      }
    }
    informacoesID();
  }
  //Busca por email
  else if (escolha.escolha == "3") {
    const resposta = await inquirer.prompt([
      {
        type: "input",
        name: "email",
        message: "Digite um email para pesquisar..:",
        validate(value) {
          usuarioEncontrado = users.find(
            (user) => user.email.toLowerCase() === value.toLowerCase()
          );
          return usuarioEncontrado
            ? true
            : "Digite um email valido ou reveja sua escrita";
        },
      },
    ]);
    console.log(chalk.green(`Nome: ${usuarioEncontrado.name}`));
    console.log(chalk.green(`Email: ${usuarioEncontrado.email}`));
    console.log(chalk.green(`Usuário: ${usuarioEncontrado.username} `));
    console.log(chalk.green(`Telefone: ${usuarioEncontrado.phone}`));
    console.log(chalk.green(`Website: ${usuarioEncontrado.website}`));
    console.log(chalk.red("==========================="));
    console.log(chalk.red("FIM DO PROGRAMA"));
    console.log(chalk.red("==========================="));
  }
  //Busca aleatória
  else if (escolha.escolha == "4") {
    const random = Math.floor(Math.random() * 10) + 1;
    buscaUsuarios(random)
      .then((user) => {
        informacoes(user);
      })
      .catch((error) => {
        console.log(chalk.red("Erro"));
        return iniciar();
      });
  } 
  //Busca por IA
  else if (escolha.escolha == "5") {
    
    const resposta = await inquirer.prompt([
      {
        type: "input",
        name: "number",
        message:
          "Selecione o ID da pessoa para a IA fazer um resumo das características..:",
        validate(value) {

          const num = Number(value);
          return num >= 1 && num <= 10 ? true : "Insira um ID válido!"
        },
      },
    ]);
    const id = Number(resposta.number)
    const user = users.find(u => u.id === id)
      if (!user) { //validação
        console.log(chalk.red("Usuário não encontrado"))
        return
      }

      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

      async function getGroqChatCompletion() {
        return groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `
                Faça um resumo sobre o usúario em português, faça um texto corrido e sem formatação alguma, apenas acentos e sem caracteres como "*", "()" e etc
                
                Informações do usuário:

                Nome: ${user.name}
                Username: ${user.username}
                Email: ${user.email}
                Cidade: ${user.address.city}
              `,
            },
          ],
          model: "openai/gpt-oss-20b",
        });
      }
      
      console.log(chalk.yellow("\nResumo gerado pela IA:\n"));
      async function main() {
        const chatCompletion = await getGroqChatCompletion();
        console.log(chatCompletion.choices[0]?.message?.content || "");
        console.log(chalk.yellow("\n======================\n"));
      }
      main()
  }
  
  
  else {
    console.log("Nenhuma das alternativas");
    return iniciar();
  }
}
//FAZER IMPLEMENTAÇÃO DE IA PARA COMENTAR UM TEXTO DESCREVENDO A PESSOA SELECIONADA
iniciar();
