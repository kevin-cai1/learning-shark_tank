INSERT INTO User VALUES ('kevcai@deloitte.com.au', 'Kevin Cai', 'DPE', 'Vacationer', 'coach1@deloitte.com.au');
INSERT INTO User VALUES ('sluong@deloitte.com.au', 'Serena Luong', 'DPE', 'Vacationer', 'coach@deloitte.com.au');
INSERT INTO User VALUES ('tajacobs@deloitte.com.au', 'Tamar Jacobs', 'DPE', 'Vacationer', 'coach@deloitte.com.au');
INSERT INTO User VALUES ('jabanh@deloitte.com.au', 'Jackie Banh', 'DPE', 'Vacationer', 'coach1@deloitte.com.au');

INSERT INTO Coach VALUES ('coach@deloitte.com.au', 'Coach');
INSERT INTO Coach VALUES ('coach1@deloitte.com.au', 'Coach 1');

INSERT INTO Task VALUES ('AWS', 'true', 'Specialisation');
INSERT INTO Task VALUES ('Mulesoft', 'false', 'Specialisation');
INSERT INTO Task VALUES ('Azure', 'true','Cloud');

-- https://hub.deloittedigital.com.au/wiki/pages/viewpage.action?spaceKey=PEKM&title=_Training+Catalogue

--AWS
INSERT INTO Task VALUES ('AWS Technical Essentials', 'false', 'Integration');
INSERT INTO Task VALUES ('AWS - Developing on AWS', 'false', 'Integration');
INSERT INTO Task VALUES ('AWS - Architecting on AWS', 'false', 'Integration');
INSERT INTO Task VALUES ('AWS - System Operations on AWS', 'false', 'Operate');
INSERT INTO Task VALUES ('AWS Certified Developer - Associate', 'true', 'Integration');
INSERT INTO Task VALUES ('AWS Certified Solutions Architect - Professional', 'true', 'Integration');
INSERT INTO Task VALUES ('AWS Certified SysOps Administrator', 'true', 'Operate');

--GCP
INSERT INTO Task VALUES ('GCP - Google Cloud Platform Fundamentals: Core Infrastructure', 'false', 'Integration');
INSERT INTO Task VALUES ('GCP - Developing Applications with Google Cloud Platform', 'false', 'Integration');
INSERT INTO Task Values ('GCP - Associate Cloud Engineer', 'true', 'Integration');
INSERT INTO Task Values ('GCP - Professional Cloud Architect', 'true', 'Integration');
INSERT INTO Task Values ('GCP - Professional Data Engineer', 'true', 'Integration');

--MuleSoft
INSERT INTO Task VALUES ('MuleSoft.U Developer Fundamentals (Mule 3)', 'false', 'Integration');
INSERT INTO Task VALUES ('MuleSoft.U Developer Fundamentals (Mule 4)', 'false', 'Integration');
INSERT INTO Task VALUES ('MuleSoft Certified Developer - Integration Professional (Mule 3)', 'true', 'Integration');
INSERT INTO Task VALUES ('MuleSoft Certified Developer - Level 1 (Mule 4)', 'true', 'Integration');

-- LearningEntry(id, user, course, start_date, end_date)
-- Date should be in the format of yyyy-mm-dd
-- id should be unique
INSERT INTO LearningEntry VALUES ('1', 'kevcai@deloitte.com.au', 'AWS', '2020-01-20', '2020-07-20','False');
INSERT INTO LearningEntry VALUES ('2','tajacobs@deloitte.com.au','Azure','2020-01-23','2020-02-23','False');
INSERT INTO LearningEntry VALUES ('3','jabanh@deloitte.com.au','MuleSoft.U Developer Fundamentals (Mule 3)','2020-01-13','2020-02-07','False');
INSERT INTO LearningEntry VALUES ('4','jabanh@deloitte.com.au','MuleSoft Certified Developer - Integration Professional (Mule 3)','2020-02-10','2020-02-10','False');
INSERT INTO LearningEntry VALUES ('5','sluong@deloitte.com.au','Azure','2020-01-23','2020-01-25','False');