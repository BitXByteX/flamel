📜 Flamel: Transmutador Digital de Documentos

# Introdução

Flamel (em homenagem ao alquimista Nicolas Flamel) é um mini-sistema web com o objetivo de transmutar documentos PDF antigos, ilegíveis ou digitalizados em formatos modernos e acessíveis.

O projeto demonstra a integração de técnicas avançadas de processamento de documentos, Optical Character Recognition (OCR) e tecnologias assíncronas para criar uma solução eficiente e escalável.

Funcionalidades Principais

O sistema oferece três tipos de transmutação para documentos PDF enviados:

* Melhoria de Legibilidade: Aplica técnicas de pré-processamento de imagem (via OpenCV) para otimizar a qualidade visual do PDF e facilitar a leitura humana e o OCR.

* Extração de Texto (OCR): Utiliza o motor Tesseract para reconhecer e transcrever o texto contido em PDFs baseados em imagens ou escaneados, transformando-o em um arquivo de texto pesquisável.

* Conversão para Áudio (TTS): Converte o texto extraído do PDF em um audiolivro (MP3) através da tecnologia Text-to-Speech (gTTS), promovendo a acessibilidade.