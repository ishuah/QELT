from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

def index(request):
	if request.user.is_authenticated():
		return redirect('dashboard')
	return redirect('signin')

@login_required
def dashboard(request):
	return render(request, 'dashboard/dashboard.html')