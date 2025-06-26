CREATE DATABASE task_db1;


USE task_db1;


CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);


CREATE TABLE task (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    priority ENUM('LOW', 'MEDIUM', 'HIGH'),
    status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED')
);
select * from task;