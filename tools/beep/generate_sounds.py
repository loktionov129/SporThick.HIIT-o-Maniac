import os
import json
import torch
from audiocraft.models import AudioGen
from audiocraft.data.audio import audio_write

os.environ['HUGGINGFACE_HUB_CACHE'] = '/app/models'
CONFIG_PATH = 'presets.json'
if not os.path.exists(CONFIG_PATH):
    print(f"Ошибка: Файл {CONFIG_PATH} не найден!")
    exit()

with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
    presets = json.load(f)

# Проверяем GPU
device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(f"--- Running on: {device} ---")
if device == 'cuda':
    print(f"--- Device Name: {torch.cuda.get_device_name(0)} ---")

print("Загрузка модели AudioGen (medium)...")
model = AudioGen.get_pretrained('facebook/audiogen-medium')
#model.to(device)

for preset_name, sounds in presets.items():
    print(f"\n>>> ОБРАБОТКА ПРЕСЕТА: {preset_name}")
    dirpath = os.path.join("tmp", preset_name)
    os.makedirs(dirpath, exist_ok=True)
    
    for name, description in sounds.items():
        # 1 сек для COUNTDOWN, 4 сек для остальных
        duration = 1 if name == "COUNTDOWN" else 4
        model.set_generation_params(duration=duration)
        
        print(f"Генерация {name} ({duration} сек)...")
        wav = model.generate([description])
        
        filepath = os.path.join(dirpath, name)
        # wav[0] для корректной работы audio_write в Docker
        audio_write(filepath, wav[0].cpu(), model.sample_rate, strategy="loudness")
        print(f"   [OK] {filepath}.wav")

print("\nВСЕ ЗВУКИ СГЕНЕРИРОВАНЫ!")
