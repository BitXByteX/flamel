from time import sleep
from celery import shared_task
from transmutacao.models import DocumentoProcessado
from django.utils import timezone
from django.core.files.base import ContentFile # <--- NOVA IMPORTAÇÃO
from flamel_project.celery_config import app

# IMPORTS NECESSÁRIOS PARA O OCR
import pytesseract
from pdf2image import convert_from_path

# [!] IMPORTANTE: Se o Tesseract não estiver no PATH do sistema, descomente a linha abaixo 
# e ajuste para o caminho exato do executável (muito comum no Windows).
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe' 


@app.task
def processar_documento_task(documento_id):
    """
    IMPLEMENTAÇÃO REAL: Processa o documento baseado no tipo de transmutação.
    """
    try:
        # 1. Recupera a instância do modelo
        documento = DocumentoProcessado.objects.get(pk=documento_id)
        
        # 2. Marca o início do processamento
        documento.status = 'PROCESSANDO'
        documento.log_processamento = f"Iniciando processamento para: {documento.tipo_transfomacao}"
        documento.save()

        print(f"[{documento.id}] Processamento iniciado: {documento.tipo_transfomacao}")

        # ----------------------------------------------------
        # 3. LÓGICA REAL DE PROCESSAMENTO
        # ----------------------------------------------------
        
        if documento.tipo_transfomacao == 'EXTRAIR_TEXTO':
            
            # Converte o PDF em lista de imagens (necessita de poppler instalado no sistema)
            images = convert_from_path(documento.arquivo_original.path)
            full_text = ""
            
            # Itera sobre cada página/imagem e extrai o texto com Tesseract
            for i, image in enumerate(images):
                # Usamos 'por' para Português
                text = pytesseract.image_to_string(image, lang='por') 
                full_text += f"\n\n--- PAGINA {i+1} ---\n\n{text}"
                
            # Cria o nome do arquivo de resultado
            original_name = documento.arquivo_original.name.split('/')[-1].replace('.pdf', '')
            output_filename = f"{original_name}_transcrito.txt"
            
            # Salva o conteúdo (o texto extraído) no campo FileField usando ContentFile
            documento.arquivo_resultado.save(output_filename, ContentFile(full_text.encode('utf-8')))
            
            documento.log_processamento = "Processamento OCR concluído e arquivo TXT gerado." 
        elif documento.tipo_transfomacao in ['MELHORAR_PDF', 'TRANSFORMAR_AUDIO']:
            # MOCK TEMPORÁRIO para outras funcionalidades
            sleep(15)
            documento.log_processamento = f"Processamento {documento.tipo_transfomacao} (Mock) concluído. Arquivo de resultado não gerado."     
        else:
            raise ValueError(f"Tipo de transmutação desconhecido: {documento.tipo_transfomacao}")
        documento.status = 'SUCESSO'
        documento.data_conclusao = timezone.now()
        documento.save()
        
        print(f"[{documento.id}] Processamento CONCLUÍDO.")
        
        return True
    
    except DocumentoProcessado.DoesNotExist:
        print(f"Erro: Documento com ID {documento_id} não encontrado.")
        return False
    except Exception as e:
        # Trata a falha e atualiza o status
        if 'documento' in locals():
            documento.status = 'FALHA'
            # Ajuda a diagnosticar se o Tesseract não foi instalado no sistema
            if "tesseract is not installed or it's not in your PATH" in str(e):
                 documento.log_processamento = "FALHA: Tesseract não encontrado. Instale o motor OCR e os dados de 'por'."
            else:
                 documento.log_processamento = f"Falha no processamento: {str(e)}"
            documento.save()
        print(f"Erro: Processamento FALHOU: {str(e)}")
        return False