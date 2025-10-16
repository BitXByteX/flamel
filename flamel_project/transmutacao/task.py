# flamel_project/transmutacao/tasks.py

from time import sleep
from celery import shared_task
from transmutacao.models import DocumentoProcessado
from django.utils import timezone
from flamel_project.celery_config import app 


@app.task
def processar_documento_task(documento_id):
    """
    SIMULAÇÃO: Simula o processamento do documento.
    """
    try:
        # 1. Recupera a instância do modelo
        documento = DocumentoProcessado.objects.get(pk=documento_id)
        
        # 2. Marca o início do processamento
        documento.status = 'PROCESSANDO'
        documento.log_processamento = f"Iniciando processamento para: {documento.tipo_transfomacao}"
        documento.save()

        print(f"[{documento.id}] Processamento iniciado: {documento.tipo_transfomacao}")

        # 3. SIMULAÇÃO DE DEMORA: Espera 15 segundos
        sleep(15) 
        
        # 4. SIMULAÇÃO DE RESULTADO: Atualiza o modelo com sucesso
        documento.status = 'SUCESSO'
        documento.data_conclusao = timezone.now()
        documento.log_processamento += "\nConcluído com sucesso (Mock)."
        documento.save()
        
        print(f"[{documento.id}] Processamento CONCLUÍDO.")
        
        return True
    
    except DocumentoProcessado.DoesNotExist:
        print(f"Erro: Documento com ID {documento_id} não encontrado.")
        return False
    except Exception as e:
        # Trata qualquer erro e marca o status como falha
        if 'documento' in locals():
            documento.status = 'FALHA'
            documento.log_processamento = f"Falha no processamento: {str(e)}"
            documento.save()
        print(f"Erro: Processamento FALHOU: {str(e)}")
        return False