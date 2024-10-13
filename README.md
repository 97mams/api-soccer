## Football API Documentation

### Introduction
This API allows you to manage football teams, add new teams, update their statistics, and track performance (wins, losses, points).

### Contributing

Thank you for considering contributing to this project! Here are the steps to get started:

#### Clone your fork
- Clone your forked repository to your local machine using the following command:
  ```bash
  git clone https://github.com/97mams/api-soccer.git
  ```

#### Install dependencies
- Navigate to the project directory:
  ```bash
  cd api-soccer
  ```
- Install the project's dependencies using `pnpm`:
  ```bash
  pnpm install
  ```

#### For Database
- Create database
  ```bash
  npx sequelize db:create
  ```
- Run the migration
  ```bash
  npx sequelize db:migrate
  ```
- Seed database for default values name group
  ```bash
  npx sequelize db:seed:all
  ```
- run broject
  ```bash
  nodemon app.js | node app.js
  ```