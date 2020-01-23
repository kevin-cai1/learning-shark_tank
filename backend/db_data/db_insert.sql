INSERT INTO User VALUES ('kevcai@deloitte.com.au', 'Kevin Cai', 'DPE', 'Vacationer', 'coach1@deloitte.com.au');
INSERT INTO User VALUES ('sluong@deloitte.com.au', 'Serena Luong', 'DPE', 'Vacationer', 'coach@deloitte.com.au');
INSERT INTO User VALUES ('tajacobs@deloitte.com.au', 'Tamar Jacobs', 'DPE', 'Vacationer', 'coach@deloitte.com.au');
INSERT INTO User VALUES ('jabanh@deloitte.com.au', 'Jackie Banh', 'DPE', 'Vacationer', 'coach1@deloitte.com.au');

INSERT INTO Coach VALUES ('coach@deloitte.com.au', 'Coach');
INSERT INTO Coach VALUES ('coach1@deloitte.com.au', 'Coach 1');

INSERT INTO Course VALUES ('AWS', 'true', 'Specialisation');
INSERT INTO Course VALUES ('Mulesoft', 'false', 'Specialisation');
INSERT INTO Course VALUES ('Azure', 'true','Cloud');

-- LearningEntry(id, user, course, start_date, end_date)
-- id should be unique
INSERT INTO LearningEntry VALUES ('1', 'kevcai@deloitte.com.au', 'AWS', '20-01-2020', '20-07-2020','False');
INSERT INTO LearningEntry VALUES ('2','tajacobs@deloitte.com.au','Azure','23-01-2020','23-02-2020','False');