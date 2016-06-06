from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse

def demo(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('profilepage:profile'))
    else:
        return render(request, 'demo/index.html')
# Create your views here.
