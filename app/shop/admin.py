import csv
from django.contrib import admin, messages
from .models import *
from django.core import serializers
from django.http import HttpResponse
from django.contrib.auth.models import Permission
from django.utils.translation import ngettext


class TagProductInline(admin.TabularInline):
    model = Product.tags.through


class SizeVariantshipInline(admin.TabularInline):
    model = Product.size_variant.through


class ColorVariantshipInline(admin.TabularInline):
    model = Product.color_variant.through


class ProductInline(admin.StackedInline):
    model = Product
    extra = 1


# class OrderItemInline(admin.TabularInline):
#     model = Order.products.through
#     extra = 1
#     raw_id_fields = ["product"]


class EmployeeInline(admin.TabularInline):
    model = Employee
    extra = 1


@admin.action(description="Mark selected models as disactived")
def make_actived(self, request, queryset):
    updated = queryset.update(is_active=False)
    self.message_user(
        request,
        ngettext(
            "%d model was successfully marked as disactived.",
            "%d models were successfully marked as disactived.",
            updated,
        )
        % updated,
        messages.SUCCESS,
    )


@admin.action(description="Mark selected models as export file JSON")
def export_as_json(self, request, queryset):
    response = HttpResponse(content_type="application/json")
    serializers.serialize("json", queryset, stream=response)
    return response


@admin.action(description="Mark selected models as export file CSV")
def export_as_csv(self, request, queryset):
    meta = self.model._meta
    field_names = [field.name for field in meta.fields]

    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = "attachment; filename={}.csv".format(meta)
    writer = csv.writer(response)

    writer.writerow(field_names)
    for obj in queryset:
        row = writer.writerow([getattr(obj, field) for field in field_names])

    return response


class UserAdmin(admin.ModelAdmin):
    inlines = (EmployeeInline,)
    list_display = (
        "username",
        "full_name",
        "avatar_url",
        "is_active",
        "last_login",
    )
    list_editable = ["is_active"]
    date_hierarchy = "date_joined"
    search_fields = ["username", "last_name", "first_name"]
    list_display_links = ["full_name", "username"]
    readonly_fields = ["avatar_url", "date_joined", "last_login"]
    list_filter = ["is_active", "is_staff", "is_superuser"]
    list_per_page = 20


class CategoryAdmin(admin.ModelAdmin):
    inlines = [
        ProductInline,
    ]

    list_display = (
        "name",
        "is_active",
    )
    list_editable = ["is_active"]
    date_hierarchy = "date_created"
    list_display_links = ["name"]

    search_fields = ["name"]

    prepopulated_fields = {"slug": ["name"]}

    list_filter = ["is_active", "date_created"]
    list_per_page = 20
    readonly_fields = ["date_created", "date_updated"]


class ProductAdmin(admin.ModelAdmin):
    inlines = [
        SizeVariantshipInline,
        ColorVariantshipInline,
        # OrderItemInline,
        TagProductInline,
    ]
    list_display = (
        "title",
        "image_url",
        "price",
        "size_amount",
        "color_amount",
        "is_active",
        "category",
    )
    list_editable = ["price", "is_active"]
    date_hierarchy = "date_created"
    exclude = [
        "size_variant",
        "color_variant",
    ]
    list_display_links = ["title", "category"]
    list_filter = [
        "category__name",
        "is_active",
        "price",
        "discount",
    ]
    readonly_fields = ["date_created", "date_updated", "image_url"]
    search_fields = ["title", "price", "category__name"]
    readonly_fields = [
        "size_variant",
        "color_variant",
        "tags",
    ]

    raw_id_fields = ["size_variant", "color_variant"]

    autocomplete_fields = ["category"]

    prepopulated_fields = {"slug": ["title"]}
    list_per_page = 20


class TagAdmin(admin.ModelAdmin):
    inlines = [
        TagProductInline,
    ]
    list_display = (
        "name",
        "slug",
        "is_active",
    )
    list_filter = ["is_active"]
    search_fields = ["name"]
    list_per_page = 20
    date_hierarchy = "date_created"
    readonly_fields = ["date_created", "date_updated"]
    prepopulated_fields = {"slug": ["name"]}


class SizeVariantAdmin(admin.ModelAdmin):
    inlines = [
        SizeVariantshipInline,
    ]
    list_display = (
        "value",
        "is_active",
    )
    list_filter = ["is_active"]
    search_fields = ["value"]
    list_per_page = 20
    date_hierarchy = "date_created"
    readonly_fields = ["date_created", "date_updated"]


class ColorVariantAdmin(admin.ModelAdmin):
    inlines = [
        ColorVariantshipInline,
    ]

    list_display = (
        "value",
        "is_active",
    )
    list_filter = ["is_active"]
    search_fields = ["name"]

    list_per_page = 20
    date_hierarchy = "date_created"
    readonly_fields = ["date_created", "date_updated"]


class CommentAdmin(admin.ModelAdmin):
    list_display = (
        "content",
        "product",
        "date_created",
        "is_active",
    )
    list_filter = (
        "is_active",
        "date_created",
    )
    search_fields = ("content",)
    actions = ["approve_comments"]

    def approve_comments(self, request, queryset):
        queryset.update(is_active=True)


admin.site.register(User, UserAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(SizeVariant, SizeVariantAdmin)
admin.site.register(ColorVariant, ColorVariantAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Permission)
admin.site.add_action(make_actived, "Make Disactived")
admin.site.add_action(export_as_json, "Export as JSON")
admin.site.add_action(export_as_csv, "Export as CSV")
