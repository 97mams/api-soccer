Bien sûr ! Voici une version fusionnée de la documentation avec les étapes pour contribuer au projet :

---

## Football API Documentation

### Introduction
This API allows you to manage football teams, add new teams, update their statistics, and track performance (wins, losses, points).

### Base URL
- **Host:** `localhost`
- **Port:** `3000`

### Endpoints

#### 1. Retrieve the list of teams
- **Method:** `GET`
- **URL:** `/teams`
- **Description:** Returns a list of all stored football teams.

- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "Team Name",
      "win": 10,
      "lose": 5,
      "point": 30
    },
    ...
  ]
  ```

#### 2. Retrieve a specific team
- **Method:** `GET`
- **URL:** `/team?name={name}`
- **URL Parameter:**
  - `name` (string): The name of the team to retrieve.
- **Description:** Returns the details of a specific team.

- **Response:**
  ```json
  {
    "id": 1,
    "name": "Team Name",
    "win": 10,
    "lose": 5,
    "point": 30
  }
  ```

#### 3. Add a new team
- **Method:** `POST`
- **URL:** `/team`
- **Body:**
  ```json
  {
    "name": "Team Name"
  }
  ```
- **Description:** Adds a new team to the database.

- **Response:**
  ```json
  {
    "message": "Team successfully added",
    "team": {
      "id": 2,
      "name": "Team Name",
      "win": 0,
      "lose": 0,
      "point": 0
    }
  }
  ```

#### 4. Update a team's statistics
- **Method:** `PUT`
- **URL:** `/team?id={id}`
- **URL Parameter:**
  - `id` (number): The unique identifier of the team to update.
- **Body:**
  ```json
  {
    "win": 12,
    "lose": 3,
    "point": 36
  }
  ```
- **Description:** Updates an existing team's information, including the number of wins, losses, and points.

- **Response:**
  ```json
  {
    "message": "Team statistics updated",
    "team": {
      "id": 1,
      "name": "Team Name",
      "win": 12,
      "lose": 3,
      "point": 36
    }
  }
  ```

### Contributing

Thank you for considering contributing to this project! Here are the steps to get started:

#### 1. Fork the repository
- Click the "Fork" button at the top right of this repository's page.

#### 2. Clone your fork
- Clone your forked repository to your local machine using the following command:
  ```bash
  git clone https://github.com/97mams/api-soccer.git
  ```

#### 3. Install dependencies
- Navigate to the project directory:
  ```bash
  cd api-soccer
  ```
- Install the project's dependencies using `pnpm`:
  ```bash
  pnpm install
  ```

#### 4. Create a new branch
- Create a new branch to work on your changes:
  ```bash
  git checkout -b feature/your-feature-name
  ```
  Replace `your-feature-name` with a descriptive name for your feature or fix.

#### 5. Make your changes
- Make the necessary changes or additions to the codebase.

#### 6. Test your changes
- Ensure that your changes work as expected and do not break any existing functionality.

#### 7. Commit your changes
- Stage your changes:
  ```bash
  git add .
  ```
- Commit your changes with a descriptive message:
  ```bash
  git commit -m "Add feature/fix for [description of your change]"
  ```

#### 8. Push your branch
- Push your branch to your forked repository:
  ```bash
  git push origin feature/your-feature-name
  ```

#### 9. Create a pull request
- Go to the original repository and create a pull request from your forked repository's branch.

#### 10. Review and merge
- Your pull request will be reviewed. If everything looks good, it will be merged into the main branch.

### Usage Examples

1. **Retrieve the list of teams:**
   - Request: `GET http://localhost:3000/teams`

2. **Add a new team:**
   - Request: `POST http://localhost:3000/team`
   - Body:
     ```json
     {
       "name": "Real Madrid"
     }
     ```

3. **Update a team's statistics:**
   - Request: `PUT http://localhost:3000/team?id=1`
   - Body:
     ```json
     {
       "win": 15,
       "lose": 2,
       "point": 45
     }
