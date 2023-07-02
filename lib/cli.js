const inquirer = require('inquirer')
const { viewByManagerQuestions, viewByDepartmentQuestions, viewCombinedSalaryQuestions, mainMenuQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions, updateEmployeeManagerQuestions, deleteDepartmentQuestions, deleteRoleQuestions, deleteEmployeeQuestions } = require('./questions')
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
                case 'View Employees By Manager':
                    await this.viewByManager()
                    break
                case 'View Employees By Department':
                    await this.viewByDepartment()
                    break
                case 'View Combined Salaries By Department':
                    await this.viewCombinedSalary()
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
                case 'Update Employee Manager':
                    await this.updateEmployeeManager()
                    break
                case 'Delete Department':
                    await this.deleteDepartment()
                    break
                case 'Delete Role':
                    await this.deleteRole()
                    break
                case 'Delete Employee':
                    await this.deleteEmployee()
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

    async viewByManager() {
        try {
            const employees = await query.selectEmployeesQuery()
            const managerQuestion = viewByManagerQuestions[0]
            employees.forEach((employee) => {
                const manager_name = `${employee.first_name} ${employee.last_name}`
                managerQuestion.choices.push(
                    {
                        value: employee.id,
                        name: manager_name
                    }
                )
            })

            const res = await inquirer.prompt(viewByManagerQuestions)
            const result = await query.selectByManagerQuery(res)
            console.table(result)

            managerQuestion.choices = []

            this.run()
        } catch (err) {
            throw err
        }
    }
    
    async viewByDepartment() {
        try {
            const departments = await query.selectDepartmentsQuery()
            const departmentQuestion = viewByDepartmentQuestions[0]
            departments.forEach((department) => {
                departmentQuestion.choices.push(
                    {
                        value: department.id,
                        name: department.name
                    }
                )
            })

            const res = await inquirer.prompt(viewByDepartmentQuestions)
            const result = await query.selectByDepartmentQuery(res)
            console.table(result)

            departmentQuestion.choices = []

            this.run()
        } catch (err) {
            throw err
        }
    }

    async viewCombinedSalary() {
        try {
            const departments = await query.selectDepartmentsQuery()
            const departmentQuestion = viewCombinedSalaryQuestions[0]
            departments.forEach((department) => {
                departmentQuestion.choices.push(
                    {
                        value: department.id,
                        name: department.name
                    }
                )
            })

            const res = await inquirer.prompt(viewCombinedSalaryQuestions)
            const result = await query.selectCombinedSalaryQuery(res)
            console.table(result)

            departmentQuestion.choices = []

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

            departmentQuestion.choices = []

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

            const employees = await query.selectEmployeesQuery()
            const managerQuestion = addEmployeeQuestions[3]
            managerQuestion.choices.push(
                {
                    value: null,
                    name: 'None'
                }
            )

            employees.forEach((employee) => {
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

            roleQuestion.choices = []
            managerQuestion.choices = []

            this.run()
        } catch (err) {
            throw err
        }
    }

    async updateEmployeeRole() {
        try {
            const employees = await query.selectEmployeesQuery()
            const employeeQuestion = updateEmployeeRoleQuestions[0]
            employees.forEach((employee) => {
                const employee_name = `${employee.first_name} ${employee.last_name}`
                employeeQuestion.choices.push(
                    {
                        value: employee.id,
                        name: employee_name
                    }
                )
            })
    
            const roles = await query.selectRolesQuery()
            const roleQuestion = updateEmployeeRoleQuestions[1]
            roles.forEach((role) => {
                roleQuestion.choices.push(
                    {
                        value: role.id,
                        name: role.title
                    }
                )
            })
    
            const res = await inquirer.prompt(updateEmployeeRoleQuestions)
            await query.updateEmployeeRoleQuery(res)

            employeeQuestion.choices = []
            roleQuestion.choices = []

            this.run()            
        } catch (err) {
            throw err
        }
    }

    async updateEmployeeManager() {
        try {
            const employees = await query.selectEmployeesQuery()
            const employeeQuestion = updateEmployeeManagerQuestions[0]
            employees.forEach((employee) => {
                const employee_name = `${employee.first_name} ${employee.last_name}`
                employeeQuestion.choices.push(
                    {
                        value: employee.id,
                        name: employee_name
                    }
                )
            })

            const managerQuestion = updateEmployeeManagerQuestions[1]
            employees.forEach((employee) => {
                const manager_name = `${employee.first_name} ${employee.last_name}`
                managerQuestion.choices.push(
                    {
                        value: employee.id,
                        name: manager_name
                    }
                )
            })

            const res = await inquirer.prompt(updateEmployeeManagerQuestions)
            await query.updateEmployeeManagerQuery(res)

            employeeQuestion.choices = []
            managerQuestion.choices = []

            this.run()            
        } catch (err) {
            throw err
        }
    }

    async deleteDepartment() {
        try {
            const departments = await query.selectDepartmentsQuery()
            const departmentQuestion = deleteDepartmentQuestions[0]
            departments.forEach((department) => {
                departmentQuestion.choices.push(
                    {
                        value: department.id,
                        name: department.name
                    }
                )
            })

            const res = await inquirer.prompt(deleteDepartmentQuestions)
            await query.deleteDepartmentQuery(res)

            departmentQuestion.choices = []

            this.run()
        } catch (err) {
            throw err
        }
    }

    async deleteRole() {
        try {
            const roles = await query.selectRolesQuery()
            const roleQuestion = deleteRoleQuestions[0]
            roles.forEach((role) => {
                roleQuestion.choices.push(
                    {
                        value: role.id,
                        name: role.title
                    }
                )
            })

            const res = await inquirer.prompt(deleteRoleQuestions)
            await query.deleteRoleQuery(res)

            roleQuestion.choices = []

            this.run()
        } catch (err) {
            throw err
        }
    }

    async deleteEmployee() {
        try {
            const employees = await query.selectEmployeesQuery()
            const employeeQuestion = deleteEmployeeQuestions[0]
            employees.forEach((employee) => {
                const employee_name = `${employee.first_name} ${employee.last_name}`
                employeeQuestion.choices.push(
                    {
                        value: employee.id,
                        name: employee_name
                    }
                )
            })

            const res = await inquirer.prompt(deleteEmployeeQuestions)
            await query.deleteEmployeeQuery(res)

            employeeQuestion.choices = []

            this.run()
        } catch (err) {
            throw err
        }
    }
}

module.exports = CLI