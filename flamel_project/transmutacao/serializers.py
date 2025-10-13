# flamel_project/transmutacao/serializers.py

from rest_framework import serializers
from .models import DocumentoProcessado, TIPOS_TRANSFORMACAO

class DocumentoProcessadoSerializer(serializers.ModelSerializer):
    # O tipo_transformacao será passado via query parameter (GET) ou hidden field (POST)
    # Mas o serializer precisa validá-lo.
    tipo_transfomacao = serializers.ChoiceField(choices=TIPOS_TRANSFORMACAO)

    class Meta:
        model = DocumentoProcessado
        # Campos que o serializer irá receber do formulário
        fields = ('arquivo_original', 'tipo_transfomacao')
        # Apenas o arquivo_original é exigido diretamente do upload
        read_only_fields = ('tipo_transfomacao',)
    