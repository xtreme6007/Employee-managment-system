USE employee_db;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30)  NULL,
   last_name VARCHAR(30)  NULL,
  role_id INT NULL,
manager_id INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM role