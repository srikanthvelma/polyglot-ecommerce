CREATE TABLE IF NOT EXISTS inventory (
    product_id VARCHAR(50) PRIMARY KEY,
    quantity INT NOT NULL
);

INSERT INTO inventory (product_id, quantity) VALUES
('p001', 120),
('p002', 60),
('p003', 80),
('p004', 45),
('p005', 200),
('p006', 150),
('p007', 70),
('p008', 95)
ON CONFLICT DO NOTHING;
