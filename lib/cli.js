// Import and require necessary modules
const inquirer = require('inquirer')
const { viewByManagerQuestions, viewByDepartmentQuestions, viewCombinedSalaryQuestions, mainMenuQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions, updateEmployeeManagerQuestions, deleteDepartmentQuestions, deleteRoleQuestions, deleteEmployeeQuestions, quitQuestions } = require('./questions')
const Queries = require('../db/queries')

// Create new instance of the Queries class
const query = new Queries

// CLI class, contains methods for viewing and managing the database based on user input
class CLI {
    constructor () {}

    async run() {
        try {
            // Prompt the user with mainMenuQuestions
            const res = await inquirer.prompt(mainMenuQuestions)
            // Run appropriate method based on user selection
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
                case 'Quit':
                    await this.quit()
                    break
            }
        } catch (err) {
            throw err
        }
    }

    async viewDepartments() {
        try {
            // Retrieve department information fron the database
            const result = await query.selectDepartmentsQuery()
            // Display the result in a table
            console.table(result)
            // Return to main meun
            this.run()
        } catch (err) {
            throw err
        }
    }

    // viewRoles and viewEmployees work in much the same way as viewDepartments
    async viewRoles() {
        try {
            const result = await query.selectAllRolesQuery()
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
            // Retrieve employee information from the database
            const employees = await query.selectEmployeesQuery()
            // Assign managerQuestion to the first question of viewByManagerQuestions
            const managerQuestion = viewByManagerQuestions[0]
            // Populate the list of employees
            employees.forEach((employee) => {
                const manager_name = `${employee.first_name} ${employee.last_name}`
                managerQuestion.choices.push(
                    {
                        value: employee.id,
                        name: manager_name
                    }
                )
            })

            // Prompt the user to choose a manager
            const res = await inquirer.prompt(viewByManagerQuestions)
            // Retrieve emplooyes of that manager from the database
            const result = await query.selectByManagerQuery(res)
            // Place result into a table
            console.table(result)

            // Empty choices array
            // Prevents duplicate entries if the same action is performed multiple times in one session
            managerQuestion.choices = []

            // Return to main menu
            this.run()
        } catch (err) {
            throw err
        }
    }
    
    // viewByDepartment and viewCombinedSalary work in much the same way as viewByManager
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
            // Prompt the user to add a department
            const res = await inquirer.prompt(addDepartmentQuestions)
            // Add the response to the list of departments
            await query.addDepartmentQuery(res)
            // Return to main menu
            this.run()
        } catch (err) {
            throw err
        }
    }

    async addRole() {
        try {
            // Retrieve information in much the same way as previous methods
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

            // Prompt the user to add a role
            const res = await inquirer.prompt(addRoleQuestions)
            // Add the role to the list of roles
            await query.addRoleQuery(res)

            // Empty choices array
            departmentQuestion.choices = []

            // Return to main menu
            this.run()
        } catch (err) {
            throw err
        }
    }

    // Works in much the same way as addRole
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

    // Update methods work in much the same way as the add methods
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
            // Retrieve departments from database
            const departments = await query.selectDepartmentsQuery()
            // Assign departmentQuestion to the first questions of deleteDepartmentQuestions
            const departmentQuestion = deleteDepartmentQuestions[0]
            // Populate list of departments
            departments.forEach((department) => {
                departmentQuestion.choices.push(
                    {
                        value: department.id,
                        name: department.name
                    }
                )
            })

            // Prompt the user to choose a department to delete
            const res = await inquirer.prompt(deleteDepartmentQuestions)
            // Delete selected department
            res.delete ? await query.deleteDepartmentQuery(res) : console.log('Process aborted')

            // Empty choices array
            departmentQuestion.choices = []

            // Return to main menu
            this.run()
        } catch (err) {
            throw err
        }
    }

    // deleteRole and deleteEmployee work in much the same way as deleteDepartment
    async deleteRole() {
        try {
            const roles = await query.selectAllRolesQuery()
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
            res.delete ? await query.deleteRoleQuery(res) : console.log('Process aborted')

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
            res.delete ? await query.deleteEmployeeQuery(res) : console.log('Process aborted')

            employeeQuestion.choices = []

            this.run()
        } catch (err) {
            throw err
        }
    }

    async quit() {
        try {
            const res = await inquirer.prompt(quitQuestions)
            res.quit ? (console.log('Closing application...'), process.exit()) : this.run()
        } catch (err) {
            throw err
        }
    }
}

module.exports = CLI