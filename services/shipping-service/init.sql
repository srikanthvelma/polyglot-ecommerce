CREATE TABLE IF NOT EXISTS shipments (
    order_id VARCHAR(50) PRIMARY KEY,
    status VARCHAR(50) NOT NULL
);

INSERT INTO shipments (order_id, status) VALUES
('o001', 'DELIVERED'),
('o002', 'SHIPPED'),
('o003', 'PENDING')
ON DUPLICATE KEY UPDATE status=VALUES(status);
