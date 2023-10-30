from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="GloryZ API",
        default_version="v1",
        description="APIs for GloryZ Web Services ⭐",
        terms_of_service="https://github.com/zinitdev/",
        contact=openapi.Contact(email="zin.it.dev@gmail.com"),
        license=openapi.License(name="GloryZ License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    re_path(r"^auth/", include("drf_social_oauth2.urls", namespace="drf")),
    path("", include("shop.urls")),
    path("o/", include("oauth2_provider.urls", namespace="oauth2_provider")),
    path(
        "swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"
    ),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("admin_tools_stats/", include("admin_tools_stats.urls")),
]
