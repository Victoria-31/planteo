CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(100) NOT NULL DEFAULT "user",
  hashed_password VARCHAR(200) NOT NULL
);

INSERT INTO user (name, email, role, hashed_password) VALUES

('Julian', 'julian.delaplaya@email.com', 'user', '$argon2id$v=19$m=65536,t=3,p=4$0gSirVxaZ5//6QdEjccD1Q$wuF1+3HOhIYkJXfD+lDHoJXPDKjnW77pLTikjkhfyd0'),
('Jacky', 'jack.martin@email.com','user', '$argon2id$v=19$m=65536,t=3,p=4$SYqQzLj4Mlc/F6/5rQ8ywQ$lshrje56AtJTXEQkvGKR52tqaeAdu3I6QuR3BHhSo7s'),
('Victoria', 'admin@email.com','admin', '$argon2id$v=19$m=65536,t=3,p=4$SYqQzLj4Mlc/F6/5rQ8ywQ$lshrje56AtJTXEQkvGKR52tqaeAdu3I6QuR3BHhSo7s');

CREATE TABLE earth (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  type VARCHAR(100) NOT NULL
);

INSERT INTO earth (id, type) VALUES
(1, 'Terre argileuse'),
(2, 'Terre sableuse'),
(3, 'Terre riche et humifère'),
(4, 'Terre limoneuse');


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

CREATE TABLE plantuser (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  plant_id INT UNSIGNED NOT NULL UNIQUE,
  FOREIGN KEY (plant_id) REFERENCES plant(id) ON DELETE CASCADE
);





INSERT INTO month (name) VALUES 
('Janvier'), ('Février'), ('Mars'), ('Avril'), ('Mai'), 
('Juin'), ('Juillet'), ('Août'), ('Septembre'), ('Octobre'), 
('Novembre'), ('Décembre');

INSERT INTO plant (name, words, background, description, watering, earth_id) VALUES
('Tomate', 'Soleil, Chaleur, Délicieuse, Facile 🍅', '/tomates.jpg', 'Une plante appréciant la chaleur et nécessitant du tuteurage.', 'Arrosage régulier 2 à 3 fois par semaine sans mouiller les feuilles', 3),
('Carotte', 'Vitamines , Croquante , Santé, Racine 🥕', '/carottes.jpg', 'Une racine sucrée et croquante qui pousse sous terre.', 'Arrosage léger mais constant, une à deux fois par semaine', 2),
('Courgette', 'Rapide, Géante, Gourmande, Facile  🥒', '/courgettes.jpg', 'Une plante prolifique qui donne de nombreux fruits en été.', 'Arrosage abondant mais espacé, environ 2 fois par semaine', 3),
('Laitue', 'Fraîche , Croquante, Rapide, Délicate 🥬', '/laitue.jpg', 'Une salade à croissance rapide idéale pour les climats tempérés.', 'Arrosage fréquent et léger, tous les 2 jours', 4),
('Poivron', 'Coloré, Doux, Soleil, Délicieux 🫑', '/poivron.jpg', 'Un légume fruit qui apprécie la chaleur et pousse lentement.', 'Arrosage modéré et régulier, 2 à 3 fois par semaine', 3),
('Radis', 'Croquant, Rapide, Facile, Fraîcheur 🌱', '/radis.jpg', 'Une racine rapide à cultiver, idéale pour les débutants.', 'Arrosage fréquent mais léger, tous les 2 jours', 2),
('Aubergine', 'Soleil, Riche, Délicate, Exotique 🍆', '/aubergine.jpg', 'Un légume méditerranéen nécessitant chaleur et patience.', 'Arrosage modéré, une à deux fois par semaine sans excès', 3),
('Fraise', 'Sucrée, Gourmande, Printemps, Facile 🍓', '/fraise.jpg', 'Un petit fruit rouge apprécié pour sa douceur.', 'Arrosage modéré, maintenir un sol humide, 2 fois par semaine', 3),
('Basilic', 'Aromatique, Soleil, Cuisine, Délicieux 🌿', '/basilic.jpg', 'Une plante aromatique très utilisée en cuisine.', 'Arrosage modéré, éviter les excès d’eau, tous les 3 jours', 1),
('Ciboulette', 'Parfumé, Rustique, Cuisine, Facile 🧄', '/ciboulette.jpg', 'Une herbe aromatique facile à cultiver en pot ou au jardin.', 'Arrosage léger et régulier, une fois par semaine', 3),
('Menthe', 'Fraîcheur, Thé, Cuisine, Invasive 🌱', '/menthe.jpg', 'Une plante aromatique qui pousse très vite et envahit son espace.', 'Arrosage fréquent, aime l’humidité, tous les 2 jours', 4),
('Oignon', 'Condiment, Rustique, Facile, Incontournable 🧅', '/oignon.jpg', 'Une plante bulbeuse essentielle en cuisine.', 'Arrosage léger, surtout en début de croissance, une fois par semaine', 2),
('Pomme de terre', 'Féculent, Rustique, Productif, Facile 🥔', '/pdt.jpg', 'Un légume facile à cultiver, très nourrissant.', 'Arrosage modéré, éviter l’excès d’eau, une fois par semaine', 2),
('Pois', 'Légumineuse, Grimpante, Sucrée, Délicieuse 🌿', '/pois.jpg', 'Un légume grimpant qui enrichit le sol en azote.', 'Arrosage fréquent, surtout en période de floraison, tous les 3 jours', 3),
('Haricot', 'Rapide, Facile, Riche, Grimpant 🌱', '/haricot.jpg', 'Un légume facile à cultiver, qu’il soit nain ou grimpant.', 'Arrosage modéré, éviter l’excès d’eau, 2 fois par semaine', 3),
('Épinard', 'Feuillu, Santé, Rapide, Facile 🌿', '/epinard.jpg', 'Une plante à feuilles riches en fer et en vitamines.', 'Arrosage fréquent pour maintenir un sol frais, tous les 2 jours', 4),
('Brocoli', 'Nourrissant, Croquant, Santé, Riche 🥦', '/brocoli.jpg', 'Un légume aux nombreuses vertus nutritionnelles.', 'Arrosage fréquent, surtout en été, 2 à 3 fois par semaine', 4),
('Chou-fleur', 'Délicat, Blanc, Cuisine, Doux 🥬', '/choufleur.jpg', 'Un légume délicat qui nécessite une bonne nutrition du sol.', 'Arrosage modéré, maintenir un sol humide, 2 fois par semaine', 4),
('Betterave', 'Sucrée, Santé, Racine, Colorée 🍠', '/betterave.jpg', 'Un légume racine coloré, apprécié pour ses bienfaits.', 'Arrosage régulier mais léger, une fois par semaine', 2);


INSERT INTO seedling (id) VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (11), (12), (13), (14), (15), (16), (17), (18), (19);

INSERT INTO seedling_months (seedling_id, month_id) VALUES
(1,2), (1,3), (1,4), (1,5),
(2,2), (2,3), (2,4), (2,5), (2,6), (2,7),
 (3,4), (3,5), (3,6), 
(4,2), (4,3), (4,4), (4,5), (4,6), (4,7), (4,8), (4,9), (4,10),
(5, 3), (5, 4), (5, 5),
(6, 2), (6, 3), (6, 4),
(7, 4), (7, 5), (7, 6),
(8, 1), (8, 2), (8, 3), (8, 4),
(9, 3), (9, 4), (9, 5),
(10, 2), (10, 3), (10, 4),
(11, 4), (11, 5), (11, 6),
(12, 1), (12, 2), (12, 3),
(13, 2), (13, 3), (13, 4),
(14, 3), (14, 4), (14, 5),
(15, 4), (15, 5), (15, 6),
(16, 3), (16, 4), (16, 5),
(17, 2), (17, 3), (17, 4),
(18, 4), (18, 5), (18, 6),
(19, 3), (19, 4), (19, 5);

INSERT INTO harvest (id) VALUES (1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (11), (12), (13), (14), (15), (16), (17), (18), (19);

INSERT INTO harvest_months (harvest_id, month_id) VALUES
(1,6), (1,7), (1,8), (1,9), (1,10),
(2,5), (2,6), (2,7), (2,8), (2,9), (2,10), (2,11), 
 (3,6), (3,7), (3,8), (3,9), (3,10), (3,11),
 (4,3), (4,4), (4,5), (4,6), (4,7), (4,8), (4,9), (4,10),
(5, 6), (5, 7), (5, 8),
(6, 7), (6, 8), (6, 9),
(7, 8), (7, 9), (7, 10),
(8, 9), (8, 10), (8, 11),
(9, 6), (9, 7), (9, 8),
(10, 7), (10, 8), (10, 9),
(11, 8), (11, 9), (11, 10),
(12, 9), (12, 10), (12, 11),
(13, 6), (13, 7), (13, 8),
(14, 7), (14, 8), (14, 9),
(15, 8), (15, 9), (15, 10),
(16, 9), (16, 10), (16, 11),
(17, 6), (17, 7), (17, 8),
(18, 7), (18, 8), (18, 9),
(19, 8), (19, 9), (19, 10);
INSERT INTO plant_seedling (plant_id, seedling_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), 
(5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10), (11, 11), (12, 12),
(13, 13), (14, 14), (15, 15), (16, 16), (17, 17), (18, 18), (19, 19);

INSERT INTO plant_harvest (plant_id, harvest_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), 
(5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10), (11, 11), (12, 12),
(13, 13), (14, 14), (15, 15), (16, 16), (17, 17), (18, 18), (19, 19);

INSERT INTO plantuser (plant_id) VALUES (1);
