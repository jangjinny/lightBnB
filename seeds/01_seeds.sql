INSERT INTO users (name, email, password)
VALUES ('Monica Geller', 'gellercup@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rachel Green', 'bloomingdales@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Chandler Bing', 'misschanandlerbong@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ross Geller', 'wewereonabreak@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Phoebe Buffay', 'smellycat@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Joey Tribbiani', 'sandwiches@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Central Perk', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 405, 5, 2, 3, 'United States', '90 Bedford St', 'New York', 'NY', 10014, true),
(2, 'Blue Apartment', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 503, 4, 3, 5, 'Canada', '24 Burrad St', 'Vancouver', 'British Columbia', 'V3W 2X3', true),
(3, 'Red Apartment', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 435, 3, 6, 2, 'Canada', '51 Howe St', 'Vancouver', 'British Columbia', 'V35 6T5', true),
(3, 'Brick House', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 763, 3, 6, 3, 'Canada', '2204 Cambie St', 'Vancouver', 'British Columbia', 'E21 5F6', false),
(4, 'Oceanview Condo', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 5235, 5, 6, 7, 'Canada', '2441 Broadway St', 'Vancouver', 'British Columbia', 'R7T 9J2', false),
(4, 'Yellow House', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 238, 2, 1, 2, 'Canada', '92 Farrel St', 'Vancouver', 'British Columbia', 'B8U 4R5', false),
(6, 'Purple Apartment', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 323, 2, 3, 5, 'Canada', '212 Candy St', 'Vancouver', 'British Columbia', 'V7Y 2B3', true);

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14'),
(3, 2, '2019-07-12', '2019-07-20'),
(5, 4, '2020-04-23', '2020-5-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 5, 1, 4, 'messages'),
(4, 6, 2, 3, 'messages'),
(5, 2, 3, 5, 'messages'),
(2, 3, 4, 4, 'messages'),
(3, 4, 5, 5, 'messages');