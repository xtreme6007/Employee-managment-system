USE employee_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30)  NULL,
  salary DECIMAL(7,2) NULL,
  department_id INT NULL,
  manager_id INT NULL,

  PRIMARY KEY (id)
);
SELECT * FROM employee;