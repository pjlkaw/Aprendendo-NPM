import chalk from "chalk";
import axios from "axios";
import inquirer from "inquirer";

console.log(
  chalk.yellow(
    chalk.bgGray(" JSON PlaceHolder com Chalk, Axios, Inquirer e Math ")
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
  // console.log(chalk.green(`Nome: ${usuarioEncontrado.name}`));
  // console.log(chalk.green(`Email: ${usuarioEncontrado.email}`));
  // console.log(chalk.green(`Usuário: ${usuarioEncontrado.username} `));
  // console.log(chalk.green(`Telefone: ${usuarioEncontrado.phone}`));
  // console.log(chalk.green(`Website: ${usuarioEncontrado.website}`));
  // console.log(chalk.red("==========================="));
  // console.log(chalk.red("FIM DO PROGRAMA"));
  // 
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
        { name: chalk.yellow(" Busca Aleatória"), value: "4"}
      ],
    },
  ]);
  //valores de usuário
  let usuarioEncontrado;
  let number;
  //A ação e função
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
      console.log(chalk.green(`Nome: ${usuarioEncontrado.name}`));
      console.log(chalk.green(`Email: ${usuarioEncontrado.email}`));
      console.log(chalk.green(`Usuário: ${usuarioEncontrado.username} `));
      console.log(chalk.green(`Telefone: ${usuarioEncontrado.phone}`));
      console.log(chalk.green(`Website: ${usuarioEncontrado.website}`));
      console.log(chalk.red("==========================="));
      console.log(chalk.red("FIM DO PROGRAMA"));
      console.log(chalk.red("==========================="));
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
    async function informacoes() {
      const user = await buscaUsuarios(Number(number));

      if (user) {
        console.log(chalk.red(" USER ID - " + number));
        console.log(chalk.bgGray(chalk.hex("#FFE922")(` Nome: ${user.name} `)));
        console.log(
          chalk.bgGray(chalk.hex("#4EFF22")(` Usuário: ${user.username} `))
        );
        console.log(
          chalk.bgGray(chalk.hex("#22FFCF")(` Email: ${user.email} `))
        );
        console.log(
          chalk.bgGray(chalk.hex("#4A22FF")(` Telefone: ${user.phone} `))
        );
        console.log(
          chalk.bgGray(chalk.hex("#FF22DA")(` Website: ${user.website} `))
        );
        console.log(chalk.red("==========================="));
        console.log(chalk.red("FIM DO PROGRAMA"));
        console.log(chalk.red("==========================="));
      }
    }
    informacoes();
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
        console.log(chalk.green(`Nome: ${user.name}`));
        console.log(chalk.green(`Email: ${user.email}`));
        console.log(chalk.green(`Usuário: ${user.username} `));
        console.log(chalk.green(`Telefone: ${user.phone}`));
        console.log(chalk.green(`Website: ${user.website}`));
        console.log(chalk.red("==========================="));
        console.log(chalk.red("FIM DO PROGRAMA"));
        console.log(chalk.red("==========================="));
      })
      .catch((error) => {
        console.log(chalk.red("Erro"));
        return iniciar();
      });
  }
  else {
    console.log("Nenhuma das alternativas");
    return iniciar();
  }
}

iniciar();
