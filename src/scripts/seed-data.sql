-- Seed data for blood bank management system

-- Insert sample blood banks
INSERT INTO blood_banks (name, address, phone, email, operating_hours) VALUES
('Central Blood Bank', '123 Main Street, Downtown, City 12345', '(555) 123-4567', 'info@centralblood.com', '24/7'),
('Community Hospital Blood Center', '456 Hospital Drive, Midtown, City 12346', '(555) 234-5678', 'blood@communityhospital.com', '6:00 AM - 10:00 PM'),
('Memorial Hospital Blood Bank', '789 Medical Plaza, Uptown, City 12347', '(555) 345-6789', 'donations@memorialhospital.com', '8:00 AM - 8:00 PM'),
('Regional Medical Blood Center', '321 Health Avenue, Suburbs, City 12348', '(555) 456-7890', 'blood@regionalmedical.com', '7:00 AM - 9:00 PM');

-- Insert sample users (passwords should be hashed in real implementation)
INSERT INTO users (email, password_hash, first_name, last_name, role, blood_type, phone, address, date_of_birth) VALUES
-- Admin users
('admin@lifeflow.com', '$2b$10$hashedpassword1', 'Admin', 'User', 'admin', NULL, '(555) 000-0001', '100 Admin Street, City', '1980-01-01'),

-- Donor users
('john.doe@email.com', '$2b$10$hashedpassword2', 'John', 'Doe', 'donor', 'O+', '(555) 111-0001', '123 Donor Lane, City', '1985-03-15'),
('jane.smith@email.com', '$2b$10$hashedpassword3', 'Jane', 'Smith', 'donor', 'A-', '(555) 111-0002', '456 Blood Street, City', '1990-07-22'),
('michael.brown@email.com', '$2b$10$hashedpassword4', 'Michael', 'Brown', 'donor', 'B+', '(555) 111-0003', '789 Donation Ave, City', '1988-11-10'),
('emily.davis@email.com', '$2b$10$hashedpassword5', 'Emily', 'Davis', 'donor', 'AB-', '(555) 111-0004', '321 Helper Road, City', '1992-05-18'),
('robert.wilson@email.com', '$2b$10$hashedpassword6', 'Robert', 'Wilson', 'donor', 'O-', '(555) 111-0005', '654 Giving Circle, City', '1987-09-03'),

-- Recipient users
('sarah.johnson@email.com', '$2b$10$hashedpassword7', 'Sarah', 'Johnson', 'recipient', 'B-', '(555) 222-0001', '111 Patient Street, City', '1995-12-08'),
('david.miller@email.com', '$2b$10$hashedpassword8', 'David', 'Miller', 'recipient', 'AB+', '(555) 222-0002', '222 Recovery Lane, City', '1983-04-25'),
('lisa.anderson@email.com', '$2b$10$hashedpassword9', 'Lisa', 'Anderson', 'recipient', 'O-', '(555) 222-0003', '333 Hope Avenue, City', '1991-08-14');

-- Insert blood inventory
INSERT INTO blood_inventory (blood_type, quantity, expiration_date, location, status) VALUES
-- Central Blood Bank inventory
('A+', 25, '2023-07-15', 'Central Blood Bank', 'available'),
('A-', 10, '2023-07-20', 'Central Blood Bank', 'available'),
('B+', 15, '2023-07-18', 'Central Blood Bank', 'available'),
('B-', 5, '2023-07-12', 'Central Blood Bank', 'available'),
('AB+', 8, '2023-07-25', 'Central Blood Bank', 'available'),
('AB-', 3, '2023-07-10', 'Central Blood Bank', 'available'),
('O+', 30, '2023-07-22', 'Central Blood Bank', 'available'),
('O-', 12, '2023-07-16', 'Central Blood Bank', 'available'),

-- Community Hospital inventory
('A+', 18, '2023-07-14', 'Community Hospital Blood Center', 'available'),
('A-', 8, '2023-07-19', 'Community Hospital Blood Center', 'available'),
('B+', 12, '2023-07-17', 'Community Hospital Blood Center', 'available'),
('B-', 3, '2023-07-11', 'Community Hospital Blood Center', 'available'),
('AB+', 6, '2023-07-24', 'Community Hospital Blood Center', 'available'),
('AB-', 2, '2023-07-09', 'Community Hospital Blood Center', 'available'),
('O+', 22, '2023-07-21', 'Community Hospital Blood Center', 'available'),
('O-', 9, '2023-07-15', 'Community Hospital Blood Center', 'available');

-- Insert sample blood donations
INSERT INTO blood_donations (donor_id, blood_type, quantity, donation_date, location, status, notes) VALUES
(2, 'O+', 1, '2023-06-01', 'Central Blood Bank', 'completed', 'Regular donation'),
(3, 'A-', 1, '2023-06-02', 'Central Blood Bank', 'completed', 'First-time donor'),
(4, 'B+', 1, '2023-06-03', 'Community Hospital Blood Center', 'completed', 'Regular donor'),
(5, 'AB-', 1, '2023-06-04', 'Central Blood Bank', 'completed', 'Rare blood type'),
(6, 'O-', 1, '2023-06-05', 'Central Blood Bank', 'completed', 'Universal donor'),
(2, 'O+', 1, '2023-05-15', 'Central Blood Bank', 'completed', 'Previous donation'),
(3, 'A-', 1, '2023-05-20', 'Memorial Hospital Blood Bank', 'completed', 'Mobile drive'),
(4, 'B+', 1, '2023-05-25', 'Central Blood Bank', 'completed', 'Regular donation');

-- Insert sample blood requests
INSERT INTO blood_requests (recipient_id, blood_type, quantity, urgency, status, reason, hospital, request_date, approved_date, approved_by) VALUES
(7, 'B-', 2, 'high', 'approved', 'Surgery preparation', 'General Hospital', '2023-06-05', '2023-06-05', 1),
(8, 'AB+', 1, 'medium', 'pending', 'Blood transfusion therapy', 'City Medical Center', '2023-06-06', NULL, NULL),
(9, 'O-', 3, 'high', 'completed', 'Emergency treatment', 'Memorial Hospital', '2023-06-04', '2023-06-04', 1),
(7, 'B-', 1, 'low', 'completed', 'Routine treatment', 'General Hospital', '2023-05-20', '2023-05-21', 1);

-- Insert sample appointments
INSERT INTO appointments (donor_id, appointment_date, appointment_time, location, status, notes) VALUES
(2, '2023-06-20', '10:30:00', 'Central Blood Bank', 'scheduled', 'Regular appointment'),
(3, '2023-06-21', '14:00:00', 'Community Hospital Blood Center', 'scheduled', 'Follow-up donation'),
(4, '2023-06-22', '09:15:00', 'Central Blood Bank', 'confirmed', 'Early morning slot'),
(5, '2023-06-23', '16:45:00', 'Memorial Hospital Blood Bank', 'scheduled', 'Rare blood type donation'),
(6, '2023-06-24', '11:30:00', 'Central Blood Bank', 'scheduled', 'Universal donor');

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, read_status) VALUES
(2, 'Appointment Reminder', 'Your blood donation appointment is tomorrow at 10:30 AM at Central Blood Bank', 'appointment', FALSE),
(3, 'Thank You', 'Thank you for your recent donation! Your blood has helped save lives.', 'general', TRUE),
(7, 'Request Approved', 'Your blood request has been approved and is being processed', 'request', FALSE),
(8, 'Urgent Need', 'There is an urgent need for AB+ blood type in your area', 'urgent', TRUE),
(9, 'Request Completed', 'Your blood request has been completed successfully', 'request', TRUE),
(4, 'Donation Reminder', 'You are eligible to donate blood again. Schedule your next appointment.', 'general', FALSE);
