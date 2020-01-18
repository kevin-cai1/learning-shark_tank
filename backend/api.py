from flask import Flask, request
from flask_restplus import Resource, Api

app = Flask(__name__)
api = Api(
        app,
        default="Learning Tracking",
        title="Learning Tracking System",
        description="API to serve learning-mgmt-system"
        )


if __name__ == "__main__":
    app.run(debug=True)