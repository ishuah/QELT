from django.db import models
from django.contrib.auth.models import User
from django.utils.safestring import mark_safe
import random
import json
from lib import get_root, get_coefficients


class Question(models.Model):
    student = models.ForeignKey(User)
    student_answer = models.CharField(max_length=100, blank=True, null=True)

    x = models.CharField(max_length=100)
    coefficients = models.CharField(max_length=100)

    def __unicode__(self):
        return self.to_string()

    class Meta:
        app_label = 'examiner'

    def save(self, *args, **kwargs):
        if not self.x:
            self.x = get_root(bool(random.getrandbits(1))) if bool(
                random.getrandbits(2)) else "[]"
            self.coefficients = get_coefficients(self.x)
        super(Question, self).save(*args, **kwargs)

    def get_absolute_url(self):
        from django.core.urlresolvers import reverse
        return reverse('dashboard.views.question', args=[str(self.id)])

    def is_correct(self):
        if self.student_answer:
            correct_answer = json.loads(self.x)
            student_answer = json.loads(self.student_answer)
            if len(correct_answer) != len(student_answer):
            	return False
            for i in student_answer:
                if i not in correct_answer:
                    return False
            return True
        return False

    def to_string(self):
        coefficients = json.loads(self.coefficients)
        return str(coefficients[0])+'<sup>2</sup> + ' + str(coefficients[1]) + 'x + ' + str(coefficients[2]) + ' = 0'
