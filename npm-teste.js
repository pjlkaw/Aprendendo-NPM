import chalk from "chalk";
import axios from "axios";
import inquirer from "inquirer";
import { number } from "@inquirer/prompts";

console.log(
  chalk.yellow(
    chalk.bgGray(" JSON PlaceHolder com Chalk, Axios, Inquirer e Math ")
  )
);

//   const random = Math.floor(Math.random() * 10) + 1;

async function buscaUsuarios(id) {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const data = response.data;

    console.log(chalk.bgGray(chalk.blue(`${id} - ${data.name} `)));
    console.log(chalk.red("==========================="));
  } catch {
    console.log(chalk.red("Erro"));
  }
}

async function iniciar() {
  for (let i = 1; i <= 10; i++) {
    await buscaUsuarios(i);
  }
  inquirer
    .prompt([
      {
        type: "input",
        name: "number",
        message:
          "Escolha o número de algum usuário para inspecionar (entre 1 e 10) ..: ",
      },
    ])
    .then((resposta) => {
      const valor = Number(resposta.number);
      if (isNaN(valor)) {
        console.log(resposta.number);
        console.log("Isso não é um número de 1 a 10");
      } else {
        buscaUsuarios(valor);
        // console.log(chalk.bgGray(chalk.hex("#f22")(`   ${data.username} `)));
        // console.log(chalk.bgGray(chalk.yellow(`     ${data.email} `)));
      }
    });
}

iniciar();