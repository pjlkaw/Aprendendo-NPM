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

    console.log(chalk.bgGray(chalk.blue(`${id} - ${data.name} `)));
    console.log(chalk.red("==========================="));
    return data;
  } catch {
    console.log(chalk.red("Erro"));
  }
}

async function iniciar() {
  for (let i = 1; i <= 10; i++) {
    await buscaUsuarios(i);
  }
  const { number } = await inquirer.prompt([
    {
      type: "input",
      name: "number",
      message:
        "Escolha o número de algum usuário para inspecionar (entre 1 e 10) ..: ",
      validate(value) {
        const num = Number(value);
        return num >= 1 && num <= 10 ? true : "Isso não é um número de 1 a 10";
      },
    },
  ]);

  const user = await buscaUsuarios(Number(number));

  if (user) {
    console.log(chalk.red(" USER ID - " + number));
    console.log(chalk.bgGray(chalk.hex("#FFE922")(` Nome: ${user.name} `)));
    console.log(chalk.bgGray(chalk.hex("#4EFF22")(` Usuário: ${user.username} `)));
    console.log(chalk.bgGray(chalk.hex("#22FFCF")(` Email: ${user.email} `)));
    console.log(chalk.bgGray(chalk.hex("#4A22FF")(` Telefone: ${user.phone} `)));
    console.log(chalk.bgGray(chalk.hex("#FF22DA")(` Website: ${user.website} `)));
    console.log(chalk.red("==========================="));
    console.log(chalk.red("FIM DO PROGRAMA"));
  }
}

iniciar();
