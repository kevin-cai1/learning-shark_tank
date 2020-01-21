from flask import Flask, request
from flask_restplus import Resource, Api

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

if __name__ == "__main__":
    app.run(debug=True)