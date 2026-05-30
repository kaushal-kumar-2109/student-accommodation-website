INSERT INTO amenities (name) VALUES
('WiFi'),
('Food'),
('Laundry'),
('Parking'),
('Security'),
('RO Water'),
('AC'),
('CCTV'),
('Gym');

INSERT INTO properties 
(name, city, location, price, gender, rating, image, description)
VALUES
(
 'Sunrise Boys PG',
 'Noida',
 'Sector 62, Noida',
 7500,
 'Boys',
 4.5,
 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
 'Comfortable and affordable boys PG near Sector 62 with food, WiFi, laundry and security.'
),
(
 'Elite Girls Hostel',
 'Delhi',
 'Laxmi Nagar, Delhi',
 9000,
 'Girls',
 4.7,
 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
 'Safe and modern girls hostel with AC rooms, food, CCTV and 24/7 security.'
),
(
 'Comfort Stay PG',
 'Gurgaon',
 'Sector 44, Gurgaon',
 11000,
 'Co-living',
 4.3,
 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
 'Premium co-living PG with gym, meals, laundry and high-speed internet.'
);

INSERT INTO property_images (property_id, image_url) VALUES
(1, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80'),
(1, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'),
(1, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80'),

(2, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80'),
(2, 'https://images.unsplash.com/photo-1560448075-bb485b067938?auto=format&fit=crop&w=900&q=80'),
(2, 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80'),

(3, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'),
(3, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80');

INSERT INTO property_amenities (property_id, amenity_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
(2, 1), (2, 2), (2, 5), (2, 7), (2, 8),
(3, 1), (3, 2), (3, 3), (3, 7), (3, 9);