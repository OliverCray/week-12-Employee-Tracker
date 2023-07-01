const mysql = require('mysql2')

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: '52Pwj242F1&J4cN&',
        database: 'employee_db'
      },
      console.log('Connected to the employee_db database.')
).promise()

class Queries {
    constructor () {}

    async selectDepartments() {
        try {
            const [rows, fields] = await db.query('SELECT * FROM department')
            return rows
        } catch (err) {
            throw err
        }
    }

    async selectRoles() {
        try {
            const [rows, fields] = await db.query(
                `SELECT role.id, role.title, department.name as department, role.salary
                FROM role
                INNER JOIN department ON role.department_id = department.id`
            )
            return rows
        } catch (err) {
            throw err
        }
    }

    async selectEmployees() {
        try {
            const [rows, fields] = await db.query(
                `SELECT employee.*, role.title, department.name, role.salary, manager.first_name as manager_first_name, manager.last_name as manager_last_name
                FROM employee
                INNER JOIN role ON employee.role_id = role.id
                INNER JOIN department ON role.department_id = department.id
                LEFT JOIN employee AS manager on employee.manager_id = manager.id`
            )
            return rows
        } catch (err) {
            throw err
        }
    }
}

module.exports = Queries