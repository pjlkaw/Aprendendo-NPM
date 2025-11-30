import chalk from "chalk";
import axios from "axios";
import inquirer from "inquirer";

console.log(
  chalk.yellow(
    chalk.bgGray(" JSON PlaceHolder com Chalk, Axios, Inquirer e Math ")
  )
);

// Fazer um menu de escolha com inquirer
// const random = Math.floor(Math.random() * 10) + 1;

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
const users = [];
async function iniciar() {
  for (let i = 1; i <= 10; i++) {
    const user = await buscaUsuarios(i);
    if (user) {
      users.push(user);
    }
  }

  const escolha = await inquirer.prompt([
    {
      type: "rawlist",
      name: "escolha",
      message: "Escolha o que quer fazer:",
      choices: [
        { name: chalk.yellow(" Busca por nome "), value: "1" },
        { name: chalk.yellow(" Busca por ID "), value: "2" },
        { name: chalk.yellow(" Busca por email "), value: "3"}
      ],
    },
  ]);
  let usuarioEncontrado;
  let number;
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
      console.log(chalk.green(`Usuário: ${usuarioEncontrado.username} `));
      console.log(chalk.green(`Telefone: ${usuarioEncontrado.phone}`));
      console.log(chalk.green(`Website: ${usuarioEncontrado.website}`));
      console.log(chalk.red("==========================="));
    } else {
      console.log(chalk.red("==========================="));
      console.log(chalk.red("FIM DO PROGRAMA"));
      console.log(chalk.red("==========================="));
    }
  } else if (escolha.escolha == "2") {
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
    informacoes();
  } else if(escolha.escolha == "3"){
    const resposta = async inquirer.prompt([
      {
        type: "input",
        name: "email",
        message: "Digite um email para pesquisar..:",
        validate(value) {
          
        }
      }
    ])




  }else {
    console.log("Nenhuma das alternativas");
    return;
  }

  async function informacoes() {
    const user = await buscaUsuarios(Number(number));

    if (user) {
      console.log(chalk.red(" USER ID - " + number));
      console.log(chalk.bgGray(chalk.hex("#FFE922")(` Nome: ${user.name} `)));
      console.log(
        chalk.bgGray(chalk.hex("#4EFF22")(` Usuário: ${user.username} `))
      );
      console.log(chalk.bgGray(chalk.hex("#22FFCF")(` Email: ${user.email} `)));
      console.log(
        chalk.bgGray(chalk.hex("#4A22FF")(` Telefone: ${user.phone} `))
      );
      console.log(
        chalk.bgGray(chalk.hex("#FF22DA")(` Website: ${user.website} `))
      );
      console.log(chalk.red("==========================="));
      console.log(chalk.red("FIM DO PROGRAMA"));
    }
  }
}

iniciar();
