CREATE DATABASE tcms;

use tcms;

CREATE TABLE IF NOT EXISTS users (  id   INTEGER PRIMARY KEY AUTO_INCREMENT,
                      username VARCHAR(255) NOT NULL,
                      password VARCHAR(255) NOT NULL,
                      email VARCHAR(255) NOT NULL,
                      code VARCHAR(255) NOT NULL,
                      phone_no numeric(10))
                    CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS usercodes (  id   INTEGER PRIMARY KEY AUTO_INCREMENT,
                          code VARCHAR(255) NOT NULL,
                          frequency INT(11) DEFAULT 1,
                          starttime TIMESTAMP DEFAULT NOW())
                       CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS parties (
                       	id   INTEGER PRIMARY KEY AUTO_INCREMENT,
                       	name	VARCHAR(255) NOT NULL,
                        city  VARCHAR(45) NOT NULL,
                        state  VARCHAR(45) NOT NULL,
                        phone_no  VARCHAR(45) NULL
                  ) CHARACTER SET utf8;
CREATE TABLE `states` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `abbr` VARCHAR(5) NULL DEFAULT NULL,
  `name` VARCHAR(65) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

CREATE TABLE IF NOT EXISTS transporters (
                      	id   INTEGER PRIMARY KEY AUTO_INCREMENT,
                      	name	VARCHAR(255) NOT NULL
                      ) CHARACTER SET utf8;

INSERT INTO users (username, password,email,phone_no,code)  VALUES("Priyanka Jain", 'qwert123',"priyanka.jn64@gmail.com", "9811187708","niaj123");
INSERT INTO usercodes('code', 'frequency') VALUES ('niaj123', '1');

INSERT INTO parties (name, city, state) VALUES ('Amantran Bastralaya', 'dinhata', 'WB');
INSERT INTO parties (name, city, state) VALUES ('Bhansali enterprises', 'kolkata', 'WB');
INSERT INTO parties (name, city, state, phone_no) VALUES ('Swapan Kr Saha', 'delhi', 'DEL', '9811187708');

CREATE TABLE transportentry (
  id INT NOT NULL AUTO_INCREMENT,
  invoice_no VARCHAR(45) NOT NULL,
  bill_date DATETIME NULL,
  party VARCHAR(150) NULL,
  item_desc VARCHAR(225) NULL,
  amount VARCHAR(45) NULL,
  cgst VARCHAR(45) NULL,
  sgst VARCHAR(45) NULL,
  igst VARCHAR(45) NULL,
  total VARCHAR(45) NULL,
  transporter VARCHAR(150) NULL,
  lr_no VARCHAR(45) NULL,
  booking_stn VARCHAR(45) NULL,
  bilty_date DATETIME NULL,
  bale_qty INT(10) NULL,
  weight VARCHAR(45) NULL,
  freight VARCHAR(45) NULL,
  bale_numbers VARCHAR(125) NULL,
  bale_type VARCHAR(45) NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC),
  UNIQUE INDEX invoice_no_UNIQUE (invoice_no ASC));


  INSERT INTO transportentry (invoice_no, bill_date, party, item_desc, amount, cgst, sgst, total, transporter, lr_no, booking_stn, bilty_date, bale_qty, weight, freight,bale_numbers,bale_type) VALUES ('abc1', '2018-03-22T15:00:30', '2', 'xcsdx sdsd', '10', '0', '0', '10', '5', 'sd1', 'rew', '2018-03-22T15:00:52', '5', '25','250','1,2,3,4,5','autoIncrement');

  CREATE TABLE `cities` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `state` VARCHAR(45) NULL,
    PRIMARY KEY (`id`));
