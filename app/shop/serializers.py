from .models import *
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "is_active",
            "first_name",
            "last_name",
            "avatar",
            "sex",
            "last_login",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }
        read_only_fields = ["url", "last_login", "is_active", "id"]

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SizeVariant
        fields = ("id", "value")


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorVariant
        fields = ("id", "value")


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "name", "slug")


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, many=False)

    class Meta:
        model = Comment
        fields = ["id", "user", "content", "date_created"]
        read_only_fields = [
            "date_created",
        ]
        depth = 1

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.content = validated_data.get("content", instance.content)
        instance.save()
        return instance


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    color_variant = ColorSerializer(many=True)
    size_variant = SizeSerializer(many=True)
    tags = TagSerializer(many=True)
    new_price = serializers.FloatField(max_value=None, min_value=None)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "slug",
            "image",
            "is_active",
            "description",
            "discount",
            "price",
            "new_price",
            "amount",
            "category",
            "color_variant",
            "size_variant",
            "tags",
            "comments",
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ["id", "product", "order", "quantity"]


class OrderSerializer(serializers.ModelSerializer):
    shipping_address = serializers.SerializerMethodField(read_only=True)
    orderItems = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_shipping_address(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shipping_address, many=False).data
        except:
            address = False
        return address

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
