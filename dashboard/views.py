from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from examiner.models import Question
import json

def index(request):
	if request.user.is_authenticated():
		return redirect('dashboard')
	return redirect('signin')

@login_required
def dashboard(request):
	if request.user.is_staff:
		return redirect('/admin/')
	count = Question.objects.filter(student=request.user).count()
	return render(request, 'dashboard/dashboard.html', { 'count': count })

@login_required
def new_question(request):
	if request.user.is_staff:
		return redirect('admin/')
	question, created = Question.objects.get_or_create(student=request.user, student_answer=None)
	return redirect(question.get_absolute_url())
	

@login_required
def question(request, questionId):
	question = get_object_or_404(Question, pk=questionId, student=request.user)
	coefficients = json.loads(question.coefficients)
	if request.method == 'POST':
		answer = request.POST.get('answer')
		if answer == '':
			question.student_answer = '[]'
			question.save()
		else:
			answer = [ int(i) for i in answer.split(',')]
			question.student_answer = json.dumps(answer)
			question.save()
	if question.student_answer:
		return render(request, 'dashboard/answered_question.html', { 'question': question,  'a':coefficients[0], 'b':coefficients[1], 'c':coefficients[2] })
	return render(request, 'dashboard/question.html', { 'a':coefficients[0], 'b':coefficients[1], 'c':coefficients[2] })