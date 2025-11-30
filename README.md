# CLI de Busca de Usuários — JSONPlaceholder

Este projeto é um aplicativo de linha de comando criado para praticar o uso de Axios, Inquirer e Chalk com Node.js. O objetivo é fazer consultas na API pública JSONPlaceholder e exibir os resultados de forma simples e interativa no terminal.

---

## Funcionalidades

Assim que o programa inicia, ele carrega os 10 usuários da API e apresenta um menu de opções. É possível realizar três tipos de busca:

### Buscar por nome
Permite pesquisar um usuário pelo nome completo. Caso encontrado, o programa oferece a opção de visualizar detalhes adicionais.

### Buscar por ID
Consulta um usuário usando seu ID (entre 1 e 10) e exibe todas as informações relacionadas.

### Buscar por e-mail
Localiza o usuário a partir do e-mail exatamente como consta na API.

O sistema inclui validações para aceitar apenas entradas válidas.

---

## Tecnologias utilizadas

- Node.js  
- Axios (requisições HTTP)  
- Inquirer.js (menus e perguntas interativas)  
- Chalk (estilização do texto no terminal)

---

## Como instalar e executar

### Requisitos
É necessário ter o Node.js instalado.

### Passo a passo

1. Clone o repositório:
   ```bash
   git clone [github.com](https://github.com/pjlkaw/Aprendendo-NPM.git)
   cd Aprendendo-NPM
