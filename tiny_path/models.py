from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()



class Trail(models.Model):
    trail_name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    summary = models.CharField(max_length=255)
    reference_id = models.IntegerField(null=True)
    park_name = models.CharField(max_length=255, null=True)
    length = models.DecimalField(max_digits=3, decimal_places=1, null=True)
    difficulty = models.TextField(null=True)
    amenities = models.CharField(max_length=300, null = True)
    latitude = models.DecimalField(max_digits=20, decimal_places=6, null=True)
    longitude = models.DecimalField(max_digits=20, decimal_places=6, null=True)

    def __str__(self):
        return self.trail_name


class Googlemap(models.Model):

   latitude = models.DecimalField(
       max_digits=9, decimal_places=6, null=True, blank=True)

   longitude = models.DecimalField(
       max_digits=9, decimal_places=6, null=True, blank=True)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='user_comments')
    trail = models.ForeignKey(Trail, on_delete=models.CASCADE, null=True, related_name='comments')
    text = models.CharField(max_length=255, null=True)
    # adding comment model so that hikers can create, share, and read comments

    # added the related name field so that the trail and comments would be linked together

