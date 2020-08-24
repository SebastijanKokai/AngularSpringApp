DROP TABLE IF EXISTS obrazovanje CASCADE;
DROP TABLE IF EXISTS preduzece CASCADE;
DROP TABLE IF EXISTS sektor CASCADE;
DROP TABLE IF EXISTS radnik CASCADE;

DROP SEQUENCE IF EXISTS obrazovanje_seq;
DROP SEQUENCE IF EXISTS preduzece_seq;
DROP SEQUENCE IF EXISTS sektor_seq;
DROP SEQUENCE IF EXISTS radnik_seq;

CREATE TABLE obrazovanje(
	id integer,
    naziv character varying(100),
    stepen_strucne_spreme character varying(10),
	opis character varying(500)
);

CREATE TABLE preduzece(
	id integer not null,
    naziv character varying(100) not null,
    pib integer not null,
    sediste character varying(100) not null,
	opis character varying(500)
);

CREATE TABLE sektor(
    id integer not null,
    naziv character varying(100) not null,
    oznaka character varying(10) not null,
    preduzece integer not null
);

CREATE TABLE radnik(
	id integer not null,
    ime character varying(50) not null,
    prezime character varying(50) not null,
    broj_lk integer not null,
    obrazovanje integer not null,
    sektor integer not null
);

ALTER TABLE obrazovanje ADD CONSTRAINT
PK_Obrazovanje PRIMARY KEY(id);
ALTER TABLE preduzece ADD CONSTRAINT
PK_Preduzece PRIMARY KEY(id);
ALTER TABLE sektor ADD CONSTRAINT
PK_Sektor PRIMARY KEY(id);
ALTER TABLE radnik ADD CONSTRAINT
PK_Radnik PRIMARY KEY(id);

ALTER TABLE sektor ADD CONSTRAINT
FK_Sektor_Preduzece FOREIGN KEY(preduzece) REFERENCES preduzece(id);
ALTER TABLE radnik ADD CONSTRAINT
FK_Radnik_Obrazovanje FOREIGN KEY(obrazovanje) REFERENCES obrazovanje(id);
ALTER TABLE radnik ADD CONSTRAINT
FK_Radnik_Sektor FOREIGN KEY(sektor) REFERENCES sektor(id);

CREATE INDEX IDXFK_Sektor_Preduzece
ON sektor(preduzece);
CREATE INDEX IDXFK_Radnik_Obrazovanje
ON radnik(obrazovanje);
CREATE INDEX IDXFK_Radnik_Sektor
ON radnik(sektor);

CREATE SEQUENCE obrazovanje_seq
INCREMENT 1;
CREATE SEQUENCE preduzece_seq
INCREMENT 1;
CREATE SEQUENCE sektor_seq
INCREMENT 1;
CREATE SEQUENCE radnik_seq
INCREMENT 1;