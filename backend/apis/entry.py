from flask_restplus import Namespace, Resource, fields
from flask import request, jsonify
import db
import re

api = Namespace('entry', description='Entry specific operations')

entry_data = api.model('entry',{
    'task' : fields.String(description = 'Task individual intends to complete i.e. certification, course, exam'),
    'start_date' : fields.DateTime(description = 'Date individual intends to start the task'),
    'end_date' : fields.DateTime(description = 'Date individual intends to have completed the task'),
})

task_complete = api.model('task_complete',{
    'task' : fields.String(description = 'Task to be marked as complete')
})

@api.route('/<string:user_id>') #2 functions - add and delete
@api.doc(params={'user_id': 'the email address associated with a user'})
class entryFunctions(Resource):
    @api.doc(description="TODO Deletes specified entry")
    @api.response(200, "Successful")     
    @api.response(404, "User not found")
    def delete(self, user_id): # TO DO
        return user_id
    
    @api.doc(description="Adds new entry")
    @api.doc(params={'user_id': 'the email address associated with a user'})
    #@api.response(201, "Created successfully") #Ideally but in most cases 200
    @api.expect(entry_data)
    def post(self,user_id): 
        req = request.get_json(force=True)
        if(not(checkFormat(req['start_date'])) or not(checkFormat(req['end_date']))):
            api.abort(400,"Incorrect date format")
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        c.execute('INSERT INTO LearningEntry values(?,?,?,?,?,"False")',(generate_ID(), user_id, req['task'],req['start_date'],req['end_date'],),)
        conn.commit()
        conn.close()
        return 'Entry saved'

@api.route('/status/<string:user_id>')
@api.doc(params={"user_id":'the email address associated with a user'})
@api.expect(task_complete)
class markEntryAsComplete(Resource):
    def put(self,user_id):
        req = request.get_json(force=True)
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        # check if user has task existing before marking as complete
        c.execute("SELECT EXISTS(SELECT user FROM LearningEntry where user = ? and task = ?)", (user_id,req['task'],))  
        user_check = c.fetchone()[0]
        if (user_check == 0):   # user doesn't exist
            api.abort(404, "User '{}' doesn't have task '{}'".format(user_id,req['task']))

        c.execute('update LearningEntry set completed = "True" where task = ? and user = ?',(req['task'],user_id),)
        conn.commit()
        conn.close()
        return req['task'] + " marked as completed"

def generate_ID():
    conn = db.get_conn() 
    c = conn.cursor() #cursor to execute commands
    c.execute('SELECT COUNT(*) FROM LearningEntry')
    sum = c.fetchone()[0]
    return sum+1

def formatDate(dattime):
    date = datetime.strptime(dattime, '%Y-%m-%d')
    return date

def checkFormat(date):
    val = re.match("^\d{4}-\d{2}-\d{2}$",date)
    print(val)
    if (val != None):
        return True
    else:
        return False