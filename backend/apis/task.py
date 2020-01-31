from flask_restplus import Namespace, Resource, fields
from flask import request, jsonify
import db
import re

api = Namespace('task', description='Manage tasks (courses and certs)')

task_data = api.model('task',{
    'name' : fields.String(description = 'Name of task to add in String format.'),
    'isCertificate' : fields.Boolean(description = '1 = task is certificate, 0 = task is course'),
    'pillar' : fields.String(description = 'Pillar the task belongs to.'),
    'specialisation' : fields.String(description = 'Specialisation stream the task is related to. Can be NULL.'),
})

@api.route('/all') # for each task, count number of users with active/inactive tasks on their learning plan 
class getTaskCollection(Resource):
    @api.doc(description="Return list of tasks")
    @api.response(200, "Successful")
    @api.response(404, "No tasks found")
    def get(self):
        tasks = {
            'ok' : False,
            'entry_count': 0,
            'entries': list()
        }
        entry_count = 0
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        c.execute("SELECT * FROM Task;") #quotes is SQL command/query. question mark defines placeholder, second part - give tuple 
        results = c.fetchall() # actually gets result from query 
        # fetch all is a list of lists 

        if (results == []): # no result from database
            api.abort(404, "No tasks found",ok=False)

        for entry in results:
            task = {
                'id': entry[0],
                'name': entry[1],
                'isCertificate': entry[2],
                'pillar': entry[3],
                'specialisation': entry[4]
            }
            entry_count = entry_count + 1
            tasks['entries'].append(task)

        tasks['ok'] = True
        tasks['entry_count'] = entry_count

        conn.close() # make sure to close database 
        return tasks

@api.route('/add') #2 functions - add and delete
class addTask(Resource):
    @api.doc(description="Adds new task")
    @api.expect(task_data)
    def post(self): 
        req = request.get_json(force=True)
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        new_id = generate_ID()
        c.execute('INSERT INTO Task values(?,?,?,?,?)',(new_id, req['name'],req['isCertificate'],req['pillar'],req['specialisation'],),)
        conn.commit()
        conn.close()

        entry = {
            'id': new_id,
            'name': req['name'],
            'isCertificate': req['isCertificate'],
            'pillar': req['pillar'],
            'specialisation': req['specialisation']
        }

        return_val = {
            'ok': True,
            'entry': entry
        }
        return return_val



@api.route('/<int:task_id>')
@api.doc(params={'task_id': 'the task entry id associated with the task'})
class deleteTask(Resource):
    @api.doc(description="Deletes specified task")
    @api.response(200, "Successful")     
    @api.response(404, "Entry not found")
    def delete(self, task_id):
        conn = db.get_conn()
        c = conn.cursor()

        c.execute("SELECT EXISTS(SELECT id FROM Task WHERE id = ?)", (task_id,))  
        entry_check = c.fetchone()[0]    # returns 1 if exists, otherwise 0

        if (entry_check == 0):   # entry doesn't exist
            api.abort(404, "Task '{}' doesn't exist".format(task_id),ok=False)
        c.execute("DELETE FROM Task WHERE id = ?;", (task_id,))

        conn.commit()
        conn.close()
        return_val = {
            'ok' : True
        }
        return return_val

    @api.expect(task_data)
    @api.response(404, "Task not found")
    def put(self, task_id):
        # take in a payload,
        req = request.get_json(force=True)
        conn = db.get_conn()
        c = conn.cursor()    

        c.execute("SELECT EXISTS(SELECT id FROM Task WHERE id = ?)", (task_id,))  
        task_check = c.fetchone()[0]    # returns 1 if exists, otherwise 0

        if (task_check == 0):   # entry doesn't exist
            api.abort(404, "Task '{}' doesn't exist".format(task_id),ok=False)

        if (not isinstance(req['isCertificate'], bool)):            # check that given value is a boolean
            api.abort(400, "'isCertificate' is not a boolean",ok=False)     

        if ('name' in req):
            sql = '''UPDATE Task
                    SET name = ?
                    WHERE id = ?'''
            c.execute(sql, (req['name'],task_id))

        if ('isCertificate' in req):
            sql = '''UPDATE Task
                    SET isCertificate = ?
                    WHERE id = ?'''
            c.execute(sql, (req['isCertificate'],task_id))
            
        if ('pillar' in req):
            sql = '''UPDATE Task
                    SET pillar = ?
                    WHERE id = ?'''
            c.execute(sql, (req['pillar'],task_id))

        if ('specialisation' in req):
            sql = '''UPDATE Task
                    SET specialisation = ?
                    WHERE id = ?'''
            c.execute(sql, (req['specialisation'],task_id))

        # set properties for the entry specified 
        conn.commit()

        c.execute("SELECT * FROM Task c WHERE c.id = ?", (task_id,)) #quotes is SQL command/query. question mark defines placeholder, second part - give tuple 
        results = c.fetchall()[0] # actually gets result from query 
        learning_entry = {
            'id': task_id,
            'name': req['name'],
            'isCertificate': req['isCertificate'],
            'pillar': req['pillar'],
            'specialisation': req['specialisation']
        }
        return_val = {
            'ok' : True, 
            'entry': learning_entry 
        }
        conn.close()        
        
        return return_val



def generate_ID():
    conn = db.get_conn() 
    c = conn.cursor() #cursor to execute commands
    c.execute('SELECT MAX(id) FROM Task')
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