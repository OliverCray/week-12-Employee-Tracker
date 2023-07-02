// Import and require mysql2 module
const mysql = require('mysql2')

// Connect to employee_db database using .promise() function to make queries asynchronous
const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: '52Pwj242F1&J4cN&',
        database: 'employee_db'
      },
      console.log('Connected to the employee_db database.')
).promise()

// Queries class, contains methods used for making queries to the database
class Queries {
    constructor () {}

    async selectDepartmentsQuery() {
        try {
            // Select all departments
            const [rows, fields] = await db.query('SELECT * FROM department')
            return rows
        } catch (err) {
            throw err
        }
    }

    async selectAllRolesQuery() {
        try {
            const [rows, fields] = await db.query(
                // Select all roles and their respective department's name'
                // LEFT JOIN ensures that the role still appears in the list of roles even after its department has been deleted
                // This allows the role to still be deleted from the database
                `SELECT role.id, role.title, department.name as department, role.salary
                FROM role
                LEFT JOIN department ON role.department_id = department.id`
            )
            return rows
        } catch (err) {
            throw err
        }
    }

    async selectRolesQuery() {
        try {
            const [rows, fields] = await db.query(
                // Select all roles with an associated department_id and their respective department's name'
                // INNER JOIN means that any role that does not have a department will not appear in the list of assignable roles
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
                // Select all employees and their respective role, department, salary and manager
                // LEFT JOIN ensures that the employee information appears even if their role or department has been deleted
                `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
            )
            return rows
        } catch (err) {
            throw err
        }
    }

    async selectByManagerQuery(employee) {
        try {
            const [rows, fields] = await db.query(
                // Select employees based on chosen manager, also displays their role, department and salary
                `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary
                FROM employee 
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
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
                // Select employees based on chosen department, also displays their role, salary and manager
                `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, 
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

    async selectCombinedSalaryQuery(department) {
        try {
            const [rows, fields] = await db.query(
                // Select the combined salary of the employees for the chosen department
                `SELECT department.name as department, SUM(role.salary) AS "total salary"
                FROM role
                INNER JOIN employee ON employee.role_id = role.id
                INNER JOIN department ON role.department_id = department.id
                WHERE department.id = ?`, [department.department_id]
            )
            return rows
        } catch (err) {
            throw err
        }
    }

    async addDepartmentQuery(department) {
        try {
            // Adds a new department to the database
            await db.query('INSERT INTO department (name) VALUES (?)', [department.name])
            console.log(`Added ${department.name} to the list of departments`)
        } catch (err) {
            throw err
        }
    }

    async addRoleQuery(role) {
        try {
            // Adds a new role to the database
            await db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [role.title, role.salary, role.department_id])
            console.log(`Added ${role.title} to the list of roles`)
        } catch (err) {
            throw err
        }
    }

    async addEmployeeQuery(employee) {
        try {
            await db.query(
                // Adds a new employee to the database
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', 
                [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]
            )
            console.log(`Added ${employee.first_name} ${employee.last_name} to the list of employees`)
        } catch (err) {
            throw err
        }
    }

    async updateEmployeeRoleQuery(employee) {
        try {
            // Updates an employee's role
            await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [employee.role_id, employee.employee_id])
            console.log(`Updated employee's role`)
        } catch (err) {
            throw err
        }
    }

    async updateEmployeeManagerQuery(employee) {
        try {
            // Updates an employee's manager
            await db.query('UPDATE employee SET manager_id = ? WHERE id = ?', [employee.manager_id, employee.employee_id])
            console.log(`Updated employee's manager`)
        } catch (err) {
            throw err
        }
    }

    async deleteDepartmentQuery(department) {
        try {
            // Delete the chosen department from the database
            await db.query('DELETE FROM department WHERE id = ?', [department.department_id])
            console.log('Department deleted')
        } catch (err) {
            throw err
        }
    }
    
    async deleteRoleQuery(role) {
        try {
            // Delete the chosen role from the database
            await db.query('DELETE FROM role WHERE id = ?', [role.role_id])
            console.log('Role deleted')
        } catch (err) {
            throw err
        }
    }

    async deleteEmployeeQuery(employee) {
        try {
            // Delete the chosen employee from the database
            await db.query('DELETE FROM employee WHERE id = ?', [employee.employee_id])
            console.log('Employee deleted')
        } catch (err) {
            throw err
        }
    }
}

module.exports = Queries