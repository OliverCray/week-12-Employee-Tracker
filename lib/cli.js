const inquirer = require('inquirer')
const { mainMenuQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions } = require('./questions')

class CLI {
    constructor () {}

    run() {
        return inquirer
            .prompt(mainMenuQuestions)
            .then((res) => {
                switch(res.option) {
                    case 'View All Departments':
                        viewDepartments()
                        break
                    case 'View All Roles':
                        viewRoles()
                        break   
                    case 'View All Employees':
                        viewEmployees()
                        break 
                    case 'Add Department':
                        addDepartment()
                        break
                    case 'Add Role':
                        addRole()
                        break
                    case 'Add Employee':
                        addEmployee()
                        break
                    case 'Update Employee Role':
                        updateEmployeeRole()
                        break
                }
            })
    }
}

module.exports = CLI