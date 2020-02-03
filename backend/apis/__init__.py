from flask_restplus import Api

from .entry import api as ns1
from .plan import api as ns2
from .report import api as ns3
from .task import api as ns4
from .coach import api as ns5


api = Api(
        title="Learning Tracking System",
        version='1.0',
        description="API to serve learning-mgmt-system"
        )

api.add_namespace(ns1, path='/entry')
api.add_namespace(ns2, path='/plan')
api.add_namespace(ns3, path='/report')
api.add_namespace(ns4, path='/task')
api.add_namespace(ns5, path='/coach')
