USE employee_db;

INSERT INTO department (name)
VALUES ("Enginner"), ("Intern"), ("Manager");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Dee", 1, 1), ("James", "Bond", 2, 1), ("Roy", "Nugget", 3, 1);

INSERT INTO role (title, salary, role_id)
VALUES ("Engineer", 80000.00, 1), ("Intern", 40000.00, 2), ("Manager", 99000.00, 3);



