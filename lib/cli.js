const inquirer = require('inquirer')
const { mainMenuQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions } = require('./questions')

class CLI {
    constructor () {}

    run() {
        return inquirer
            .prompt(mainMenuQuestions)
            .then((res) => {

            })
    }
}

module.exports = CLI