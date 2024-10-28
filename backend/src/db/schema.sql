CREATE DATABASE car_data;
USE car_data;

CREATE TABLE covered_distance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    car_id VARCHAR(255) NOT NULL,
    distance INT NOT NULL,
    last_reset TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO covered_distance (car_id, distance)
VALUES
('car1', 70000),
('car2', 80000);