const mainMenuQuestions = [
    {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View Employees By Manager",
            "View Employees By Department",
            "View Combined Salaries By Department",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Delete Department",
            "Delete Role",
            "Delete Employee",
            "Quit"
        ]
    }
]

const viewByManagerQuestions = [
    {
        type: "list",
        name: "manager_id",
        message: "Select an employee to see who, if anyone, they manage",
        choices: []
    }
]

const viewByDepartmentQuestions = [
    {
        type: "list",
        name: "department_id",
        message: "Select a department to see its employees",
        choices: []
    }
]

const viewCombinedSalaryQuestions = [
    {
        type: "list",
        name: "department_id",
        message: "Select a department to see the combined salary of its employees",
        choices: []
    }
]

const addDepartmentQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter the name of the new department"
    }
]

const addRoleQuestions = [
    {
        type: "input",
        name: "title",
        message: "Enter the title of the new role"
    },
    {
        type: "number",
        name: "salary",
        message: "Enter the salary for this role",
        validate: async(input) =>
            isNaN(parseInt(input)) 
            ? "Please enter a number"
            : true
    },
    {
        type: "list",
        name: "department_id",
        message: "Select the department that this role falls under",
        choices: []
    }
]

const addEmployeeQuestions = [
    {
        type: "input",
        name: "first_name",
        message: "Enter the employee's first name"
    },
    {
        type: "input",
        name: "last_name",
        message: "Enter the employee's last name"
    },
    {
        type: "list",
        name: "role_id",
        message: "Select the employee's role",
        choices: []
    },
    {
        type: "list",
        name: "manager_id",
        message: "Select the employee's manager. If they do not have a manager, select none",
        choices: []
    }
]

const updateEmployeeRoleQuestions = [
    {
        type: "list",
        name: "employee_id",
        message: "Select the employee whose role you wish to update",
        choices: []
    },
    {
        type: "list",
        name: "role_id",
        message: "Select the employee's new role",
        choices: []
    }
]

const updateEmployeeManagerQuestions = [
    {
        type: "list",
        name: "employee_id",
        message: "Select the employee whose manager you wish to update",
        choices: []
    },
    {
        type: "list",
        name: "manager_id",
        message: "Select the employee's new manager",
        choices: []
    }
]

const deleteDepartmentQuestions = [
    {
        type: "list",
        name: "department_id",
        message: "Select the department you wish to delete",
        choices: []
    }
]

const deleteRoleQuestions = [
    {
        type: "list",
        name: "role_id",
        message: "Select the role you wish to delete",
        choices: []
    }
]

const deleteEmployeeQuestions = [
    {
        type: "list",
        name: "employee_id",
        message: "Select the employee you wish to delete",
        choices: []
    }
]

const quitQuestions = [
    {
        type: 'confirm',
        name: 'quit',
        message: 'Are you sure you want to close the application?'
    }
]

module.exports = { viewByManagerQuestions, viewByDepartmentQuestions, viewCombinedSalaryQuestions, mainMenuQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions, updateEmployeeManagerQuestions, deleteDepartmentQuestions, deleteRoleQuestions, deleteEmployeeQuestions, quitQuestions }