-- Execute these queries directly on your db server

CREATE DATABASE kitchen;

USE kitchen;

CREATE TABLE menu(
    menuId SERIAL PRIMARY KEY,
    name VARCHAR(255),
    category VARCHAR(255),
    price DECIMAL(10,2),
    description VARCHAR(255)
);