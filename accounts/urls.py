from django.urls import path



from .views import UserListCreateAPIView, UserRUDAPIView

urlpatterns =[

    path('user/', UserListCreateAPIView.as_view()),
    path('user/<int:pk>/',UserRUDAPIView.as_view()),
]