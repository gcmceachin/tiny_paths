from django_filters import rest_framework as filters
from .models import Trail
from rest_framework import generics




class TrailFilter(filters.FilterSet):

   class Meta:
       model = Trail
       fields = ["park_name", "trail_name"]