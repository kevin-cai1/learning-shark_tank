from flask import Flask, request, jsonify
from flask_restplus import Resource, Api
import db

app = Flask(__name__)
api = Api(
        app,
        default="Learning Tracking",
        title="Learning Tracking System",
        description="API to serve learning-mgmt-system"
        )

@api.route('/test/<int:number>')
@api.doc(params={'number': 'test number'})
class testEndpoint(Resource):
    @api.doc(description="Test endpoint to serve as example")
    @api.response(200, "Successful")
    def get(self, number):
        return number

@api.route('/learning/plan/<string:user_id>')
@api.doc(params={'user_id': 'the email address associated with a user'})
class getLearningPlan(Resource):
    @api.doc(description="Return learning plan associated with the given user")
    @api.response(200, "Successful")
    @api.response(404, "User not found")
    def get(self, user_id):
        learning_plan = {
            'entry_count' : 0,
            'entries': list()
        }
        entry_count = 0
        conn = db.get_conn()
        c = conn.cursor()
        c.execute("SELECT e.id, e.user, e.start_date, e.end_date, e.course, c.pillar FROM LearningEntry e, Course c WHERE e.course = c.name AND user = ?", (user_id,))
        results = c.fetchall()

        conn.close()
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

if __name__ == "__main__":
    app.run(debug=True)