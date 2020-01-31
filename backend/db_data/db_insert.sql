INSERT INTO User VALUES ('kevcai@deloitte.com.au', 'Kevin Cai', 'DPE', 'Vacationer', 'coach1@deloitte.com.au');
INSERT INTO User VALUES ('sluong@deloitte.com.au', 'Serena Luong', 'DPE', 'Vacationer', 'coach@deloitte.com.au');
INSERT INTO User VALUES ('tajacobs@deloitte.com.au', 'Tamar Jacobs', 'DPE', 'Vacationer', 'coach@deloitte.com.au');
INSERT INTO User VALUES ('jabanh@deloitte.com.au', 'Jackie Banh', 'DPE', 'Vacationer', 'coach1@deloitte.com.au');

INSERT INTO Coach VALUES ('coach@deloitte.com.au', 'Coach');
INSERT INTO Coach VALUES ('coach1@deloitte.com.au', 'Coach 1');

-- https://hub.deloittedigital.com.au/wiki/pages/viewpage.action?spaceKey=PEKM&title=_Training+Catalogue

-- SPECIALISATION --
--AWS
INSERT INTO Task VALUES (1, 'AWS Technical Essentials', 0, 'Specialisation', 'Integration');
INSERT INTO Task VALUES (2, 'AWS - Developing on AWS', 0, 'Specialisation', 'Integration');
INSERT INTO Task VALUES (3, 'AWS - Architecting on AWS', 0, 'Specialisation', 'Integration');
INSERT INTO Task VALUES (4, 'AWS - System Operations on AWS', 0, 'Specialisation', 'Operate');
INSERT INTO Task VALUES (5, 'AWS Certified Developer - Associate', 1, 'Specialisation', 'Integration');
INSERT INTO Task VALUES (6, 'AWS Certified Solutions Architect - Professional', 1, 'Specialisation', 'Integration');
INSERT INTO Task VALUES (7, 'AWS Certified SysOps Administrator', 1, 'Specialisation', 'Operate');
--GCP
INSERT INTO Task VALUES (8, 'GCP - Google Cloud Platform Fundamentals: Core Infrastructure', 0, 'Specialisation', 'Integration');
INSERT INTO Task VALUES (9, 'GCP - Developing Applications with Google Cloud Platform', 0, 'Specialisation', 'Integration');
INSERT INTO Task Values (10, 'GCP - Associate Cloud Engineer', 1, 'Specialisation', 'Integration');
INSERT INTO Task Values (11, 'GCP - Professional Cloud Architect', 1, 'Specialisation', 'Integration');
INSERT INTO Task Values (12, 'GCP - Professional Data Engineer', 1, 'Specialisation', 'Integration');
--MuleSoft
INSERT INTO Task VALUES (13, 'MuleSoft.U Developer Fundamentals (Mule 3)', 0, 'Specialisation', 'Integration');
INSERT INTO Task VALUES (14, 'MuleSoft.U Developer Fundamentals (Mule 4)', 0, 'Specialisation', 'Integration');
INSERT INTO Task VALUES (15, 'MuleSoft Certified Developer - Integration Professional (Mule 3)', 1, 'Specialisation', 'Integration');
INSERT INTO Task VALUES (16, 'MuleSoft Certified Developer - Level 1 (Mule 4)', 1, 'Specialisation', 'Integration');

-- CONSULTING ACUMEN --
INSERT INTO Task VALUES (17, 'Onboarding', 1, 'Consulting', NULL);
INSERT INTO Task VALUES (18, 'Consulting Process', 1, 'Consulting', NULL);
INSERT INTO Task VALUES (19, 'Engagement Management', 1, 'Consulting', NULL);
INSERT INTO Task VALUES (20, 'Design for Business', 1, 'Consulting', NULL);
INSERT INTO Task VALUES (21, 'People & Self Development', 0, 'Consulting', NULL);
INSERT INTO Task VALUES (22, 'Interpersonal Excellence', 0, 'Consulting', NULL);
INSERT INTO Task VALUES (23, 'Agile', 1, 'Consulting', NULL);
INSERT INTO Task VALUES (24, 'Lean Six Sigma', 1, 'Consulting', NULL);
INSERT INTO Task VALUES (25, 'Human Capital', 0, 'Consulting', NULL);
INSERT INTO Task VALUES (26, 'Technology, Strategy & Architecture', 1, 'Consulting', NULL);
INSERT INTO Task VALUES (27, 'CEO', 1, 'Consulting', NULL);
INSERT INTO Task VALUES (28, 'COO', 1, 'Consulting', NULL);

-- METHODOLOGY --
INSERT INTO Task VALUES (29, 'SAFe', 1, 'Methodology', NULL);
INSERT INTO Task VALUES (30, 'SCRUM', 1, 'Methodology', NULL);
INSERT INTO Task VALUES (31, 'ITIL4', 1, 'Methodology', NULL);
INSERT INTO Task VALUES (32, 'DevOps', 1, 'Methodology', NULL);



-- LearningEntry(id, user, course, start_date, end_date)
-- Date should be in the format of yyyy-mm-dd
-- id should be unique
-- Booleans are stored as 0 (false), 1 (true): queried as "SELECT * FROM _ WHERE completed = True"
INSERT INTO LearningEntry VALUES ('1', 'kevcai@deloitte.com.au', 5, '2020-01-20', '2020-07-20',1);
INSERT INTO LearningEntry VALUES ('3','jabanh@deloitte.com.au', 11,'2020-01-13','2020-02-07',1);
INSERT INTO LearningEntry VALUES ('4','jabanh@deloitte.com.au', 15,'2020-02-10','2020-02-10',0);
INSERT INTO LearningEntry VALUES ('5','sluong@deloitte.com.au', 16,'2020-01-23','2020-01-25',0);
INSERT INTO LearningEntry VALUES ('6','kevcai@deloitte.com.au', 2,'2020-03-23','2020-04-25',0);
INSERT INTO LearningEntry VALUES ('8','tajacobs@deloitte.com.au', 28,'2020-01-01','2020-01-10',1); -- completed
INSERT INTO LearningEntry VALUES ('7','tajacobs@deloitte.com.au', 32,'2019-11-23','2020-01-20',0); -- overdue, not complete
INSERT INTO LearningEntry VALUES ('2','tajacobs@deloitte.com.au', 5,'2020-01-23','2020-02-23',0); -- active
INSERT INTO LearningEntry VALUES ('11','tajacobs@deloitte.com.au', 5,'2019-11-01','2020-02-30',0); -- active
INSERT INTO LearningEntry VALUES ('9','tajacobs@deloitte.com.au', 17,'2020-05-01','2020-07-31',0); -- future
INSERT INTO LearningEntry VALUES ('10','tajacobs@deloitte.com.au', 12,'2020-08-01','2020-12-31',0); -- future
