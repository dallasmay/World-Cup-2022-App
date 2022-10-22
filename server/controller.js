require("dotenv").config();
const Sequelize = require("sequelize");

const { CONNECTION_STRING,  } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize.query(`CREATE TABLE users (
        id VARCHAR(50) PRIMARY KEY NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        team_name VARCHAR(100),
        score INT DEFAULT 0
    );`).then(dbRes => res.status(200).send("Test successful")).catch((err) => console.log(err))
  },
  registerUser: (req, res) => {
    const { userId, name } = req.body;

    sequelize.query(`INSERT INTO users (id, name)
    VALUES ('${userId}', '${name}')`);
  }
}