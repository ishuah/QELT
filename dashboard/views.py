from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from examiner.models import Question
import json

def index(request):
	return render(request, 'dashboard/base.html')