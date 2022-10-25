require("dotenv").config();
const Sequelize = require("sequelize");

const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `CREATE TABLE users (
        id VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        team_name VARCHAR(100),
        score INT DEFAULT 0
    );`
      )
      .then((dbRes) => res.status(200).send("Test successful"))
      .catch((err) => console.log(err));
  },
  registerUser: (req, res) => {
    const { userId, name } = req.body;

    sequelize
      .query(
        `INSERT INTO users (id, name)
    VALUES ('${userId}', '${name}')`
      )
      .then(() => res.status(200).send())
      .catch((err) => console.log(err));
  },
  setTeamName: (req, res) => {
    const { userId, teamName } = req.body;

    sequelize
      .query(
        `UPDATE users
    SET team_name = $1
    WHERE id = $2`,
        {
          bind: [`${teamName}`, `${userId}`],
        }
      )
      .then(() => {
        res.status(200).send();
      })
      .catch((err) => console.log(err));
  },
  getUserInfo: (req, res) => {
    const { userId } = req.body;

    sequelize
      .query(`SELECT team_name FROM users WHERE id = '${userId}'`)
      .then((dbRes) => {
        console.log(dbRes);
        res.status(200).send(dbRes[0][0]);
      })
      .catch((err) => console.log(err));
  },
};
