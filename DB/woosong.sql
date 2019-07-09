CREATE DATABASE IF NOT EXISTS woosong;

USE woosong;

CREATE TABLE stations(
  name VARCHAR(15) NOT NULL PRIMARY KEY,
  id INT UNSIGNED
);

CREATE TABLE admin(
  id VARCHAR(20) NOT NULL PRIMARY KEY,
  pw CHAR(88) NOT NULL,
  station VARCHAR(20) NOT NULL,

  FOREIGN KEY (station) REFERENCES stations(name)
);

CREATE TABLE queue(
  no INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  itemname VARCHAR(50) NOT NULL,
  daytime CHAR(16) NOT NULL,
  getLocation VARCHAR(30) NOT NULL,
  storageLocation VARCHAR(30) NOT NULL,
  imagePath CHAR(25) NOT NULL,
  user CHAR(11),

  FOREIGN KEY (storageLocation) REFERENCES stations(name)
);

CREATE TABLE items(
  no INT NOT NULL PRIMARY KEY,
  itemname VARCHAR(50) NOT NULL,
  daytime CHAR(16) NOT NULL,
  getLocation VARCHAR(30) NOT NULL,
  storageLocation VARCHAR(30) NOT NULL,
  imagePath CHAR(25) NOT NULL,
  user CHAR(11),

  FOREIGN KEY (storageLocation) REFERENCES stations(name)
);

CREATE TABLE reservation(
  no INT NOT NULL PRIMARY KEY,
  itemname VARCHAR(50) NOT NULL,
  daytime CHAR(16) NOT NULL,
  reservDay CHAR(16) NOT NULL,
  getLocation VARCHAR(30) NOT NULL,
  storageLocation VARCHAR(30) NOT NULL,
  imagePath VARCHAR(25) NOT NULL,
  user CHAR(11),
  owner CHAR(11),

  FOREIGN KEY (storageLocation) REFERENCES stations(name)
);

CREATE TABLE found(
  no INT NOT NULL PRIMARY KEY,
  itemname VARCHAR(50) NOT NULL,
  daytime CHAR(16) NOT NULL,
  reservDay CHAR(16) NOT NULL,
  getDay CHAR(16) NOT NULL,
  storageLocation VARCHAR(30) NOT NULL,
  imagePath VARCHAR(25) NOT NULL,
  user CHAR(11),
  owner CHAR(11),

  FOREIGN KEY (storageLocation) REFERENCES stations(name)
);
