INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", "100000", 1),
        ("Salesperson", "80000", 1),
        ("Lead Engineer", "150000", 2),
        ("Software Engineer", "120000", 2),
        ("Account Manager", "160000", 3),
        ("Accountant", "125000", 3),
        ("Legal Team Lead", "250000", 4),
        ("Lawyer", "190000", 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("David", "Birch", 1, NULL),
        ("Joseph", "Lawrence", 2, 1),
        ("Naomi", "Thompson", 2, 1),
        ("Faye", "Stevenson", 3, NULL),
        ("Caoimhe", "O'brien", 4, 4),
        ("Edward", "Ashton", 4, 4),
        ("Chelsea", "Dunn", 4, 4),
        ("William", "Grant", 5, NULL),
        ("Esmee", "Van der Veer", 6, 8),
        ("Holly", "Burke", 6, 8),
        ("Rachel", "Reynolds", 7, NULL),
        ("Lewis", "Barnes", 8, 11);
