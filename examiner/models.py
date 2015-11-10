from django.db import models
from django.contrib.auth.models import User
import random, json
from lib import get_root, get_coefficients



class Question(models.Model):
	student = models.ForeignKey(User)
	student_answer = models.CharField(max_length=100, blank=True, null=True)

	x = models.CharField(max_length=100)
	coefficients = models.CharField(max_length=100)
	
	def __unicode__(self):
		return self.student.username

	class Meta:
		app_label = 'examiner'

	def save(self, *args, **kwargs):
		if not self.x:
			self.x = get_root(bool(random.getrandbits(1))) if bool(random.getrandbits(1)) else "[]"
			self.coefficients = get_coefficients(self.x)
		super(Question, self).save(*args, **kwargs)

	def get_absolute_url(self):
		from django.core.urlresolvers import reverse
		return reverse('dashboard.views.question', args=[str(self.id)])

	def is_correct(self):
		if self.student_answer:
			correct_answer = json.loads(self.x)
			student_answer = json.loads(self.student_answer)
			for i in student_answer:
				if i not in correct_answer:
					return False
				return True
		return False

