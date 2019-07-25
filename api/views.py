from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from tiny_path.models import Trail, Comment
from .serializers import TrailSerializer, CommentSerializer

from rest_framework.response import Response

import requests

from conf.settings import HIKING_PROJECT_API_KEY

# class UserApiView(ModelViewSet):
        # permissions = [IsAuthenticated]
        #
        # def get_permissions(self):
        #     if self.action == 'list' or self.action == 'create':
        #         return [permissions.IsAuthenticated(), ]
        #     if self.action == 'retrieve':
        #         return [permissions.IsAuthenticated(), ]
        #     if self.action in ('update', 'partial_update', 'destroy'):
        #         return [permissions.IsAuthenticated(), ]
        #     return [permissions.IsAuthenticated(), ]


class TrailViewSet(ModelViewSet):
    queryset = Trail.objects.all()
    serializer_class = TrailSerializer


    class Meta:
            fields = ('id','trail_name', 'location','summary', 'latitude','longitude', 'length', 'difficulty', 'amenities')



class CommentListViewSet(ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.filter(trail__trail_name='')

    def perform_create(self, serializer):
        # import pdb
        # pdb.set_trace()
        trail = Trail.objects.get(id=self.request.data['trail'])
        serializer.save(user=self.request.user, trail=trail)

    def list(self, request, patient=None):
        comments = Comment.objects.filter(trail__trail_name=self.request.query_params.get('name'))
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)



class APIListView(ListAPIView):

    def list(self, request, *args, **kwargs):

        lat = self.request.query_params.get('lat')
        lon = self.request.query_params.get('lon')

        r = requests.get(
        f'https://www.hikingproject.com/data/get-trails?lat={lat}&lon={lon}&maxDistance=25&maxResults=500&key={HIKING_PROJECT_API_KEY}')
        return Response(r.json())


# https://www.programcreek.com/python/example/91021/rest_framework.permissions.IsAuthenticated








