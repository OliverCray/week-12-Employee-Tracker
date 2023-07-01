const inquirer = require('inquirer')
const { mainMenuQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions } = require('./questions')
const Queries = require('../db/queries')

const query = new Queries

class CLI {
    constructor () {}

    async run() {
        try {
            const res = await inquirer.prompt(mainMenuQuestions)
            switch(res.action) {
                case 'View All Departments':
                    await this.viewDepartments()
                    break
                case 'View All Roles':
                    await this.viewRoles()
                    break
                case 'View All Employees':
                    await this.viewEmployees()
                    break
                case 'Add Department':
                    await this.addDepartment()
                    break
                case 'Add Role':
                    await this.addRole()
                    break
                case 'Add Employee':
                    await this.addEmployee()
                    break
                case 'Update Employee Role':
                    await this.updateEmployeeRole()
                    break
            }
        } catch (err) {
            throw err
        }
    }

    async viewDepartments() {
        try {
            const result = await query.selectDepartments()
            console.table(result)
            this.run()
        } catch (err) {
            throw err
        }
    }
}

module.exports = CLI