import os
import torch
from audiocraft.models import AudioGen
from audiocraft.data.audio import audio_write

# Указываем папку для кэша моделей, чтобы не качать их каждый раз
os.environ['HUGGINGFACE_HUB_CACHE'] = '/app/models'

presets = {
    "1_Maniac": {
        "START_WORK": "Cinematic ear-piercing female horror scream, sudden, blood-curdling, reverb",
        "END_WORK": "Close-up terrifying heavy raspy male breathing, panic, sinister, throat sounds",
        "END_ROUND": "Deep heavy cinematic hit, low frequency metallic thud, creepy iron bell toll",
        "FINISH": "Sinister deep psychotic male laugh, echoing in a dark room, evil mastermind",
        "COUNTDOWN": "Sharp metallic mechanical click, heavy shotgun cocking sound, menacing"
    },
    "2_Army": {
        "START_WORK": "Aggressive drill sergeant shouting SIR YES SIR, authoritative military voice",
        "END_WORK": "Loud commanding military officer voice shouting FALL OUT, disciplined tone",
        "END_ROUND": "Short military bugle call, clear brass trumpet signal, battlefield",
        "FINISH": "Fast rhythmic military drum roll with marching boots on gravel, triumphant",
        "COUNTDOWN": "Snare drum roll, military tension, buildup to a command, crisp percussion"
    },
    "3_Sexy": {
        "START_WORK": "Very close intimate whisper woman saying Go baby, breathy, sensual, seductive",
        "END_WORK": "Soft breathy woman sigh of relief, Mmm time to rest, sensual gentle voice",
        "END_ROUND": "Audible cinematic air kiss, muah sound, close to microphone, playful",
        "FINISH": "Final deep satisfied exhale woman, Perfect we are done, intimate breathy",
        "COUNTDOWN": "Steady human heartbeat sound, deep bass thumping, intimate rhythm"
    },
    "4_Tabata": {
        "START_WORK": "Loud piercing professional athletic whistle blow, sharp start signal, gym acoustics",
        "END_WORK": "Single loud boxing ring bell hit, clear metallic resonance, professional fight signal",
        "END_ROUND": "Double boxing bell hit, ding-ding, fast metallic strike, end of round",
        "FINISH": "Large crowd cheering and applauding, stadium atmosphere, motivational",
        "COUNTDOWN": "Short high-frequency digital beep, 8-bit timer sound, sharp UI beep"
    },
    "5_Classic": {
        "START_WORK": "Standard plastic referee whistle, short sharp blast, clean outdoor field sound",
        "END_WORK": "Neutral low-frequency digital beep, simple UI confirmation sound, flat",
        "END_ROUND": "Traditional deep orchestral gong hit, long tail resonance, zen-like strike",
        "FINISH": "Short triumphant orchestral trumpet fanfare, success celebration, bright",
        "COUNTDOWN": "Single mechanical clock tick, woodblock percussion hit, simple metronome"
    }
}

print("Загрузка модели AudioGen (RTX 4080 detected)...")
model = AudioGen.get_pretrained('facebook/audiogen-medium')
model.set_generation_params(duration=1) 

for preset_name, sounds in presets.items():
    print(f"\n>>> Генерирую пресет: {preset_name}")
    os.makedirs(preset_name, exist_ok=True)
    
    descriptions = list(sounds.values())
    filenames = list(sounds.keys())
    
    wavs = model.generate(descriptions)
    
    for audio, name in zip(wavs, filenames):
        filepath = os.path.join(preset_name, name)
        audio_write(filepath, audio.cpu(), model.sample_rate, strategy="loudness")
        print(f"Сохранено: {filepath}.wav")

print("\nВсё готово! Проверяй папки.")
