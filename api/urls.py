from django.urls import path
# # from django.conf.urls import url
# from django import views
# from .views import trail_list


from .views import TrailViewSet, CommentListViewSet, APIListView

urlpatterns =[
    # path('', ChoiceViewSet.as_view({'get': 'list', 'post': 'create'})),
    # path('<int:pk>', ChoiceViewSet.as_view({'destroy':'delete','put':'update'})),
    path('trails/', TrailViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('trails/<int:pk>/', TrailViewSet.as_view({'delete': 'destroy', 'put': 'update', 'get': 'retrieve'})),
    path('comments/', CommentListViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('comments/<int:pk>/', CommentListViewSet.as_view({'delete': 'destroy','put': 'update','get': 'retrieve'})),
    path('hiker_api/', APIListView.as_view(), name='api view'),

]

