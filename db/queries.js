const mysql = require('mysql2')

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: '52Pwj242F1&J4cN&',
        database: 'employee_db'
      },
      console.log('Connected to the employee_db database.')
)
