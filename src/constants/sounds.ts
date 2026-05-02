import type { SoundPreset } from "../types";
import type { SignalType } from "../utils/beep";

export const SOUND_PRESETS: Record<SoundPreset, Record<SignalType, string>> = {
  maniac: {
    START_WORK: '/sounds/maniac/scream.mp3',
    END_WORK: '/sounds/maniac/breath.mp3',
    END_ROUND: '/sounds/maniac/bell-heavy.mp3',
    FINISH: '/sounds/maniac/laugh.mp3',
    COUNTDOWN: '/sounds/maniac/click.mp3'
  },
  army: {
    START_WORK: '/sounds/army/sir-yes-sir.mp3', // Окрик сержанта
    END_WORK: '/sounds/army/fall-out.mp3',      // Команда "вольно"
    END_ROUND: '/sounds/army/bugle-call.mp3',   // Горн
    FINISH: '/sounds/army/march.mp3',           // Марш
    COUNTDOWN: '/sounds/army/drum-roll.mp3'     // Барабанная дробь
  },
  sexy: {
    START_WORK: '/sounds/sexy/whisper-go.mp3',  // Нежный шепот
    END_WORK: '/sounds/sexy/moan-rest.mp3',     // Вздох облегчения
    END_ROUND: '/sounds/sexy/kiss.mp3',         // Поцелуй
    FINISH: '/sounds/sexy/climax.mp3',          // Финальный вздох
    COUNTDOWN: '/sounds/sexy/heartbeat.mp3'     // Стук сердца
  },
  tabata: {
    START_WORK: '/sounds/tabata/whistle.mp3',   // Классический свисток
    END_WORK: '/sounds/tabata/bell.mp3',        // Гонг
    END_ROUND: '/sounds/tabata/double-bell.mp3',
    FINISH: '/sounds/tabata/applause.mp3',      // Аплодисменты
    COUNTDOWN: '/sounds/tabata/short-beep.mp3'
  },
  classic: {
    START_WORK: '/sounds/classic/whistle.mp3',
    END_WORK: '/sounds/classic/beep-low.mp3',
    END_ROUND: '/sounds/classic/gong.mp3',
    FINISH: '/sounds/classic/fanfare.mp3',
    COUNTDOWN: '/sounds/classic/tick.mp3'
  }
};