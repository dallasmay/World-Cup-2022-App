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
  test: (req, res) => {
    sequelize.query(`CREATE TABLE test (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
    );
    INSERT INTO test (name)
    VALUES ('Dallas');`).then(dbRes => res.status(200).send("Test successful")).catch((err) => console.log(err))
  }
}