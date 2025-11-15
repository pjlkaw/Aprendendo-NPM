import chalk from "chalk";
import axios from "axios";
import inquirer from "inquirer";

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

    console.log(chalk.bgGray(chalk.blue(`     ${data.name} `)));
    console.log(chalk.bgGray(chalk.hex("#f22")(` ${id} - ${data.username} `)));
    console.log(chalk.bgGray(chalk.yellow(`     ${data.email} `)));
    console.log(chalk.red("==========================="));
  } catch {
    console.log(chalk.red("Erro"));
  }
}

for (let i = 1; i <= 10; i++) {
  await buscaUsuarios(i);
}
