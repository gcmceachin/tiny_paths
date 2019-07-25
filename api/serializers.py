from rest_framework import serializers
from tiny_path.models import Trail, Comment
from django.contrib.auth import get_user_model





User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

   class Meta:
       model = User
       fields = ('username', 'password')




class TrailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trail
        fields = ('id', 'trail_name', 'location','summary', 'latitude','longitude','length','difficulty','amenities', 'comments')
        depth = 1
       # added depth and comments to the meta so that trails and comments are linked


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        depth = 1

        # Comments is a one trail to many relatioship