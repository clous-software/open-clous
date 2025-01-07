from django.contrib import admin
from .models import CompensationsList, JobList, Conversation, ToolList, RequirementList, LanguageList, ResponsibilitiesList, BenefitsList


class ConversationAdmin(admin.ModelAdmin):
    list_display = ('id', 'prompt','created_at')

admin.site.register(Conversation, ConversationAdmin)


class JobListAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'status', 'created_at', 'updated_at')

    def status_display(self, obj):
        return obj.get_status_display()  # Muestra el estado en la lista de trabajos

    status_display.short_description = 'Estado'  # Cambia el encabezado de la columna

admin.site.register(JobList, JobListAdmin)


class ToolListAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

admin.site.register(ToolList, ToolListAdmin)


class LanguageListAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

admin.site.register(LanguageList, LanguageListAdmin)


admin.site.register(RequirementList)
admin.site.register(ResponsibilitiesList)
admin.site.register(BenefitsList)
admin.site.register(CompensationsList)

