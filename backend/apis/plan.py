from flask_restplus import Namespace, Resource, fields
from flask import request, jsonify
from datetime import date
import db

api = Namespace('plan', description='Learning Plan specific operations')


@api.route('/<string:user_id>')
@api.doc(params={'user_id': 'the email address associated with a user'}) #userID is email
class getLearningPlan(Resource):
    @api.doc(description="Return learning plan associated with the given user")
    @api.response(200, "Successful")
    @api.response(404, "No learning entries found")
    @api.response(404, "User not found")
    def get(self, user_id):
        learning_plan = { #dictionary
            'ok': False,
            'entry_count' : 0, #label : information
            'entries': list() 
        }
        entry_count = 0
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        c.execute("SELECT EXISTS(SELECT name FROM User WHERE email = ?)", (user_id,))  
        user_check = c.fetchone()[0]    # returns 1 if exists, otherwise 0

        if (user_check == 0):   # user doesn't exist
            api.abort(404, "User '{}' doesn't exist".format(user_id),ok=False)


        c.execute("SELECT e.id, e.user, e.start_date, e.end_date, c.name, c.pillar, e.task, e.completed FROM LearningEntry e, Task c WHERE e.task = c.id AND user = ? ORDER BY e.start_date, e.end_date", (user_id,)) #quotes is SQL command/query. question mark defines placeholder, second part - give tuple 
        results = c.fetchall() # actually gets result from query 
        # fetch all is a list of lists 
        conn.close() # make sure to close database 

        if (results == []): # no result from database
            api.abort(404, "No learning entries found for user: {}".format(user_id),ok=False)

        for entry in results:
            learning_entry = {
                'id': entry[0],
                'user': entry[1],
                'start_date': entry[2],
                'end_date': entry[3],
                'course': entry[4],
                'pillar': entry[5],
                'task_id': entry[6],
                'completed': entry[7]
            }
            entry_count = entry_count + 1
            learning_plan['entries'].append(learning_entry)

        learning_plan['ok'] = True
        learning_plan['entry_count'] = entry_count
        return learning_plan

@api.route('/all')
class getAllEntries(Resource):
    @api.doc(description="Return all learning plans for all users")
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
        c.execute("SELECT e.id, e.user, e.start_date, e.end_date, c.name, c.pillar, e.task FROM LearningEntry e INNER JOIN Task c ON e.task = c.id ORDER BY e.start_date") #quotes is SQL command/query. question mark defines placeholder, second part - give tuple 
        results = c.fetchall() # actually gets result from query 
        # fetch all is a list of lists 
        conn.close() # make sure to close database 

        if (results == []): # no result from database
            api.abort(404, "No learning plans found",ok=False)

        for entry in results:
            learning_entry = {
                'id': entry[0],
                'user': entry[1],
                'start_date': entry[2],
                'end_date': entry[3],
                'course': entry[4],
                'pillar': entry[5],
                'task_id': entry[6]
            }
            entry_count = entry_count + 1
            plans['entries'].append(learning_entry)

        plans['ok'] = True
        plans['entry_count'] = entry_count
        return plans

@api.route('/active/<string:user_id>')
@api.doc(params={'user_id': 'the email address associated with a user'})
class getActiveEntries(Resource):
    @api.doc(description="Retrieves entries currently in progress")
    @api.response(200, "Successful")
    @api.response(404, "User not found")

    def get(self, user_id):
        learning_plan = { #dictionary
            'ok' : False,
            'entry_count' : 0, #label : information
            'entries': list() 
        }
        today = str(date.today())
        entry_count = 0
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        
        c.execute("SELECT EXISTS(SELECT name FROM User WHERE email = ?)", (user_id,))  
        user_check = c.fetchone()[0]    # returns 1 if exists, otherwise 0

        if (user_check == 0):   # user doesn't exist
            api.abort(404, "User '{}' doesn't exist".format(user_id),ok=False)

        c.execute("SELECT e.id, e.user, e.start_date, e.end_date, c.name, c.pillar, e.task FROM LearningEntry e, Task c WHERE e.task = c.id AND user = ? AND (e.start_date < (SELECT strftime('%Y-%m-%d', 'now'))) AND e.completed = False ORDER BY e.start_date", (user_id,)) #quotes is SQL command/query. question mark defines placeholder, second part - give tuple 
        results = c.fetchall() # actually gets result from query 
        # fetch all is a list of lists 
        conn.close() # make sure to close database 
        for entry in results:
            learning_entry = {
                'id': entry[0],
                'user': entry[1],
                'start_date': entry[2],
                'end_date': entry[3],
                'course': entry[4],
                'pillar': entry[5],
                'task_id': entry[6]
            }
            entry_count = entry_count + 1
            learning_plan['entries'].append(learning_entry)
        learning_plan['ok'] = True
        learning_plan['entry_count'] = entry_count
        return learning_plan

@api.route('/overdue/<string:user_id>')
@api.doc(params={'user_id': 'the email address associated with a user'})
class getActiveEntries(Resource):
    @api.doc(description="Retrieves entries currently overdue")
    @api.response(200, "Successful")
    @api.response(404, "User not found")

    def get(self, user_id):
        learning_plan = { #dictionary
            'ok' : False,
            'entry_count' : 0, #label : information
            'entries': list() 
        }
        today = str(date.today())
        entry_count = 0
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        c.execute("SELECT EXISTS(SELECT name FROM User WHERE email = ?)", (user_id,))  
        user_check = c.fetchone()[0]    # returns 1 if exists, otherwise 0

        if (user_check == 0):   # user doesn't exist
            api.abort(404, "User '{}' doesn't exist".format(user_id),ok=False)

        c.execute("SELECT e.id, e.user, e.start_date, e.end_date, c.name, c.pillar, e.task FROM LearningEntry e, Task c WHERE e.task = c.id AND user = ? AND (e.end_date < (SELECT strftime('%Y-%m-%d', 'now'))) AND e.completed = False ORDER BY e.start_date;", (user_id,))
        results = c.fetchall() # actually gets result from query 
        # fetch all is a list of lists 
        conn.close() # make sure to close database 
        for entry in results:
            learning_entry = {
                'id': entry[0],
                'user': entry[1],
                'start_date': entry[2],
                'end_date': entry[3],
                'course': entry[4],
                'pillar': entry[5],
                'task_id': entry[6]
            }
            entry_count = entry_count + 1
            learning_plan['entries'].append(learning_entry)

        learning_plan['entry_count'] = entry_count
        learning_plan['ok'] = True
        return learning_plan