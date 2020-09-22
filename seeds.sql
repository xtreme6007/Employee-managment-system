USE employee_db;

INSERT INTO department (name)
VALUES ("John"), ("Sarah"), ("Ron");


INSERT INTO employee (title, salary, department_id, manager_id)
VALUES ("Engineer", 80,000.00, 1, 25);

INSERT INTO employee (title, salary, department_id, manager_id)
VALUES ("Intern", 40000.00, 1, 25);

INSERT INTO employee (title, salary, department_id, manager_id)
VALUES ("Manager", 99000.00, 1, null);