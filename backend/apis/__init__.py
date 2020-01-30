from flask_restplus import Api

from .entry import api as ns1
from .plan import api as ns2
from .report import api as ns3


api = Api(
        title="Learning Tracking System",
        version='1.0',
        description="API to serve learning-mgmt-system"
        )

api.add_namespace(ns1, path='/entry')
api.add_namespace(ns2, path='/plan')
api.add_namespace(ns3, path='/report')

