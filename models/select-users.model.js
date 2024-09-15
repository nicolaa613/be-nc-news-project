const db = require("../db/connection")

exports.selectUsers = () => {
    return db.query('SELECT * FROM users')
    .then((data) => {
        const usersData = data.rows
        return usersData
    })
}