from django.shortcuts import render

# flamel_project/transmutacao/views.py (Trecho com a view atualizada)

from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import DocumentoProcessado
from .serializers import DocumentoProcessadoSerializer
from .celery import start_processing_task # Iremos criar esta função Celery em breve!
from .tasks import processar_documento_task
from django.http import HttpResponse, FileResponse, response
from django.shortcuts import get_object_or_404


@api_view(['GET', 'POST'])
def upload_file_view(request):
    """
    1. GET: Renderiza a tela de upload (passo 3 do diagrama) com a opção escolhida.
    2. POST: Recebe o arquivo, salva no DB e dispara a tarefa Celery.
    """
    
    # 1. Requisição GET (Vindo do Dashboard)
    if request.method == 'GET':
        mode = request.GET.get('mode', None)
        
        # Validação simples para garantir que o modo foi selecionado
        if mode not in [c[0] for c in DocumentoProcessado.TIPOS_TRANSFORMACAO]:
            return render(request, 'error.html', {'message': 'Modo de transformação inválido.'})

        # Renderiza o template de upload, passando o modo para ser usado no POST
        return render(request, 'transmutacao/upload.html', {'mode': mode})

    # 2. Requisição POST (Upload do arquivo)
    elif request.method == 'POST':

        if serializer.is_valid():
            doc_instance = serializer.save(status='PENDENTE')
 
            # **DISPARANDO O CELERY - AGORA DESCOMENTADO E CORRIGIDO**
            task = processar_documento_task.delay(doc_instance.id) # .delay é o método Celery para colocar na fila
            doc_instance.task_id = task.id
            doc_instance.status = 'PROCESSANDO' 
            doc_instance.save()

            # Resposta para o HTMX (para iniciar o polling)
            return render(request, 'transmutacao/_status_area.html', {
                'documento': doc_instance,
        })

        # Se falhar (ex: arquivo não enviado), retorna o erro para o HTMX
        return render(request, 'transmutacao/upload.html', {
            'mode': mode,
            'errors': serializer.errors 
        })# Create your views here.


def task_status_view(request, task_id):
    """
    Verifica o status da tarefa no DB e retorna o HTML correspondente.
    """
    try:
        documento = DocumentoProcessado.objects.get(task_id=task_id)

        if documento.status == 'SUCESSO':
            # Se for sucesso, carrega a tela de download (tela final do diagrama)
            return render(request, 'transmutacao/download.html',
                          {'documento': documento})

        elif documento.status == 'FALHA':
            # Se falhou, carrega a mensagem de erro
            return render(request, 'transmutacao/_status_fail.html',
                          {'documento': documento})
        else: # PENDENTE ou PROCESSANDO
            # Continua exibindo a área de status de carregamento e o HTMX fará o polling novamente
            # É crucial retornar o próprio _status_area.html para continuar o ciclo de hx-get/hx-trigger
            return render(request, 'transmutacao/_status_area.html',
                          {'documento': documento})

    except DocumentoProcessado.DoesNotExist:
        # Se o ID não for encontrado
        return render(request, 'transmutacao/_status_fail.html', {
            'documento': None,
            'error_msg': f"Tarefa {task_id} não encontrada no banco de dados."
        })


# --- 5. View para Servir o Download (Tela final: Baixar Arquivo) ---
def download_file_view(request, file_id):
        """
        Permite baixar o arquivo de resultado.
        """
        documento = get_object_or_404(DocumentoProcessado, pk=file_id)
        if not documento.arquivo_resultado:
            # O arquivo de resultado é None no mock, mas na vida real isso deve existir.
            return HttpResponse("Arquivo de resultado não encontrado. Houve um erro interno.", status=404)
        # Prepara a resposta para o download
        response = FileResponse(documento.arquivo_resultado, as_attachment=True)

        # Define o nome do arquivo (ex: resultado_123.mp3)
        response['Content-Disposition'] = f'attachment; filename="{documento.arquivo_resultado.name.split("/")[-1]}"'

        return response
