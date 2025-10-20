from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.http import HttpResponse, FileResponse

# DRF
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

# Importações do Módulo
from .models import DocumentoProcessado, TIPOS_TRANSFORMACAO
from .serializers import DocumentoProcessadoSerializer
from .task import processar_documento_task


def login_mock_view(request):
    """
    Simula um login. Apenas redireciona para o Dashboard.
    """
    if request.method == 'POST':
        # Redireciona para a URL 'dashboard' (que é a rota '/dashboard/')
        return redirect('dashboard')  
    return render(request, 'login.html', {'title': 'Login'})


def dashboard_view(request):
    """
    Tela principal com as opções de transmutação.
    """
    return render(request, 'dashboard.html', {'title': 'Dashboard'})


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def upload_file_view(request):
    """
    1. GET: Renderiza a tela de upload.
    2. POST: Recebe o arquivo, salva no DB e dispara a tarefa Celery.
    """

    # ... (dentro da upload_file_view, bloco GET)
    if request.method == 'GET':
        mode = request.GET.get('mode', None)

        # Use TIPOS_TRANSFORMACAO diretamente
        if mode not in [c[0] for c in TIPOS_TRANSFORMACAO]: 
            return render(request, 'error.html', {'message': 'Modo de '
                             'transformaçãos''inválido.'})

        return render(request, 'upload.html', {'mode': mode})

    # 2. Requisição POST (Upload do arquivo - A Lógica Corrigida do DRF)
    elif request.method == 'POST':
        
        # --- LÓGICA DE UPLOAD E SERIALIZAÇÃO DO DRF ---
        mode = request.data.get('tipo_transfomacao')
        
        # Cria um objeto de dados mutável para incluir o modo no serializer
        mutable_data = request.data.copy()
        mutable_data['tipo_transfomacao'] = mode
        
        serializer = DocumentoProcessadoSerializer(data=mutable_data)

        if serializer.is_valid():
            # Salva o DocumentoProcessado no banco de dados.
            doc_instance = serializer.save(status='PENDENTE')
 
            # DISPARANDO O CELERY
            task = processar_documento_task.delay(doc_instance.id)
            doc_instance.task_id = task.id
            doc_instance.status = 'PROCESSANDO' 
            doc_instance.save()

            # Resposta para o HTMX (para iniciar o polling)
            return render(request, '_status_area.html', {
                'documento': doc_instance,
            })
        
        # Se falhar (serializer não é válido, ex: arquivo faltando)
        return render(request, 'upload.html', {
                    'mode': mode,
                    'errors': serializer.errors
        })

# ----------------------------------------
# 3. VIEWS DE STATUS E DOWNLOAD
# ----------------------------------------


def task_status_view(request, task_id):
    """
    Endpoint de polling do HTMX: Verifica o status da tarefa no DB e 
    retorna o HTML de progresso, sucesso ou falha.
    """
    try:
        documento = DocumentoProcessado.objects.get(task_id=task_id)

        if documento.status == 'SUCESSO':
            return render(request, 'download.html',
                          {'documento': documento})

        elif documento.status == 'FALHA':
            return render(request, '_status_fail.html',
                          {'documento': documento})
        else: # PENDENTE ou PROCESSANDO
            return render(request, '_status_area.html',
                          {'documento': documento})

    except DocumentoProcessado.DoesNotExist:
        return render(request, '_status_fail.html', {
            'documento': None,
            'error_msg': f"Tarefa {task_id} não encontrada no banco de dados."
        })


def download_file_view(request, file_id):
    """
    Permite baixar o arquivo de resultado.
    """
    documento = get_object_or_404(DocumentoProcessado, pk=file_id)  
    if not documento.arquivo_resultado:
        return HttpResponse("Arquivo de resultado não encontrado. Houve um erro interno.", status=404) 
    # Prepara a resposta para o download
    response = FileResponse(documento.arquivo_resultado, as_attachment=True)

    # Define o nome do arquivo (ex: resultado_123.mp3)
    response['Content-Disposition'] = f'attachment; filename="{documento.arquivo_resultado.name.split("/")[-1]}"'

    return response
