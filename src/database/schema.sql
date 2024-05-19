CREATE DATABASE task_manager;
USE task_manager;


CREATE TABLE tasks (
	id integer PRIMARY KEY AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    status varchar(255) NOT NULL,
    color varchar(30) NOT NULL
);


INSERT INTO tasks (title, status, color)
VALUES ( "Task 1", "completed", "blue" ),
      ( "Task 2", "pending", "green" ),
      ( "Task 3", "in-progress", "yellow" ),
      ( "Task 4", "in-progress", "purple" );