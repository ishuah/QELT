from django.conf.urls import *
from tastypie.api import Api
from api.resources import UserResource, QuestionResource, SignedInResource

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(QuestionResource())
v1_api.register(SignedInResource())

urlpatterns = patterns('',
    (r'', include(v1_api.urls)),
)