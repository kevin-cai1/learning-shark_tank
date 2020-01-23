from flask import Flask, request, jsonify
from flask_restplus import Resource, Api, fields
import db
from datetime import date

app = Flask(__name__)
api = Api(
        app,
        default="Learning Tracking",
        title="Learning Tracking System",
        description="API to serve learning-mgmt-system"
        )
today = date.today().strftime('%d-%m-%Y')

entry_data = api.model('entry',{
    'task' : fields.String(description = 'Task individual intends to complete i.e. certification, course, exam'),
    'start_date' : fields.DateTime(description = 'Date individual intends to start the task'),
    'end_date' : fields.DateTime(description = 'Date individual intends to have completed the task'),
})

@api.route('/test/<int:number>')
@api.doc(params={'number': 'test number'})
class testEndpoint(Resource):
    @api.doc(description="Test endpoint to serve as example")
    @api.response(200, "Successful")
    def get(self, number):
        return number

@api.route('/plan/<string:user_id>')
@api.doc(params={'user_id': 'the email address associated with a user'}) #userID is email
class getLearningPlan(Resource):
    @api.doc(description="Return learning plan associated with the given user")
    @api.response(200, "Successful")
    @api.response(404, "User not found")
    def get(self, user_id):
        learning_plan = { #dictionary
            'entry_count' : 0, #label : information
            'entries': list() 
        }
        entry_count = 0
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        c.execute("SELECT e.id, e.user, e.start_date, e.end_date, e.course, c.pillar FROM LearningEntry e, Course c WHERE e.course = c.name AND user = ?", (user_id,)) #quotes is SQL command/query. question mark defines placeholder, second part - give tuple 
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
                'pillar': entry[5]
            }
            entry_count = entry_count + 1
            learning_plan['entries'].append(learning_entry)

        learning_plan['entry_count'] = entry_count
        return learning_plan

@api.route('/plan/active/<string:user_id>')
@api.doc(params={'user_id': 'the email address associated with a user'})
class getActiveEntries(Resource):
    @api.doc(description="TODO Retrieves entries currently in progress")
    @api.response(200, "Successful")
    def get(self, number):
        learning_plan = { #dictionary
            'entry_count' : 0, #label : information
            'entries': list() 
        }
        today = str(date.today())
        entry_count = 0
        conn = db.get_conn() 
        c = conn.cursor() #cursor to execute commands
        c.execute("SELECT e.id, e.user, e.start_date, e.end_date, e.course, c.pillar FROM LearningEntry e, Course c WHERE e.course = c.name AND user = ?", (user_id,)) #quotes is SQL command/query. question mark defines placeholder, second part - give tuple 
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
                'pillar': entry[5]
            }
            # TODO: Add logic of whether today is between start_date and end_date
            entry_count = entry_count + 1
            learning_plan['entries'].append(learning_entry)

        learning_plan['entry_count'] = entry_count
        return learning_plan

@api.route('/entry/<string:user_id>') #2 functions - add and delete
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

if __name__ == "__main__":
    app.run(debug=True)
