CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  hashed_password VARCHAR(200) NOT NULL
);

CREATE TABLE earth (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  type VARCHAR(100) NOT NULL
);

INSERT INTO earth (id, type) VALUES
(1, 'Terre légère et bien drainée'),
(2, 'Terre sableuse'),
(3, 'Terre riche et humifère'),
(4, 'Terre fraîche et meuble');


CREATE TABLE month (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE seedling (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL
);

CREATE TABLE harvest (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL
);

CREATE TABLE plant (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(255) NOT NULL,
  words VARCHAR(100) NOT NULL,
  background TEXT NOT NULL,
  description TEXT NOT NULL,
  watering VARCHAR(100) NOT NULL,
  earth_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (earth_id) REFERENCES earth(id) ON DELETE CASCADE
);

CREATE TABLE seedling_months (
  seedling_id INT UNSIGNED NOT NULL,
  month_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (seedling_id, month_id),
  FOREIGN KEY (seedling_id) REFERENCES seedling(id) ON DELETE CASCADE,
  FOREIGN KEY (month_id) REFERENCES month(id) ON DELETE CASCADE
);

CREATE TABLE harvest_months (
  harvest_id INT UNSIGNED NOT NULL,
  month_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (harvest_id, month_id),
  FOREIGN KEY (harvest_id) REFERENCES harvest(id) ON DELETE CASCADE,
  FOREIGN KEY (month_id) REFERENCES month(id) ON DELETE CASCADE
);

CREATE TABLE plant_seedling (
  plant_id INT UNSIGNED NOT NULL,
  seedling_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (plant_id, seedling_id),
  FOREIGN KEY (plant_id) REFERENCES plant(id) ON DELETE CASCADE,
  FOREIGN KEY (seedling_id) REFERENCES seedling(id) ON DELETE CASCADE
);

CREATE TABLE plant_harvest (
  plant_id INT UNSIGNED NOT NULL,
  harvest_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (plant_id, harvest_id),
  FOREIGN KEY (plant_id) REFERENCES plant(id) ON DELETE CASCADE,
  FOREIGN KEY (harvest_id) REFERENCES harvest(id) ON DELETE CASCADE
);


INSERT INTO month (name) VALUES 
('Janvier'), ('Février'), ('Mars'), ('Avril'), ('Mai'), 
('Juin'), ('Juillet'), ('Août'), ('Septembre'), ('Octobre'), 
('Novembre'), ('Décembre');

INSERT INTO plant (name, words, background, description, watering, earth_id) VALUES
('Tomate', 'Soleil, Chaleur, Délicieuse, Facile 🍅', '/tomates.jpg', 'Une plante appréciant la chaleur et nécessitant du tuteurage.', 'Arrosage régulier sans mouiller les feuilles', 1),
('Carotte', 'Vitamines , Croquante , Santé, Racine 🥕', '/carottes.jpg', 'Une racine sucrée et croquante qui pousse sous terre.', 'Arrosage léger mais constant', 2),
('Courgette', 'Rapide, Géante, Gourmande, Facile  🥒', '/courgettes.jpg', 'Une plante prolifique qui donne de nombreux fruits en été.', 'Arrosage abondant mais espacé', 3),
('Laitue', 'Fraîche , Croquante, Rapide, Délicate 🥬', '/laitue.jpg', 'Une salade à croissance rapide idéale pour les climats tempérés.', 'Arrosage fréquent et léger', 4);


INSERT INTO seedling (id) VALUES (1), (2), (3), (4);

INSERT INTO seedling_months (seedling_id, month_id) VALUES
(1, 3), (1, 4), (1, 5),
(2, 2), (2, 3), (2, 4),
(3, 4), (3, 5), (3, 6),
(4, 1), (4, 2), (4, 3), (4, 4), (4, 8), (4, 9);

INSERT INTO harvest (id) VALUES (1), (2), (3), (4);

INSERT INTO harvest_months (harvest_id, month_id) VALUES
(1, 6), (1, 7), (1, 8), (1, 9),
(2, 6), (2, 7), (2, 8), (2, 9), (2, 10),
(3, 7), (3, 8), (3, 9),
(4, 3), (4, 4), (4, 5), (4, 6);

INSERT INTO plant_seedling (plant_id, seedling_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

INSERT INTO plant_harvest (plant_id, harvest_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);
