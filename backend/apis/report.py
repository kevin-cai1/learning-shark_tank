from flask_restplus import Namespace, Resource, fields
from flask import request, jsonify
import db
import re

api = Namespace('report', description='Reporting specific operations')

@api.route('/all') # for each task, count number of users with active/inactive tasks on their learning plan 
class countAllEntries(Resource):
    @api.doc(description="Return number of people who have elected to complete each course")
    @api.response(200, "Successful")
    @api.response(404, "No learning plans found")
    def get(self):
        # get db = all entries
        plans = {
            'ok' : False,
            'entry_count': 0,
            'entries': list()
        }

        entry_count = 0
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        c.execute("SELECT Task.id, Task.name, COUNT(LearningEntry.task), Task.pillar as num FROM Task LEFT OUTER JOIN LearningEntry ON Task.id = LearningEntry.task GROUP BY Task.id ORDER BY COUNT(LearningEntry.task) DESC") #quotes is SQL command/query. question mark defines placeholder, second part - give tuple 
        results = c.fetchall() # actually gets result from query 
        # fetch all is a list of lists 

        if (results == []): # no result from database
            api.abort(404, "No learning plans found",ok=False)

        for entry in results:
            course = {
                'course_id': entry[0],
                'course_name': entry[1],
                'count_users': entry[2],
                'pillar': entry[3],

            }
            entry_count = entry_count + 1
            plans['entries'].append(course)

        plans['ok'] = True
        plans['entry_count'] = entry_count

        conn.close() # make sure to close database 
        return plans


@api.route('/<string:task_id>') # for a particular task, return details of users currently learning
@api.doc(params={'task_id': 'the task_id associated with the task'}) 
class getEntryReport(Resource):
    @api.doc(description="Return user data related to a specific task if task is ACTIVE")
    @api.response(200, "Successful")
    @api.response(404, "No data found")
    @api.response(404, "Task not found")
    def get(self, task_id):
        plans = { #dictionary
            'ok': False,
            'number_interested' : 0, #label : information
            'entries': list() 
        }
        entry_count = 0
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        c.execute("SELECT EXISTS(SELECT name FROM Task WHERE id = ?)", (task_id,))  
        user_check = c.fetchone()[0]    # returns 1 if exists, otherwise 0

        if (user_check == 0):   # user doesn't exist
            api.abort(404, "Task '{}' doesn't exist".format(task_id),ok=False)

        c.execute("SELECT User.name, User.email FROM Task LEFT OUTER JOIN (LearningEntry LEFT OUTER JOIN User ON LearningEntry.user = User.email) ON Task.id = LearningEntry.task WHERE Task.id=? AND User.name IS NOT null AND (LearningEntry.start_date < (SELECT strftime('%Y-%m-%d', 'now'))) AND LearningEntry.completed = False", (task_id,)) #quotes is SQL command/query. question mark defines placeholder, second part - give tuple 
        results = c.fetchall() # actually gets result from query 
        # fetch all is a list of lists 
        conn.close() # make sure to close database 

        if (results == []): # no result from database
            plans['ok'] = True
            plans['number_interested'] = 0
        else:
            for entry in results:
                course = {
                    'name': entry[0],
                    'email': entry[1],
                }
                entry_count = entry_count + 1
                plans['entries'].append(course)
            plans['ok'] = True
            plans['number_interested'] = entry_count
        return plans


@api.route('/all/pillar') # for each task, count number of users with active/inactive tasks, sort by pillar
class countAllPillarEntries(Resource):
    @api.doc(description="Return number of people who have learning entries in each pillar")
    @api.response(200, "Successful")
    @api.response(404, "No learning plans found")
    def get(self):
        # get db = all entries
        plans = {
            'ok' : False,
            'entry_count': 0,
            'entries': list()
        }

        entry_count = 0
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        c.execute("SELECT Task.pillar, COUNT(LearningEntry.task) as num FROM Task LEFT OUTER JOIN LearningEntry ON Task.id = LearningEntry.task GROUP BY Task.pillar ORDER BY COUNT(LearningEntry.task) DESC;") #quotes is SQL command/query. question mark defines placeholder, second part - give tuple 
        results = c.fetchall() # actually gets result from query 
        # fetch all is a list of lists 

        if (results == []): # no result from database
            api.abort(404, "No learning plans found",ok=False)

        for entry in results:
            course = {
                'pillar': entry[0],
                'count_users': entry[1],
            }
            entry_count = entry_count + 1
            plans['entries'].append(course)

        plans['ok'] = True
        plans['entry_count'] = entry_count

        conn.close() # make sure to close database 
        return plans