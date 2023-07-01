const mysql = require('mysql2')

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: '***REMOVED***',
        database: 'employee_db'
      },
      console.log('Connected to the employee_db database.')
).promise()

class Queries {
    constructor () {}

}

module.exports = Queries