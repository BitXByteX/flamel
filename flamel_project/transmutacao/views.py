from django.shortcuts import render

# flamel_project/transmutacao/views.py (Trecho com a view atualizada)

from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import DocumentoProcessado
from .serializers import DocumentoProcessadoSerializer
from .celery import start_processing_task # Iremos criar esta função Celery em breve!

# ... (Mantenha login_mock_view e dashboard_view acima) ...

# --- 3. View para Upload (Recebe GET e POST) ---
# Usamos o decorator @api_view, mesmo que a resposta final seja HTML (que o HTMX espera).
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
        # O DRF precisa do tipo de transformação para validar o modelo.
        # Ele deve vir como um campo hidden no formulário.
        mode = request.data.get('tipo_transfomacao')
        
        # Cria um objeto de dados mutável (pois o tipo_transformacao não está no arquivo)
        mutable_data = request.data.copy()
        mutable_data['tipo_transfomacao'] = mode
        
        serializer = DocumentoProcessadoSerializer(data=mutable_data)

        if serializer.is_valid():
            # Salva o DocumentoProcessado no banco de dados.
            doc_instance = serializer.save(status='PROCESSANDO')
            
            # **AQUI VAI A CHAMADA PARA O CELERY**
            # (Comentado por enquanto, pois Celery será configurado logo após)
            # task = start_processing_task.delay(doc_instance.id)
            # doc_instance.task_id = task.id
            # doc_instance.save()
            
            # Resposta para o HTMX: Retorna a área de status/download para o polling
            return render(request, 'transmutacao/_status_area.html', {
                'documento': doc_instance, 
                'initial_status': 'PROCESSANDO'
            })
        
        # Se falhar (ex: arquivo não enviado), retorna o erro para o HTMX
        return render(request, 'transmutacao/upload.html', {
            'mode': mode,
            'errors': serializer.errors 
        })# Create your views here.
