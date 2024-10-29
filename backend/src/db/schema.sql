CREATE DATABASE car_data;
USE car_data;

CREATE TABLE covered_distance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    car_id VARCHAR(255) NOT NULL,
    distance INT NOT NULL,
    last_reset TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Separate table for history
CREATE TABLE cars (
  car_id INT AUTO_INCREMENT PRIMARY KEY,
  car_name VARCHAR(255) NOT NULL,
  total_distance INT DEFAULT 0,
  next_oil_change_km INT DEFAULT 10000,
  last_reset_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE oil_change_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  car_id INT,
  oil_change_date DATE,
  kilometers INT,
  FOREIGN KEY (car_id) REFERENCES cars(car_id) ON DELETE CASCADE
);

-- Insert in history
INSERT INTO oil_change_history (car_id, oil_change_date, kilometers) 
VALUES (1, '2024-10-29', 12000);

-- Query history for specific car
SELECT * 
FROM oil_change_history 
WHERE car_id = 1 
ORDER BY oil_change_date DESC;

-- Joining data from both tables, c. and h. are aliases for the tables
SELECT c.car_name, h.oil_change_date, h.kilometers
FROM cars c
JOIN oil_change_history h ON c.car_id = h.car_id
WHERE c.car_id = 1;

-- Counting oil changes for each car
SELECT car_id, COUNT(*) AS oil_change_count
FROM oil_change_history
GROUP BY car_id;

-- Indexing for better performance.
CREATE INDEX idx_car_id ON oil_change_history(car_id);
