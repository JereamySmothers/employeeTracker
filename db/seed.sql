USE employeeTrackerdb;

/* insert into departments */
INSERT INTO department (name) VALUES
("engineering"), 
("finance"), 
("legal"), 
("sales");

/* insert into roles */
INSERT INTO Role (title, salary, department_id) VALUES
("Sales Lead", 10000, 4), 
("Salesperson", 80000, 4), 
("Lead Engineer", 150000, 1), 
("Software Engineer", 120000, 1);

/* insert into employees */
INSERT INTO employee (first_name, last_name, role_id) VALUES
("John", "Doe", 1), 
("Mike", "Chan", 2), 
("Ashley", "Roderiguez", 3), 
("Kevin", "Tupik", 4);

UPDATE employee SET manager_id=1 WHERE id=2;
