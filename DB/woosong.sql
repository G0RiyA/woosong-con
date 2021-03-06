CREATE DATABASE IF NOT EXISTS woosong;

USE woosong;

CREATE TABLE stations(
  name VARCHAR(15) NOT NULL PRIMARY KEY,
  id INT UNSIGNED
);

CREATE TABLE queue(
  no INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  itemname VARCHAR(50) NOT NULL,
  daytime CHAR(11) NOT NULL,
  getLocation VARCHAR(30) NOT NULL,
  storageLocation VARCHAR(30) NOT NULL,
  imagePath CHAR(33) NOT NULL,
  description VARCHAR(50),

  FOREIGN KEY (storageLocation) REFERENCES stations(name)
);

CREATE TABLE items(
  no INT NOT NULL PRIMARY KEY,
  itemname VARCHAR(50) NOT NULL,
  daytime CHAR(11) NOT NULL,
  getLocation VARCHAR(30) NOT NULL,
  storageLocation VARCHAR(30) NOT NULL,
  imagePath CHAR(33) NOT NULL,
  description VARCHAR(50),

  FOREIGN KEY (storageLocation) REFERENCES stations(name)
);

CREATE TABLE reservation(
  no INT NOT NULL PRIMARY KEY,
  itemname VARCHAR(50) NOT NULL,
  daytime CHAR(11) NOT NULL,
  getLocation VARCHAR(30) NOT NULL,
  storageLocation VARCHAR(30) NOT NULL,
  imagePath VARCHAR(33) NOT NULL,
  owner CHAR(11),
  description VARCHAR(50),
  comment VARCHAR(50),

  FOREIGN KEY (storageLocation) REFERENCES stations(name)
);
