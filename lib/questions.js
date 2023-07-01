const mainMenuQuestions = [
    {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            //"View Employees By Manager",
            //"View Employees By Department",
            //"View Combined Salaries By Department",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            //"Update Employee Managers",
            //"Delete Department",
            //"Delete Role",
            //"Delete Employee"
        ]
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
        message: "Select the emplooye's role",
        choices: []
    },
    {
        type: "list",
        name: "manager_id",
        message: "Select the employee's manager. If they do not have a manager, select none",
        choices: []
    }
]