INSERT INTO users (name, email, password)
VALUES ('Xie Lian', 'xielian@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Hua Cheng', 'huacheng@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Wei Wuxian', 'weiwuxian@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'); 

INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES ('Puqi Shrine', 'dilapidated shrine','https://i.pinimg.com/564x/49/01/be/4901be8708d20ecf5b73515341ab8b2e.jpg', 'https://i.pinimg.com/564x/9d/e0/f3/9de0f3721456f60353dffa8e0b77f7cf.jpg', 0, 0, 0, 1,'China', '3000 Poor Lane', 'Beijing', 'Province', '8F7 M9D'),
('Paradise Manor', 'Nice mansion','https://i.pinimg.com/564x/11/1a/53/111a53d1d8a786bb1bf9865173279bbb.jpg', 'https://pbs.twimg.com/media/EX5qOJsUMAAh43z?format=jpg', 10000, 33, 6, 8, 'China', '666 Ghost City', 'Beijing', 'Province', 'PF6 N9D'),
('Yiling', 'burial mounds','https://i.pinimg.com/564x/6d/17/c0/6d17c0f836a813ca7c401468fa9f8dca.jpg', 'https://i.pinimg.com/564x/37/af/79/37af79ebdb84bc30e409c262f1fcbaf6.jpg', 0, 0, 1, 3, 'China', '33 Graveyard ave.', 'Beijing', 'Province', '4F7 M8D');

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, '2', 'Um this shrine is so broken down it is sad!'),
(2, 2, 2, '5', 'AMAZING! THIS PLACE HAS A CASINO! MAIDS! EVERYTHING YOU COULD ASK FOR!!!'),
(3, 3, 3, '1', 'This place is a literal graveyard, wtf!????');