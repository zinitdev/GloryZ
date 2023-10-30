from django.db import models
from django.contrib.auth.models import AbstractUser
from shortuuid.django_fields import ShortUUIDField
from django.utils.html import mark_safe
from django.contrib import admin
from django.db.models.functions import Concat
from django.db.models import Value
from colorfield.fields import ColorField


class User(AbstractUser):
    USER_SEX = [
        ("Female", "Female"),
        ("Male", "Male"),
    ]

    avatar = models.ImageField(
        upload_to="avatars/%Y/%m/%d/",
        null=True,
        blank=True,
        help_text="Upload avatar of the user",
    )
    sex = models.CharField(max_length=6, choices=USER_SEX, help_text="Sex of the user")
    address = models.TextField(blank=True, null=True, help_text="Address of the user")
    phone = models.CharField(
        max_length=20, blank=True, null=True, help_text="Phone number of the user"
    )

    class Meta:
        ordering = (
            "last_name",
            "first_name",
        )

    @property
    @admin.display(ordering=Concat("first_name", Value(" "), "last_name"))
    def full_name(self):
        return self.last_name + " " + self.first_name

    def avatar_url(self):
        if self.avatar:
            return mark_safe(
                '<img src="%s" width="80" height="80" alt="%s" class="img-thumbnail rounded-circle shadow" />'
                % (self.avatar.url, self.username)
            )
        return mark_safe(
            '<p class="font-italic"><strong class="text-danger">Danger!</strong> You should upload avatar.</p>'
        )

    def avatar_url(self):
        if self.avatar:
            return mark_safe(
                '<img src="%s" width="80" height="80" alt="%s" class="img-thumbnail rounded-circle shadow" />'
                % (self.avatar.url, self.username)
            )
        return mark_safe(
            '<p class="font-italic"><strong class="text-danger">Danger!</strong> You should upload avatar.</p>'
        )

    avatar_url.short_description = "Avatar Preview"

    def __str__(self):
        return self.username


class Employee(models.Model):
    id = ShortUUIDField(
        length=6,
        max_length=9,
        prefix="EM#",
        alphabet="123467890",
        primary_key=True,
        help_text="UUID of this employee",
    )
    department = models.CharField(max_length=100, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username}: {self.department}"


class CommonModel(models.Model):
    is_active = models.BooleanField(
        default=True,
        verbose_name="Active",
        help_text="Designates whether this model should be treated as active. Unselect this instead of deleting models.",
    )
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = (
            "-date_created",
            "is_active",
        )


class Category(CommonModel):
    name = models.CharField(
        max_length=90, unique=True, help_text="Required. 90 characters or fewer."
    )
    slug = models.SlugField(
        unique=True, null=True, blank=True, help_text="URL safe slug for category"
    )

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class SizeVariant(CommonModel):
    PRODUCT_SIZE = [
        ("S", "S"),
        ("M", "M"),
        ("L", "L"),
    ]

    value = models.CharField(
        max_length=1, unique=True, choices=PRODUCT_SIZE, help_text="Size of the product"
    )

    class Meta:
        verbose_name_plural = "Sizes"

    def __str__(self):
        return self.value


class ColorVariant(CommonModel):
    value = ColorField(default="#FFFFFF", unique=True, help_text="Color of the product")

    class Meta:
        verbose_name_plural = "Colors"

    def __str__(self):
        return self.value


class Product(CommonModel):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        help_text="Category of this product",
    )
    id = ShortUUIDField(
        length=5,
        max_length=8,
        prefix="SP#",
        alphabet="123467890",
        primary_key=True,
        help_text="UUID of this product",
        verbose_name="SKU",
    )
    image = models.ImageField(
        help_text="Image of this product",
        upload_to="products/%Y/%m/%d/",
        blank=True,
        null=True,
    )
    title = models.CharField(
        max_length=255, unique=True, help_text="Title of this product"
    )
    slug = models.SlugField(
        unique=True, null=True, blank=True, help_text="URL safe slug for product"
    )
    price = models.FloatField(default=0.0, help_text="Price for this product")
    discount = models.FloatField(
        help_text="Discount of this product",
        default=0.00,
    )
    description = models.TextField(
        help_text="Description about the product",
        blank=True,
        null=True,
    )
    amount = models.IntegerField(
        default=1,
        help_text="Amount of the product",
    )
    color_variant = models.ManyToManyField(
        ColorVariant,
        blank=True,
        help_text="Color value of the product",
    )
    size_variant = models.ManyToManyField(
        SizeVariant,
        blank=True,
        help_text="Size value of the product",
    )
    tags = models.ManyToManyField(
        "Tag", related_name="tags", help_text="Tags of the product"
    )

    class Meta:
        index_together = (("id", "slug"),)

    @property
    def new_price(self):
        if self.discount:
            new_price = self.price - (self.discount * self.price)
        else:
            new_price = self.price
        return new_price

    @property
    def size_amount(self):
        return self.size_variant.count()

    @property
    def color_amount(self):
        return self.color_variant.count()

    @property
    def number_of_comments(self):
        return Comment.objects.filter(product=self).count()

    def image_url(self):
        if self.image:
            return mark_safe(
                '<img src="%s" width="80" height="80" alt="%s" class="img-thumbnail rounded-circle shadow" />'
                % (self.image.url, self.title)
            )
        return mark_safe(
            '<p class="font-italic"><strong class="text-danger">Danger!</strong> You should upload image.</p>'
        )

    image_url.short_description = "Image Preview"

    def get_absolute_url(self):
        return reverse("detail", kwargs={"slug": self.slug})

    def __str__(self):
        return self.title


class Tag(CommonModel):
    name = models.CharField(max_length=50, unique=True, help_text="Enter a name")
    slug = models.SlugField(
        unique=True, null=True, blank=True, help_text="URL safe slug for tag"
    )

    def __str__(self):
        return self.name


class EvaluateModel(CommonModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        abstract = True
        unique_together = ("product", "user")


class Comment(EvaluateModel):
    content = models.TextField()

    class Meta:
        ordering = ["-date_created"]

    def __str__(self):
        return str(self.user) + " comment " + str(self.content)


class Like(EvaluateModel):
    liked = models.BooleanField(default=True)


class Rating(EvaluateModel):
    rate = models.SmallIntegerField(default=0)


class Order(CommonModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = ShortUUIDField(
        length=5,
        max_length=8,
        prefix="OD#",
        alphabet="123467890",
        primary_key=True,
        help_text="UUID of this product",
        verbose_name="ID",
    )

    def __str__(self):
        return self.id


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return f"{self.product.id} {self.order.id}"


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postal = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.address
