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
            const result = await query.selectDepartmentsQuery()
            console.table(result)
            this.run()
        } catch (err) {
            throw err
        }
    }

    async viewRoles() {
        try {
            const result = await query.selectRolesQuery()
            console.table(result)
            this.run()
        } catch (err) {
            throw err
        }
    }

    async viewEmployees() {
        try {
            const result = await query.selectEmployeesQuery()
            console.table(result)
            this.run()
        } catch (err) {
            throw err
        }
    }

    async addDepartment() {
        try {
            const res = await inquirer.prompt(addDepartmentQuestions)
            await query.addDepartmentQuery(res)
            this.run()
        } catch (err) {
            throw err
        }
    }

    async addRole() {
        try {
            const departments = await query.selectDepartmentsQuery()
            const departmentQuestion = addRoleQuestions[2]
            departments.forEach((department) => {
                departmentQuestion.choices.push(
                    {
                        value: department.id,
                        name: department.name
                    }
                )
            })

            const res = await inquirer.prompt(addRoleQuestions)
            await query.addRoleQuery(res)
            this.run()
        } catch (err) {
            throw err
        }
    }

    async addEmployee() {
        try {
            const roles = await query.selectRolesQuery()
            const roleQuestion = addEmployeeQuestions[2]
            roles.forEach((role) => {
                roleQuestion.choices.push(
                    {
                        value: role.id,
                        name: role.title
                    }
                )
            })

            const emplooyes = await query.selectEmployeesQuery()
            const managerQuestion = addEmployeeQuestions[3]
            managerQuestion.choices.push(
                {
                    value: null,
                    name: 'None'
                }
            )

            emplooyes.forEach((employee) => {
                const manager_name = `${employee.first_name} ${employee.last_name}`
                managerQuestion.choices.push(
                    {
                        value: employee.id,
                        name: manager_name
                    }
                )
            })

            const res = await inquirer.prompt(addEmployeeQuestions)
            await query.addEmployeeQuery(res)
            this.run()
        } catch (err) {
            throw err
        }
    }
}

module.exports = CLI