INSERT INTO users (name, email, password)
VALUES ('Xie Lian', 'xielian@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Hua Cheng', 'huacheng@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Wei Wuxian', 'weiwuxian@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'); 

INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES ('Puqi Shrine', 'dilapidated shrine','https://www.google.&vetByqW6MEkM&boqcbzAhUNrXIEHea4DpwQMygBegUIARCjAQ', 'https://www.google.com/imgres?imgurl=https%3A%2Ffffff-no-rj&imgrefuARClAQ', 0, 0, 0, 1,'China', '3000 Poor Lane', 'Beijing', 'Province', '8F7 M9D'),
('Ghost City', 'Nice mansion','https://www.google.com/is%2F3%furl=https%3A%2F%2Fmodao-zushiI-LM&w=1920&h=799&BegUIARCuAQ', 'https://www.google.com/imgls%2F11%2F1a%2F53%2F111a53d1d8a65173279ARCwAQ', 10000, 33, 6, 8, 'China', '666 Ghost Realm', 'Beijing', 'Province', 'PF6 N9D'),
('Yiling', 'burial mounds','https://www.google.cohUKEwjOvND2q8bzAhVtgHIEHddDAAYQMygHegUIARC-AQ', 'https://www.google.com/imgres?imgurl=https%3A%2F%2cb%3D2020123112Q', 0, 0, 1, 3, 'China', '33 Graveyard ave.', 'Beijing', 'Province', '4F7 M8D');

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 10, '2', 'Um this shrine is so broken down it is sad!'),
(2, 2, 11, '5', 'AMAZING! THIS PLACE HAS A CASINO! MAIDS! EVERYTHING YOU COULD ASK FOR!!!'),
(3, 3, 12, '1', 'This place is a literal graveyard, wtf!????');