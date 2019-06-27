from django.shortcuts import render

# Create your views here.

from home.models import CustomText, HomePage


def home(request):
    print(request.GET)
    return render(request, 'home/index.html')

# https://www.reddit.com/api/v1/authorize?client_id=xMReNoE2VWlRsA&response_type=code&redirect_uri=http://127.0.0.1:8000&duration=permanent&scope=identity&state=asdfasdf