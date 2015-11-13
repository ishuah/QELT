from tastypie.resources import ModelResource
from tastypie.constants import ALL, ALL_WITH_RELATIONS
from tastypie.authentication import SessionAuthentication, BasicAuthentication
from tastypie.authorization import DjangoAuthorization
from tastypie.http import HttpUnauthorized, HttpForbidden
from tastypie import fields
from tastypie.utils import trailing_slash
from django.contrib.auth.models import User
from django.conf.urls import url
from django.contrib.auth import authenticate, login, logout

from examiner.models import Question
from tastypie.resources import Resource
import json

class SignedInResource(Resource):
	class Meta:
		pass

	def get_list(self, request, **kwargs):
		from django.http import HttpResponse

		if request.user.is_authenticated():
			return HttpResponse(json.dumps({ "username": request.user.username}), status=200, content_type="application/json")
		else:
			return HttpResponse(status=401)


class UserResource(ModelResource):
	class Meta:
		queryset = User.objects.all()
		resource_name = 'user'
		fields = ['username']
		allowed_methods = ['post']

	def override_urls(self):
		return [
			url(r'^(?P<resource_name>%s)/signin%s$' % 
				(self._meta.resource_name, trailing_slash()),
				self.wrap_view('signin'), name="api_signin"),
			url(r'^(?P<resource_name>%s)/signout%s$' % 
				(self._meta.resource_name, trailing_slash()),
				self.wrap_view('signout'), name="api_signout"),
		]

	def signin(self, request, **kwargs):
		self.method_check(request, allowed=['post'])

		data = self.deserialize(request, request.body, format=request.META.get('CONTENT_TYPE', 'application/json'))

		username = data.get('username', '')
		password = data.get('password', '')

		user = authenticate(username=username, password=password)
		if user:
			if user.is_active:
				login(request, user)
				return self.create_response(request, {
					'success': True,
					'username': user.username
					})
			else:
				return self.create_response(request, {
					'success': False,
					'reason': 'Account is not activated'
					}, HttpForbidden)
		else:
			return self.create_response(request, {
				'success': False,
				'reason': 'Username and password do no match'
				}, HttpUnauthorized)

	def signout(self, request, **kwargs):
		self.method_check(request, allowed=['post'])
		if request.user and request.user.is_authenticated():
			logout(request)
			return self.create_response(request, { 'success': True})
		else:
			return self.create_response(request, { 'success': False }, HttpUnauthorized)

class QuestionResource(ModelResource):
	student = fields.ForeignKey('api.resources.UserResource', 'student')
	class Meta:
		queryset = Question.objects.all()
		resource_name = 'question'
		filtering = {
			"student": ALL_WITH_RELATIONS
		}
		authorization = DjangoAuthorization()
		authentication = SessionAuthentication();
		