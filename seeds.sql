USE employee_db;

INSERT INTO department (name)
VALUES ("Enginner"), ("Intern"), ("Manager");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Dee", 1, 25), ("James", "Bond", 2, 25), ("Roy", "Nugget", 3, null);

INSERT INTO role (title, slary, role_id)
VALUES ("Engineer", 80000.00, 1), ("Intern", 40000.00, 2), ("Manager", 99000.00, 3);



