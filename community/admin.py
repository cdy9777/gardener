from django.contrib import admin
from . import models

# Register your models here.
# Photo 클래스를 inline으로 나타낸다.


@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    pass


@admin.register(models.TaggedPost)
class TaggedPostAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Reply)
class TaggedPostAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Notice)
class NoticeAdmin(admin.ModelAdmin):
    pass
