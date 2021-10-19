-- database-2.cluster-ro-cowe6qx6tye0.us-east-2.rds.amazonaws.com
-- CREATE USER 'msis-reader'@'%' IDENTIFIED BY 'msisreadonly';

CREATE DATABASE IF NOT EXISTS msisdb;
USE msisdb;

CREATE TABLE book(
	id int PRIMARY KEY AUTO_INCREMENT ,
    title varchar(24) NOT NULL,
    author varchar(24) NOT NULL,
    pyear int NOT NULL,
    publisher varchar(24) NOT NULL,
    pcount int NOT NULL,
    msrp float NOT NULL
);

INSERT INTO book (id, title, author, pyear, publisher, pcount, msrp) VALUES 
(1, '1984', 'George Orwell', 1949, 'Secker & Warburg', 328, 6.99),
(2, 'The Handmaids Tale', 'Margaret Atwood', 1985, 'McClelland and Stewart', 311, 7.50),
(3, 'Farenheit 451', 'Ray Bradbury', 1953, 'Simon & Schuster', 193, 4.99),
(4, 'The God of Small Things', 'Arundhati Roy', 1996, 'IndiaInk', 321, 5.83),
(5, 'To Kill a Mockingbird', 'Harper Lee', 1960, 'J.B. Lippincott & Co.', 281, 7.00);
