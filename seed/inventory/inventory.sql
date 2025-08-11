CREATE TABLE Inventory (
    id INT PRIMARY KEY,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    warehouse_location VARCHAR(100) NOT NULL
);

INSERT INTO Inventory (id, product_id, product_name, quantity, warehouse_location) VALUES
(1, 101, 'Apple iPhone 14 Pro', 120, 'WH-A1'),
(2, 102, 'Samsung Galaxy S23 Ultra', 95, 'WH-A1'),
(3, 103, 'Sony WH-1000XM5 Headphones', 150, 'WH-B2'),
(4, 104, 'Dell XPS 15 Laptop', 40, 'WH-C3'),
(5, 105, 'Apple MacBook Air M2', 55, 'WH-C3'),
(6, 106, 'Google Pixel 7 Pro', 85, 'WH-A1'),
(7, 107, 'Bose QuietComfort 45', 130, 'WH-B2'),
(8, 108, 'Apple iPad Pro 12.9"', 60, 'WH-D4'),
(9, 109, 'Sony PlayStation 5', 25, 'WH-E5'),
(10, 110, 'Microsoft Xbox Series X', 30, 'WH-E5'),
(11, 111, 'Logitech MX Master 3 Mouse', 300, 'WH-B2'),
(12, 112, 'Razer BlackWidow V3 Keyboard', 200, 'WH-B2'),
(13, 113, 'Nikon Z6 II Camera', 45, 'WH-F6'),
(14, 114, 'Canon EOS R6 Camera', 50, 'WH-F6'),
(15, 115, 'DJI Mavic 3 Drone', 20, 'WH-G7'),
(16, 116, 'GoPro HERO11 Black', 75, 'WH-G7'),
(17, 117, 'Kindle Paperwhite 2023', 110, 'WH-H8'),
(18, 118, 'Apple Watch Series 8', 140, 'WH-D4'),
(19, 119, 'Samsung Galaxy Watch 5', 125, 'WH-D4'),
(20, 120, 'Fitbit Charge 5', 170, 'WH-D4'),
(21, 121, 'LG C2 OLED TV 55"', 15, 'WH-I9'),
(22, 122, 'Sony A80K OLED TV 65"', 10, 'WH-I9'),
(23, 123, 'Philips Hue Starter Kit', 220, 'WH-J10'),
(24, 124, 'Nest Learning Thermostat', 80, 'WH-J10'),
(25, 125, 'Ring Video Doorbell Pro 2', 95, 'WH-J10');
