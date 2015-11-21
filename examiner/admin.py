from django.contrib import admin
from models import Question
from django.contrib.auth.models import User

class StudentListFilter(admin.SimpleListFilter):
	title = 'students'
	parameter_name = 'student'

	def lookups(self, request, model_admin):
		list_tuple = []
		for user in User.objects.filter(is_staff=False):
			list_tuple.append((user.id, user.username))
		return list_tuple

	def queryset(self, request, queryset):
		if self.value():
			return queryset.filter(student__id=self.value())
		return queryset

class QuestionAdmin(admin.ModelAdmin):
	list_filter = (StudentListFilter,)
	list_display = ('student', 'question', 'student_answer', 'x', 'correct')

	def question(self, object):
		return object.to_string()
	question.allow_tags = True

	def correct(self, object):
		if object.is_correct():
			return 'Yes'
		return 'No'

admin.site.register(Question, QuestionAdmin)

