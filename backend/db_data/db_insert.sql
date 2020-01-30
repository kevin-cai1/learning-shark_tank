INSERT INTO User VALUES ('kevcai@deloitte.com.au', 'Kevin Cai', 'DPE', 'Vacationer', 'coach1@deloitte.com.au');
INSERT INTO User VALUES ('sluong@deloitte.com.au', 'Serena Luong', 'DPE', 'Vacationer', 'coach@deloitte.com.au');
INSERT INTO User VALUES ('tajacobs@deloitte.com.au', 'Tamar Jacobs', 'DPE', 'Vacationer', 'coach@deloitte.com.au');
INSERT INTO User VALUES ('jabanh@deloitte.com.au', 'Jackie Banh', 'DPE', 'Vacationer', 'coach1@deloitte.com.au');

INSERT INTO Coach VALUES ('coach@deloitte.com.au', 'Coach');
INSERT INTO Coach VALUES ('coach1@deloitte.com.au', 'Coach 1');

-- https://hub.deloittedigital.com.au/wiki/pages/viewpage.action?spaceKey=PEKM&title=_Training+Catalogue

--AWS
INSERT INTO Task VALUES (1, 'AWS Technical Essentials', 0, 'Integration');
INSERT INTO Task VALUES (2, 'AWS - Developing on AWS', 0, 'Integration');
INSERT INTO Task VALUES (3, 'AWS - Architecting on AWS', 0, 'Integration');
INSERT INTO Task VALUES (4, 'AWS - System Operations on AWS', 0, 'Operate');
INSERT INTO Task VALUES (5, 'AWS Certified Developer - Associate', 1, 'Integration');
INSERT INTO Task VALUES (6, 'AWS Certified Solutions Architect - Professional', 1, 'Integration');
INSERT INTO Task VALUES (7, 'AWS Certified SysOps Administrator', 1, 'Operate');

--GCP
INSERT INTO Task VALUES (8, 'GCP - Google Cloud Platform Fundamentals: Core Infrastructure', 0, 'Integration');
INSERT INTO Task VALUES (9, 'GCP - Developing Applications with Google Cloud Platform', 0, 'Integration');
INSERT INTO Task Values (10, 'GCP - Associate Cloud Engineer', 1, 'Integration');
INSERT INTO Task Values (11, 'GCP - Professional Cloud Architect', 1, 'Integration');
INSERT INTO Task Values (12, 'GCP - Professional Data Engineer', 1, 'Integration');

--MuleSoft
INSERT INTO Task VALUES (13, 'MuleSoft.U Developer Fundamentals (Mule 3)', 0, 'Integration');
INSERT INTO Task VALUES (14, 'MuleSoft.U Developer Fundamentals (Mule 4)', 0, 'Integration');
INSERT INTO Task VALUES (15, 'MuleSoft Certified Developer - Integration Professional (Mule 3)', 1, 'Integration');
INSERT INTO Task VALUES (16, 'MuleSoft Certified Developer - Level 1 (Mule 4)', 1, 'Integration');

-- LearningEntry(id, user, course, start_date, end_date)
-- Date should be in the format of yyyy-mm-dd
-- id should be unique
-- Booleans are stored as 0 (false), 1 (true): queried as "SELECT * FROM _ WHERE completed = True"
INSERT INTO LearningEntry VALUES ('1', 'kevcai@deloitte.com.au', 5, '2020-01-20', '2020-07-20',1);
INSERT INTO LearningEntry VALUES ('2','tajacobs@deloitte.com.au', 5,'2020-01-23','2020-02-23',0);
INSERT INTO LearningEntry VALUES ('3','jabanh@deloitte.com.au', 11,'2020-01-13','2020-02-07',1);
INSERT INTO LearningEntry VALUES ('4','jabanh@deloitte.com.au', 15,'2020-02-10','2020-02-10',0);
INSERT INTO LearningEntry VALUES ('5','sluong@deloitte.com.au', 16,'2020-01-23','2020-01-25',0);
INSERT INTO LearningEntry VALUES ('6','kevcai@deloitte.com.au', 2,'2020-03-23','2020-04-25',0);