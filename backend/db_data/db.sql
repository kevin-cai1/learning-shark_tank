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

DROP TABLE IF EXISTS Course;
CREATE TABLE Course (
    name            text,
    isCertificate   boolean,
    pillar          text,
    primary key     (name)
);

DROP TABLE IF EXISTS CourseToCareer;
CREATE TABLE CourseToCareer (
    course          text references Course(name),
    careerTrack     text,
    primary key     (course, careerTrack)
);

DROP TABLE IF EXISTS LearningEntry;
CREATE TABLE LearningEntry (
    id          integer,
    user        text references User(email),
    course text references Course(name),
    start_date  text,
    end_date    text,
    primary key (id)
);