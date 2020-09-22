USE employee_db;

INSERT INTO department (name)
VALUES ("Enginner"), ("Intern"), ("Manager");


INSERT INTO employee (title, salary, department_id, manager_id)
VALUES ("Engineer", 80000.00, 1, 25), ("Intern", 40000.00, 1, 25), "Manager", 99000.00, 1, null;

INSERT INTO role (title, slary, role_id)
VALUES ("Engineer", 80000.00, 1), ("Intern", 40000.00, 2), ("Manager", 99000.00, 3);



