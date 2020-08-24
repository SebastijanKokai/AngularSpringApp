-- preduzece
-- test insert
INSERT INTO "preduzece"("id", "naziv", "pib", "sediste", "opis")
VALUES (-100, 'Test', '100001636', 'Test', 'Test');

INSERT INTO "preduzece"("id", "naziv", "pib", "sediste", "opis")
VALUES (nextval('preduzece_seq'), 'AD Imlek', '100001636', 'Industrijsko naselje bb', 'Opis AD Imlek');
INSERT INTO "preduzece"("id", "naziv", "pib", "sediste", "opis")
VALUES (nextval('preduzece_seq'), 'Henkel Srbija', '110001636', 'Bulevar Oslobodjenja 999', 'Opis Henkel Srbija');
INSERT INTO "preduzece"("id", "naziv", "pib", "sediste", "opis")
VALUES (nextval('preduzece_seq'), 'Fruit DOO', '120001636', 'Novosadska 777', 'Opis Fruit DOO');
INSERT INTO "preduzece"("id", "naziv", "pib", "sediste", "opis")
VALUES (nextval('preduzece_seq'), 'CENTROPROIZVOD', '120001636', 'Dobanovacki put bb', 'Opis CENTROPROIZVOD');

-- obrazovanje
-- test insert
INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme", "opis")
VALUES (-100, 'Diplomirani test', 'VII-1a', 'opis test');

INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme", "opis")
VALUES (nextval('obrazovanje_seq'), 'Diplomirani inzenjer racunarstva', 'VII-1a', 'opis RAC');
INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme", "opis")
VALUES (nextval('obrazovanje_seq'), 'Master  inzenjer informacionih tehnologija', 'VII-1b', 'opis IIT');
INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme", "opis")
VALUES (nextval('obrazovanje_seq'), 'Master ekonomije', 'VII-1b', 'opis EKO');

INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme", "opis")
VALUES (nextval('obrazovanje_seq'), 'Diplomirani inzenjer menadzmenta', 'VII-1a', 'opis MEN');
INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme", "opis")
VALUES (nextval('obrazovanje_seq'), 'Elektrotehnicar informacionih tehnologija', 'IV stepen', 'opis IT');
INSERT INTO "obrazovanje"("id", "naziv", "stepen_strucne_spreme", "opis")
VALUES (nextval('obrazovanje_seq'), 'Zavarivac', 'III stepen', 'opis ZAV');


-- sektor
-- test insert
INSERT INTO "sektor"("id", "naziv", "oznaka", "preduzece")
VALUES (-100, 'Sektor test', 'test', 1);

INSERT INTO "sektor"("id", "naziv", "oznaka", "preduzece")
VALUES (nextval('sektor_seq'), 'Sektor A1', 'A1', 1);
INSERT INTO "sektor"("id", "naziv", "oznaka", "preduzece")
VALUES (nextval('sektor_seq'), 'Sektor B1', 'B1', 1);
INSERT INTO "sektor"("id", "naziv", "oznaka", "preduzece")
VALUES (nextval('sektor_seq'), 'Sektor C1', 'C1', 1);

INSERT INTO "sektor"("id", "naziv", "oznaka", "preduzece")
VALUES (nextval('sektor_seq'), 'Sektor F1', 'F1', 2);
INSERT INTO "sektor"("id", "naziv", "oznaka", "preduzece")
VALUES (nextval('sektor_seq'), 'Sektor G1', 'G1', 2);
INSERT INTO "sektor"("id", "naziv", "oznaka", "preduzece")
VALUES (nextval('sektor_seq'), 'Sektor H1', 'H1', 2);


INSERT INTO "sektor"("id", "naziv", "oznaka", "preduzece")
VALUES (nextval('sektor_seq'), 'Sektor I1', 'I1', 3);
INSERT INTO "sektor"("id", "naziv", "oznaka", "preduzece")
VALUES (nextval('sektor_seq'), 'Sektor J1', 'J1', 3);
INSERT INTO "sektor"("id", "naziv", "oznaka", "preduzece")
VALUES (nextval('sektor_seq'), 'Sektor K1', 'K1', 3);


-- radnik
-- test insert
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (-100, 'Test', 'Testic', 1, 1, 1);

INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Milos', 'Milivojevic', 111, 1, 1);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Dragan', 'Milosevic', 222, 2, 2);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Srboljub', 'Maric', 333, 3, 3);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Andjelko', 'Zrnic', 444, 4, 4);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Milica', 'Starcevic', 555, 1, 5);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Anastasija', 'Evetovic', 666, 2, 6);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Sofija', 'Despotovic', 777, 3, 7);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Slobodan', 'Milic', 888, 4, 8);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Pavle', 'Savic', 999, 5, 9);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Marko', 'Raznatovic', 101, 3, 1);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Andrea', 'Lolic', 102, 5, 2);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Rastko', 'Dobric', 103, 3, 3);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Radmilo', 'Malencic', 104, 3, 4);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Sara', 'Jovic', 105, 6, 5);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Mara', 'Kostic', 106, 6, 5);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Klara', 'Savic', 107, 6, 5);
INSERT INTO "radnik"("id", "ime", "prezime", "broj_lk", "obrazovanje", "sektor")
VALUES (nextval('radnik_seq'), 'Antonije', 'Zrnic', 108, 4, 6);







