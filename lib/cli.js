const inquirer = require('inquirer')
const { mainMenuQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions } = require('./questions')
const Queries = require('../db/queries')

const query = new Queries

class CLI {
    constructor () {}

    run() {
        return inquirer
            .prompt(mainMenuQuestions)
            .then((res) => {
                switch(res.action) {
                    case 'View All Departments':
                        this.viewDepartments()
                        break
                    case 'View All Roles':
                        this.viewRoles()
                        break   
                    case 'View All Employees':
                        this.viewEmployees()
                        break 
                    case 'Add Department':
                        this.addDepartment()
                        break
                    case 'Add Role':
                        this.addRole()
                        break
                    case 'Add Employee':
                        this.addEmployee()
                        break
                    case 'Update Employee Role':
                        this.updateEmployeeRole()
                        break
                }
            })
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