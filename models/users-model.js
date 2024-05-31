
const db = require("../db/connection");





exports.fetchUsers = ()=>{
const query = "SELECT * FROM users"

return db.query(query).then((users)=>{
    console.log(users)
    return users.rows
})
}