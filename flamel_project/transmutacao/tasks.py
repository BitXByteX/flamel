from time import sleep
from celery import shared_task
from transmutacao.models import DocumentoProcessado
from django.utils import timezone
from django.core.files.base import ContentFile
from flamel_project.celery_config import app

# IMPORTS NECESSÁRIOS PARA O OCR
import pytesseract
from pdf2image import convert_from_path


@app.task
def processar_documento_task(documento_id):
    """
    IMPLEMENTAÇÃO REAL: Processa o documento baseado no tipo de transmutação.
    """
    documento = None  # Inicializa para garantir que está acessível no except
    try:
        # 1. Recupera a instância do modelo
        documento = DocumentoProcessado.objects.get(pk=documento_id)
        
        # 2. Marca o início do processamento
        documento.status = 'PROCESSANDO'
        documento.log_processamento = f"Iniciando processamento para: {documento.tipo_transfomacao}"
        documento.save()

        print(f"[{documento.id}] Processamento iniciado: {documento.tipo_transfomacao}")

        # ----------------------------------------------------
        # 3. LÓGICA DE PROCESSAMENTO
        # ----------------------------------------------------
        
        if documento.tipo_transfomacao == 'EXTRAIR_TEXTO':
            
            # Converte o PDF em lista de imagens (necessita de poppler instalado no sistema)
            images = convert_from_path(documento.arquivo_original.path)
            full_text = ""
            
            for i, image in enumerate(images):
                # Usamos 'por' para Português
                text = pytesseract.image_to_string(image, lang='por') 
                full_text += f"\n\n--- PAGINA {i+1} ---\n\n{text}"
                
            original_name = documento.arquivo_original.name.split('/')[-1].replace('.pdf', '')
            output_filename = f"{original_name}_transcrito.txt"
            
            documento.arquivo_resultado.save(output_filename, ContentFile(full_text.encode('utf-8')))
            documento.log_processamento = "Processamento OCR concluído e arquivo TXT gerado." 
        
        elif documento.tipo_transfomacao == 'MELHORAR_PDF':
            # MOCK COM SALVAMENTO para MELHORAR_PDF (necessário para testar o download)
            sleep(5)
            output_filename = f"melhorado_{documento.id}.pdf"
            mock_content = f"PDF Melhorado da Tarefa {documento.id} (MOCK)"
            documento.arquivo_resultado.save(output_filename, ContentFile(mock_content.encode('utf-8')))
            documento.log_processamento = "Melhoria (Mock) concluída e arquivo PDF simulado gerado."

        elif documento.tipo_transfomacao == 'TRANSFORMAR_AUDIO':
            # MOCK COM SALVAMENTO para TRANSFORMAR_AUDIO
            sleep(5)
            output_filename = f"audio_{documento.id}.mp3"
            mock_content = f"Áudio da Tarefa {documento.id} (MOCK)"
            documento.arquivo_resultado.save(output_filename, ContentFile(mock_content.encode('utf-8')))
            documento.log_processamento = "Áudio (Mock) concluído e arquivo MP3 simulado gerado."
            
        else:
            raise ValueError(f"Tipo de transmutação desconhecido: {documento.tipo_transfomacao}")

        # 4. Finalização de Sucesso
        documento.status = 'SUCESSO'
        documento.data_conclusao = timezone.now()
        documento.save()
        
        print(f"[{documento.id}] Processamento CONCLUÍDO.")
        
        return True

    except DocumentoProcessado.DoesNotExist:
        print(f"Erro: Documento com ID {documento_id} não encontrado.")
        return False
    # Bloco EXCEPT para tratar falhas no processamento
    except Exception as e:
        if documento:
            documento.status = 'FALHA'
            if "tesseract is not installed or it's not in your PATH" in str(e):
                documento.log_processamento = "FALHA: Tesseract não encontrado. Instale o motor OCR e os dados de 'por'."
            elif "No module named 'transmutacao.tasks'" in str(e):
                 documento.log_processamento = "FALHA DE SINTAXE. Verifique o alinhamento do try/except no views.py."
            else:
                 documento.log_processamento = f"Falha no processamento: {str(e)}"
            documento.save()
        print(f"Erro: Processamento FALHOU: {str(e)}")
        return False