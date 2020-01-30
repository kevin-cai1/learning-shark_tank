-- schema for Learning Tracking System database
DROP TABLE IF EXISTS User;
CREATE TABLE User (
    email       text,
    name        text not null,
    b_unit      text,
    role        text,
    coach       text references Coach(email),
    primary key (email)
);

DROP TABLE IF EXISTS Coach;
CREATE TABLE Coach (
    email       text,
    name        text,
    primary key (email)
);

DROP TABLE IF EXISTS Task;
CREATE TABLE Task (
    id              integer,
    name            text,
    isCertificate   boolean,
    pillar          text,
    primary key     (id)
);

DROP TABLE IF EXISTS TaskToCareer;
CREATE TABLE TaskToCareer (
    task          text references Task(name),
    careerTrack     text,
    primary key     (task, careerTrack)
);

DROP TABLE IF EXISTS LearningEntry;
CREATE TABLE LearningEntry (
    id          integer,
    user        text references User(email),
    task integer references Task(id),
    start_date  text,
    end_date    text,
    completed boolean,
    primary key (id)
);