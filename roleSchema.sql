USE employee_db;

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
   title VARCHAR(30)  NULL,
  salary DECIMAL(7,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM role;