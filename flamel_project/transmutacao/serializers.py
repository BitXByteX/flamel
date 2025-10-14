# flamel_project/transmutacao/serializers.py

from rest_framework import serializers
from .models import DocumentoProcessado, TIPOS_TRANSFORMACAO


class DocumentoProcessadoSerializer(serializers.ModelSerializer):
    tipo_transfomacao = serializers.ChoiceField(choices=TIPOS_TRANSFORMACAO)

    class Meta:
        model = DocumentoProcessado
        fields = ('arquivo_original', 'tipo_transfomacao')
        read_only_fields = ('tipo_transfomacao',)
