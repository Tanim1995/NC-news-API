const db = require("../db/connection");

exports.fetchUsers = () => {
  const query = "SELECT * FROM users";

  return db.query(query).then((users) => {
    return users.rows;
  });
};
