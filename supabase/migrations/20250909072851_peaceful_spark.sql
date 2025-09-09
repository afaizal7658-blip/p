/*
  # Fuel Monitoring Database Schema

  1. New Tables
    - `vehicles`
      - `id` (varchar, primary key) - UUID for vehicle identification
      - `name` (varchar) - Display name for the vehicle
      - `brand` (varchar) - Vehicle manufacturer
      - `model` (varchar) - Vehicle model
      - `year` (int) - Manufacturing year
      - `fuel_type` (enum) - Type of fuel: gasoline, diesel, electric
      - `tank_capacity` (decimal) - Fuel tank capacity in liters
      - `license_plate` (varchar) - Vehicle license plate number
      - `created_at` (timestamp) - Record creation date
      - `updated_at` (timestamp) - Last update date

    - `fuel_transactions`
      - `id` (varchar, primary key) - UUID for transaction identification
      - `vehicle_id` (varchar, foreign key) - Reference to vehicles table
      - `type` (enum) - Transaction type: refuel, consumption
      - `amount` (decimal) - Fuel amount in liters or kWh
      - `cost` (decimal) - Transaction cost in IDR
      - `odometer` (int) - Vehicle odometer reading in km
      - `date` (datetime) - Transaction date and time
      - `location` (varchar, nullable) - Fuel station or location
      - `notes` (text, nullable) - Additional notes
      - `created_at` (timestamp) - Record creation date

    - `fuel_efficiency`
      - `id` (varchar, primary key) - UUID for efficiency record
      - `vehicle_id` (varchar, foreign key) - Reference to vehicles table
      - `efficiency` (decimal) - Fuel efficiency in km/liter or km/kWh
      - `period_start` (date) - Calculation period start date
      - `period_end` (date) - Calculation period end date
      - `total_distance` (int) - Total distance traveled in km
      - `total_fuel` (decimal) - Total fuel consumed
      - `created_at` (timestamp) - Record creation date

  2. Indexes
    - Index on `vehicle_id` in fuel_transactions table
    - Index on `date` in fuel_transactions table
    - Index on `vehicle_id` in fuel_efficiency table

  3. Triggers
    - Auto-calculate efficiency when new refuel transactions are added
    - Update vehicle last_updated timestamp on any modification
*/

-- Create database
CREATE DATABASE IF NOT EXISTS fuel_monitoring;
USE fuel_monitoring;

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  fuel_type ENUM('gasoline', 'diesel', 'electric') NOT NULL DEFAULT 'gasoline',
  tank_capacity DECIMAL(8,2) NOT NULL,
  license_plate VARCHAR(20) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_license_plate (license_plate),
  INDEX idx_fuel_type (fuel_type)
);

-- Create fuel_transactions table
CREATE TABLE IF NOT EXISTS fuel_transactions (
  id VARCHAR(36) PRIMARY KEY,
  vehicle_id VARCHAR(36) NOT NULL,
  type ENUM('refuel', 'consumption') NOT NULL DEFAULT 'refuel',
  amount DECIMAL(10,2) NOT NULL,
  cost DECIMAL(12,2) NOT NULL DEFAULT 0,
  odometer INT NOT NULL,
  date DATETIME NOT NULL,
  location VARCHAR(100) NULL,
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
  INDEX idx_vehicle_id (vehicle_id),
  INDEX idx_date (date),
  INDEX idx_type (type)
);

-- Create fuel_efficiency table
CREATE TABLE IF NOT EXISTS fuel_efficiency (
  id VARCHAR(36) PRIMARY KEY,
  vehicle_id VARCHAR(36) NOT NULL,
  efficiency DECIMAL(8,2) NOT NULL DEFAULT 0,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_distance INT NOT NULL DEFAULT 0,
  total_fuel DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
  INDEX idx_vehicle_id (vehicle_id),
  INDEX idx_period (period_start, period_end),
  UNIQUE KEY unique_vehicle_period (vehicle_id, period_start, period_end)
);

-- Create view for dashboard statistics
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
  COUNT(DISTINCT v.id) as total_vehicles,
  COALESCE(SUM(ft.cost), 0) as total_fuel_cost,
  COALESCE(SUM(CASE WHEN ft.type = 'refuel' THEN ft.amount ELSE 0 END), 0) as total_fuel_consumed,
  COALESCE(AVG(fe.efficiency), 0) as average_efficiency
FROM vehicles v
LEFT JOIN fuel_transactions ft ON v.id = ft.vehicle_id
LEFT JOIN fuel_efficiency fe ON v.id = fe.vehicle_id;

-- Create view for monthly consumption trends
CREATE OR REPLACE VIEW monthly_trends AS
SELECT 
  DATE_FORMAT(date, '%Y-%m') as month,
  SUM(amount) as consumption,
  SUM(cost) as cost,
  COUNT(*) as transaction_count
FROM fuel_transactions
GROUP BY DATE_FORMAT(date, '%Y-%m')
ORDER BY month;

-- Create view for vehicle efficiency comparison
CREATE OR REPLACE VIEW vehicle_efficiency_comparison AS
SELECT 
  v.id,
  v.name,
  v.brand,
  v.model,
  v.fuel_type,
  COALESCE(AVG(fe.efficiency), 0) as avg_efficiency,
  COUNT(ft.id) as transaction_count,
  COALESCE(SUM(ft.cost), 0) as total_cost
FROM vehicles v
LEFT JOIN fuel_efficiency fe ON v.id = fe.vehicle_id
LEFT JOIN fuel_transactions ft ON v.id = ft.vehicle_id
GROUP BY v.id, v.name, v.brand, v.model, v.fuel_type;

-- Insert sample data for demonstration
INSERT INTO vehicles (id, name, brand, model, year, fuel_type, tank_capacity, license_plate) VALUES
('sample-1', 'Mobil Pribadi', 'Toyota', 'Avanza', 2020, 'gasoline', 45.0, 'B 1234 ABC'),
('sample-2', 'Mobil Kantor', 'Honda', 'Civic', 2019, 'gasoline', 50.0, 'B 5678 DEF'),
('sample-3', 'Motor Pribadi', 'Yamaha', 'NMAX', 2021, 'gasoline', 6.6, 'B 9012 GHI')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert sample transactions
INSERT INTO fuel_transactions (id, vehicle_id, type, amount, cost, odometer, date, location) VALUES
('trans-1', 'sample-1', 'refuel', 35.0, 350000, 15000, '2024-01-15 08:30:00', 'SPBU Shell Sudirman'),
('trans-2', 'sample-1', 'refuel', 40.0, 400000, 15500, '2024-01-20 09:15:00', 'SPBU Pertamina Thamrin'),
('trans-3', 'sample-2', 'refuel', 45.0, 450000, 25000, '2024-01-18 10:00:00', 'SPBU Total Senayan'),
('trans-4', 'sample-3', 'refuel', 6.0, 60000, 8000, '2024-01-16 07:45:00', 'SPBU Pertamina Kemang')
ON DUPLICATE KEY UPDATE amount = VALUES(amount);

-- Create stored procedure to calculate fuel efficiency
DELIMITER //
CREATE PROCEDURE CalculateFuelEfficiency(IN vehicleId VARCHAR(36))
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE current_odometer, previous_odometer INT;
  DECLARE current_amount, total_distance, total_fuel DECIMAL(10,2);
  DECLARE current_date, previous_date DATE;
  DECLARE efficiency DECIMAL(8,2);
  
  DECLARE fuel_cursor CURSOR FOR
    SELECT odometer, amount, DATE(date)
    FROM fuel_transactions 
    WHERE vehicle_id = vehicleId AND type = 'refuel'
    ORDER BY date ASC;
  
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
  
  SET previous_odometer = NULL;
  SET total_distance = 0;
  SET total_fuel = 0;
  
  OPEN fuel_cursor;
  
  read_loop: LOOP
    FETCH fuel_cursor INTO current_odometer, current_amount, current_date;
    IF done THEN
      LEAVE read_loop;
    END IF;
    
    IF previous_odometer IS NOT NULL THEN
      SET total_distance = total_distance + (current_odometer - previous_odometer);
      SET total_fuel = total_fuel + current_amount;
    END IF;
    
    SET previous_odometer = current_odometer;
    SET previous_date = current_date;
  END LOOP;
  
  CLOSE fuel_cursor;
  
  IF total_fuel > 0 THEN
    SET efficiency = total_distance / total_fuel;
    
    INSERT INTO fuel_efficiency (id, vehicle_id, efficiency, period_start, period_end, total_distance, total_fuel)
    VALUES (UUID(), vehicleId, efficiency, 
           (SELECT MIN(DATE(date)) FROM fuel_transactions WHERE vehicle_id = vehicleId AND type = 'refuel'),
           (SELECT MAX(DATE(date)) FROM fuel_transactions WHERE vehicle_id = vehicleId AND type = 'refuel'),
           total_distance, total_fuel)
    ON DUPLICATE KEY UPDATE 
      efficiency = VALUES(efficiency),
      total_distance = VALUES(total_distance),
      total_fuel = VALUES(total_fuel);
  END IF;
END //
DELIMITER ;

-- Create trigger to auto-calculate efficiency after fuel transactions
DELIMITER //
CREATE TRIGGER after_fuel_transaction_insert
AFTER INSERT ON fuel_transactions
FOR EACH ROW
BEGIN
  IF NEW.type = 'refuel' THEN
    CALL CalculateFuelEfficiency(NEW.vehicle_id);
  END IF;
END //
DELIMITER ;