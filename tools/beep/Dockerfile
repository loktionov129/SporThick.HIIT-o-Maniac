FROM nvidia/cuda:12.1.0-base-ubuntu22.04

RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    git \
    pkg-config \
    libavformat-dev \
    libavcodec-dev \
    libavdevice-dev \
    libavutil-dev \
    libswscale-dev \
    libswresample-dev \
    libavfilter-dev \
    && rm -rf /var/lib/apt/lists/*

RUN ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app

RUN pip install --no-cache-dir -U pip setuptools wheel
RUN pip install --no-cache-dir "numpy<2"
RUN pip install --no-cache-dir torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

RUN pip install --no-cache-dir audiocraft
RUN pip install --no-cache-dir --upgrade torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121


# Создаем папку для моделей
RUN mkdir -p /app/models
ENV HUGGINGFACE_HUB_CACHE=/app/models
# Заставляем python скачать модель один раз на этапе сборки образа
RUN python -c "from audiocraft.models import AudioGen; AudioGen.get_pretrained('facebook/audiogen-medium')"

CMD ["python", "generate_sounds.py"]
