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
        name: "add_department_name",
        message: "Enter the name of the new department"
    }
]