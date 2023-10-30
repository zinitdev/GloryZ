from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shop.views import (
    UserViewSet,
    CategoryViewSet,
    ProductViewSet,
    CommentViewSet,
    OrderViewSet,
)

router = DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"products", ProductViewSet, basename="products")
router.register(r"users", UserViewSet, basename="users")
router.register(r"comments", CommentViewSet, basename="comments")
router.register(r"orders", OrderViewSet, basename="orders")

urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls")),
]
