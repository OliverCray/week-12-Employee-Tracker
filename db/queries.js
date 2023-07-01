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

    async selectDepartmentsQuery() {
        try {
            const [rows, fields] = await db.query('SELECT * FROM department')
            return rows
        } catch (err) {
            throw err
        }
    }

    async selectRolesQuery() {
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

    async selectEmployeesQuery() {
        try {
            const [rows, fields] = await db.query(
                `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee
                INNER JOIN role ON employee.role_id = role.id
                INNER JOIN department ON role.department_id = department.id
                LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
            )
            return rows
        } catch (err) {
            throw err
        }
    }

    async addDepartmentQuery(department) {
        try {
            await db.query('INSERT INTO department (name) VALUES (?)', [department.name])
            console.log(`Added ${department.name} to the list of departments`)
        } catch (err) {
            throw err
        }
    }

    async addRoleQuery(role) {
        try {
            await db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [role.title, role.salary, role.department_id])
            console.log(`Added ${role.title} to the list of roles`)
        } catch (err) {
            throw err
        }
    }

    async addEmployeeQuery(employee) {
        try {
            await db.query(
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', 
                [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]
            )
            console.log(`Added ${employee.first_name} ${employee.last_name} to the list of employees`)
        } catch (err) {
            throw err
        }
    }

    async updateEmployeeQuery(employee) {
        try {
            await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [employee.role_id, employee.employee_id])
            console.log('Updated employee record')
        } catch (err) {
            throw err
        }
    }

    async selectByManagerQuery(employee) {
        try {
            const [rows, fields] = await db.query(
                `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee 
                INNER JOIN role ON employee.role_id = role.id
                INNER JOIN department ON role.department_id = department.id
                INNER JOIN employee AS manager ON employee.manager_id = manager.id
                WHERE manager.id = ?`, [employee.manager_id]
            )
            return rows
        } catch (err) {
            throw err
        }
    }

    async selectByDepartmentQuery(department) {
        try {
            const [rows, fields] = await db.query(
                `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee
                INNER JOIN role ON employee.role_id = role.id
                INNER JOIN department ON role.department_id = department.id
                LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                WHERE department.id = ?`, [department.department_id]
            )
            return rows
        } catch (err) {
            throw err
        }
    }
}

module.exports = Queries