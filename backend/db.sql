-- schema for Learning Tracking System database

CREATE TABLE User (
    email       text,
    name        text not null,
    b_unit      text,
    role        text,
    coach       text references Coach(email),
    primary key (email)
);

CREATE TABLE Coach (
    email       text,
    name        text,
    primary key (email)
);

CREATE TABLE Certification (
    name        text,
    primary key (name)
);

CREATE TABLE LearningEntry (
    id          integer,
    user        text references User(email),
    certificate text references Certification(name),
    start_date  text,
    end_date    text,
    primary key (id)
);