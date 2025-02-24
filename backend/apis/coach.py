from flask_restplus import Namespace, Resource, fields
from flask import request, jsonify
import db

api = Namespace('coach', description='Coach specific API calls')

@api.route('/plans/<string:coach_id>')
@api.doc(params={'coach_id': 'the email address associated with a coach'})
class viewCoacheePlans(Resource):
    @api.doc(description="Return learning plans of users under a given coach")
    @api.response(200, "Success")
    @api.response(404, "No learning plans found")
    def get(self, coach_id):
        # get db = all entries
        user_plans = {
            'ok' : False,
            'user_count': 0,
            'users': list()
        }

        entry_count = 0
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        c.execute("SELECT email, name from User WHERE coach = ?", (coach_id,))
        results = c.fetchall() # actually gets result from query 

        if (results == []): # no result from database
            api.abort(404, "No learning plans found",ok=False)
        users = [r[0] for r in results]
        names = [r[1] for r in results]
        for i in range(len(results)):   # for every user associated with coach_id
            c.execute("SELECT e.id, e.user, e.task, e.start_date, e.end_date, e.completed, t.pillar, t.name FROM LearningEntry e, Task t WHERE e.task = t.id AND user = ? ORDER BY e.start_date", (users[i],))
            results = c.fetchall()
            user = {
                'id': users[i],
                'name': names[i],
                'entry_count': 0,
                'entries': list()
            }
            for entry in results:
                learning_entry = {
                    'id': entry[0],
                    'user': entry[1],
                    'start_date': entry[3],
                    'end_date': entry[4],
                    'pillar': entry[6],
                    'task_id': entry[2],
                    'task_name': entry[7],
                    'completed': entry[5]
                }
                user['entries'].append(learning_entry)
                user['entry_count'] = user['entry_count'] + 1
            user_plans['users'].append(user)
            user_plans['user_count'] = user_plans['user_count'] + 1
            user_plans['ok'] = True

        conn.close() # make sure to close database 
        return user_plans