from flask_restplus import Namespace, Resource, fields
from flask import request, jsonify
import db

api = Namespace('entry', description='Entry specific operations')

entry_data = api.model('entry',{
    'task' : fields.String(description = 'Task individual intends to complete i.e. certification, course, exam'),
    'start_date' : fields.DateTime(description = 'Date individual intends to start the task'),
    'end_date' : fields.DateTime(description = 'Date individual intends to have completed the task'),
})


@api.route('/<string:user_id>') #2 functions - add and delete
@api.doc(params={'user_id': 'the email address associated with a user'})
class entryFunctions(Resource):
    @api.doc(description="TODO Deletes specified entry")
    @api.response(200, "Successful")     
    def delete(self, user_id): # TO DO
        return user_id
    
    @api.doc(description="TODO Adds new entry")
    @api.doc(params={'user_id': 'the email address associated with a user'})
    #@api.response(201, "Created successfully") #Ideally but in most cases 200
    @api.expect(entry_data)
    def post(self,user_id): # TO DO
        req = request.get_json(force=True)
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        c.execute('INSERT INTO LearningEntry values(?,?,?,?,?)',(generate_ID(), user_id, req['task'],req['start_date'],req['end_date']),)
        conn.commit()
        conn.close()
        return 'Entry saved'

def generate_ID():
    conn = db.get_conn() 
    c = conn.cursor() #cursor to execute commands
    c.execute('SELECT COUNT(*) FROM LearningEntry')
    sum = c.fetchone()[0]
    print(sum)
    return sum+1