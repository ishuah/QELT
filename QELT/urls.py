"""QELT URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'dashboard.views.index', name='index'),
    url(r'^dashboard/$', 'dashboard.views.dashboard', name='dashboard'),
    url(r'^dashboard/question$', 'dashboard.views.new_question', name='new_question'),
    url(r'^dashboard/question/(?P<questionId>[\d]{0,50})/$', 'dashboard.views.question', name='question'),
    url(r'^signin/$', 'django.contrib.auth.views.login', {'template_name': 'dashboard/signin.html'},  name='signin'),
    url(r'^signout/$', 'django.contrib.auth.views.logout', {'template_name': 'dashboard/signin.html'}, name='signout' ),
]
