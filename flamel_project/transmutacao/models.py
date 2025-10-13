from django.db import models


# Create your models here.
# flamel_project/transmutacao/models.py

from django.db import models
from django.contrib.auth.models import User # Vamos usar o modelo de User padrão do Django

# Constantes para os tipos de transmutação (Opções do Dashboard)
TIPOS_TRANSFORMACAO = (
    ('MELHORAR_PDF', 'Melhorar Legibilidade PDF'),
    ('EXTRAIR_TEXTO', 'Transformar PDF em Texto'),
    ('TRANSFORMAR_AUDIO', 'Transformar PDF em Áudio'),
)

# Constantes para o Status da Tarefa (Comunicação com o Celery)
STATUS_TAREFA = (
    ('PENDENTE', 'Pendente/Na Fila'),
    ('PROCESSANDO', 'Em Processamento'),
    ('SUCESSO', 'Concluído com Sucesso'),
    ('FALHA', 'Falha no Processamento'),
)

class DocumentoProcessado(models.Model):
    # Rastreamento do Usuário (Para o futuro, por enquanto será apenas um mock)
    # Supondo que você usará o modelo padrão de usuário.
    # Se você não for implementar o login real, pode manter o campo nulo.
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    # -------------------
    # DADOS DO UPLOAD
    # -------------------
    arquivo_original = models.FileField(
        upload_to='originais/', 
        verbose_name='PDF Original'
    )
    
    tipo_transfomacao = models.CharField(
        max_length=50,
        choices=TIPOS_TRANSFORMACAO,
        verbose_name='Tipo de Transformação'
    )
    
    # -------------------
    # DADOS DO PROCESSAMENTO ASSÍNCRONO (CELERY)
    # -------------------
    task_id = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        verbose_name='ID da Tarefa Celery',
        help_text='ID usado para rastrear o status da tarefa assíncrona.'
    )

    status = models.CharField(
        max_length=50,
        choices=STATUS_TAREFA,
        default='PENDENTE',
        verbose_name='Status da Tarefa'
    )

    # -------------------
    # RESULTADO
    # -------------------
    # Armazena o arquivo de saída (PDF melhorado, TXT, ou MP3)
    arquivo_resultado = models.FileField(
        upload_to='resultados/', 
        null=True, 
        blank=True, 
        verbose_name='Arquivo de Resultado'
    )

    # Pode ser útil para debug ou para exibir uma mensagem de erro
    log_processamento = models.TextField(
        null=True, 
        blank=True, 
        verbose_name='Log/Mensagem de Erro'
    )

    data_criacao = models.DateTimeField(auto_now_add=True)
    data_conclusao = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.id} - {self.tipo_transfomacao} - {self.status}'
    
    class Meta:
        verbose_name = 'Documento Processado'
        verbose_name_plural = 'Documentos Processados'