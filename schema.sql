-- Drops the "employee_DB" if it exists currently --
DROP DATABASE IF EXISTS employee_DB;
-- Creates the "employee_DB" database --
CREATE database employee_DB;
-- Makes it so all of the following code will affect "employee_DB" --
USE employee_DB;

-- Table "department"--
-- "id" is a numeric column that cannot contain null and will automatically increment as new rows are created. --
-- "name" is a string column which cannot contain null --

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Table "role"--
-- "id" is a numeric column that cannot contain null and will automatically increment as new rows are created. --
-- "title" is a string column which cannot contain null --
-- "salary" is a decimal column--
-- "department_id" is a numeric column which cannot contain null --
-- "department_id" holds reference to the department role belongs to

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary decimal,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

-- Table "employee"--
-- "id" is a numeric column that cannot contain null and will automatically increment as new rows are created. --
-- "first_name" is a string column which cannot contain null --
-- "last_name" is a string column which cannot contain null --
-- "role_id" is a string column which cannot contain null
-- "role_id holds reference to the role the employee has --
-- "manager_id" is a numeric column that can be null if the employee has no manager
-- "manager_id" holds reference to the employee that manages the employee being created --

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);