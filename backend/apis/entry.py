from flask_restplus import Namespace, Resource, fields
from flask import request, jsonify
import db
import re

api = Namespace('entry', description='Entry specific operations')

entry_data = api.model('entry',{
    'task' : fields.Integer(description = 'Task individual intends to complete i.e. certification, course, exam'),
    'start_date' : fields.DateTime(description = 'Date individual intends to start the task'),
    'end_date' : fields.DateTime(description = 'Date individual intends to have completed the task'),
})

update_payload = api.model('update', {
    'start_date' : fields.DateTime(description = 'New start date'),
    'end_date' : fields.DateTime(description = 'New end date'),
    'completed' : fields.Boolean(description = 'True/False for if the current learning entry has been completed')
})

@api.route('/add/<string:user_id>') #2 functions - add and delete
@api.doc(params={'user_id': 'the email address associated with a user'})
class entryFunctions(Resource):
    @api.doc(description="Adds new entry")
    @api.doc(params={'user_id': 'the email address associated with a user'})
    #@api.response(201, "Created successfully") #Ideally but in most cases 200
    @api.expect(entry_data)
    def post(self,user_id): 
        req = request.get_json(force=True)
        if (not(checkFormat(req['start_date'])) or not(checkFormat(req['end_date']))):
            api.abort(400,"Incorrect date format",ok=False)
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        new_id = generate_ID()
        c.execute('INSERT INTO LearningEntry values(?,?,?,?,?,0)',(new_id, user_id, req['task'],req['start_date'],req['end_date'],),)
        conn.commit()
        conn.close()

        entry = {
            'id': new_id,
            'user': user_id,
            'start_date': req['start_date'],
            'end_date': req['end_date'],
            'task': req['task'],
            'completed': False
        }

        return_val = {
            'ok': True,
            'entry': entry
        }
        return return_val

@api.route('/<int:entry_id>')
@api.doc(params={'entry_id': 'the learning entry id associated with the current entry'})
class updateEntry(Resource):
    @api.doc(description="Deletes specified entry")
    @api.response(200, "Successful")     
    @api.response(404, "Entry not found")
    def delete(self, entry_id):
        conn = db.get_conn()
        c = conn.cursor()

        c.execute("SELECT EXISTS(SELECT id FROM LearningEntry WHERE id = ?)", (entry_id,))  
        entry_check = c.fetchone()[0]    # returns 1 if exists, otherwise 0

        if (entry_check == 0):   # entry doesn't exist
            api.abort(404, "Entry '{}' doesn't exist".format(entry_id),ok=False)

        c.execute("DELETE FROM LearningEntry WHERE id = ?", (entry_id,))

        conn.commit
        conn.close()
        return_val = {
            'ok' : True
        }
        return return_val

    @api.expect(update_payload)
    @api.response(404, "Entry not found")
    def put(self, entry_id):
        # take in a payload,
        req = request.get_json(force=True)
        conn = db.get_conn()
        c = conn.cursor()    

        c.execute("SELECT EXISTS(SELECT id FROM LearningEntry WHERE id = ?)", (entry_id,))  
        entry_check = c.fetchone()[0]    # returns 1 if exists, otherwise 0

        if (entry_check == 0):   # entry doesn't exist
            api.abort(404, "Entry '{}' doesn't exist".format(entry_id),ok=False)

        if (not isinstance(req['completed'], bool)):            # check that given value is a boolean
            api.abort(400, "'completed' is not a boolean",ok=False)

        if (not(checkFormat(req['start_date'])) or not(checkFormat(req['end_date']))):
            api.abort(400,"Incorrect date format",ok=False)       

        if ('start_date' in req):
            sql = '''UPDATE LearningEntry
                    SET start_date = ?
                    WHERE id = ?'''
            c.execute(sql, (req['start_date'],entry_id))

        if ('end_date' in req):
            sql = '''UPDATE LearningEntry
                    SET end_date = ?
                    WHERE id = ?'''
            c.execute(sql, (req['end_date'],entry_id))
            
        if ('completed' in req):
            sql = '''UPDATE LearningEntry
                    SET completed = ?
                    WHERE id = ?'''
            c.execute(sql, (req['completed'],entry_id))

        # set properties for the entry specified 
        conn.commit()

        c.execute("SELECT e.id, e.user, e.start_date, e.end_date, c.name, e.completed FROM LearningEntry e, Task c WHERE e.id = ? AND e.task=c.id", (entry_id,)) #quotes is SQL command/query. question mark defines placeholder, second part - give tuple 
        results = c.fetchall()[0] # actually gets result from query 
        learning_entry = {
                'id': results[0],
                'user': results[1],
                'start_date': results[2],
                'end_date': results[3],
                'task': results[4],
                'completed': True if results[5] == 1 else False
            }
        return_val = {
            'ok' : True, 
            'entry': learning_entry 
        }
        conn.close()        
        
        return return_val


#@api.route('/status/<string:user_id>')
#@api.doc(params={"user_id":'the email address associated with a user'})
#@api.expect(task_complete)
#class markEntryAsComplete(Resource):
#    def put(self,user_id):
#        req = request.get_json(force=True)
#        conn = db.get_conn() 
#        c = conn.cursor() #cursor to execute commands
#        # check if user has task existing before marking as complete
#        c.execute("SELECT EXISTS(SELECT user FROM LearningEntry where user = ? and task = ?)", (user_id,req['task'],))  
#        user_check = c.fetchone()[0]
#        if (user_check == 0):   # user doesn't exist
#            api.abort(404, "User '{}' doesn't have task '{}'".format(user_id,req['task']))

#        c.execute('update LearningEntry set completed = "True" where task = ? and user = ?',(req['task'],user_id),)
#        conn.commit()
#        conn.close()
#        return req['task'] + " marked as completed"

def generate_ID():
    conn = db.get_conn() 
    c = conn.cursor() #cursor to execute commands
    c.execute('SELECT MAX(id) FROM LearningEntry')
    val = c.fetchone()[0]
    return val+1

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

def convertBool(val):
    if (val == True):
        return 1
    else:
        return 0