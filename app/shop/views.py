from .serializers import *
from .models import *
from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny,
    IsAuthenticatedOrReadOnly,
)
from rest_framework import viewsets, views, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import MultiPartParser
from .permissions import IsOwnerOrReadOnly
from django.shortcuts import get_object_or_404
from .pagination import ProductsSetPagination
from .filters import ProductFilter
import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY


class UserViewSet(viewsets.GenericViewSet, generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "current_user":
            return [IsAuthenticated()]

        return [AllowAny()]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(
        detail=False,
        methods=["get"],
        url_path="current-user",
    )
    def current_user(self, request):
        return Response(
            self.serializer_class(request.user).data, status=status.HTTP_200_OK
        )


class CategoryViewSet(viewsets.GenericViewSet, generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True).all()
    serializer_class = CategorySerializer
    pagination_class = None
    lookup_field = "slug"


class ProductViewSet(
    viewsets.GenericViewSet, generics.ListAPIView, generics.RetrieveAPIView
):
    queryset = Product.objects.filter(is_active=True).all()
    serializer_class = ProductSerializer
    lookup_field = "slug"
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    filterset_class = ProductFilter 
    search_fields = ["title"]
    ordering_fields = ["title", "price"]
    pagination_class = ProductsSetPagination

    def get_permissions(self):
        if self.action == "comments":
            return [IsAuthenticatedOrReadOnly()]
        return [AllowAny()]

    @action(
        detail=True,
        methods=["get", "post"],
        serializer_class=CommentSerializer,
        url_path="comments",
    )
    def comments(self, request, slug=None):
        if self.request.method == "POST":
            product = self.get_object()
            content = request.data["content"]
            user = self.request.user
            comment = Comment.objects.create(
                content=content, user=user, product=product
            )
            comment.save()
            serializer = CommentSerializer(comment)
            return Response(serializer.data, status=status.HTTP_200_OK)

        if self.request.method == "GET":
            product = self.get_object()
            comments = Comment.objects.filter(product=product).all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class CommentViewSet(viewsets.GenericViewSet, generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get(self, request):
        user = request.user
        orders = Order.objects.filter(user=user).all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        data = request.data

        order_items = data["order_items"]

        if order_items and len(order_items) == 0:
            return Response(
                {"detail": "No Order Items", "status": status.HTTP_400_BAD_REQUEST}
            )
        else:
            order = Order.objects.create(user=user)
            shipping = ShippingAddress.objects.create(
                order=order,
                address=data["shipping_address"]["address"],
                city=data["shipping_address"]["city"],
                country=data["shipping_address"]["country"],
            )

            for i in order_items:
                product = Product.objects.get(id=i["product"])

                item = OrderItem.objects.create(
                    product=product,
                    order=order,
                    quantity=i["quantity"],
                )

                product.save()

            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
