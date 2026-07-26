CREATE DATABASE IF NOT EXISTS mkr_store;
USE mkr_store;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category ENUM('plate','apparel') NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100),
  items JSON NOT NULL,
  plate_text VARCHAR(20),
  plate_color VARCHAR(20),
  total DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(30) DEFAULT 'NayaPay',
  status ENUM('pending','verified','shipped','delivered') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, category, description, price, image_url) VALUES
('Classic Black Plate', 'plate', 'Custom black number plate with gold engraving', 2500.00, '/uploads/plate1.png'),
('Golden Edition Plate', 'plate', 'Premium gold-finish plate with LED frame option', 3500.00, '/uploads/plate2.png'),
('MKR Signature Hoodie', 'apparel', 'Black hoodie with gold MKR logo', 4000.00, '/uploads/hoodie1.png'),
('MKR Racing Tee', 'apparel', 'Black & gold racing themed t-shirt', 1800.00, '/uploads/tee1.png');
USE mkr_store;
UPDATE products 
SET image_url = '/uploads/number_plate.png' 
WHERE name = 'Classic Black Plate';
