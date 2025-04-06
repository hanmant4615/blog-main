create database blog;

use blog;

create table user (
    id integer primary key auto_increment,
    firstName varchar(20) NOT NULL,
    lastName varchar(20) NOT NULL,
    email varchar(50) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
    phone varchar(15) NOT NULL,
    ProfileImage text
);

create table blogItems (
    id integer primary key auto_increment,
    title varchar(100),
    details varchar(1024),
    userId integer,
    status int(1) default 0,
    createdDate timestamp default CURRENT_TIMESTAMP
);

-- Done 
