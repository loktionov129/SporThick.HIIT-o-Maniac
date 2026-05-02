import type { PresetWorkout } from "../types";

export const PRESET_WORKOUTS: PresetWorkout[] = [
  {
    name: 'УТРОМ',
    rounds: 3,
    restDuration: 20,
    intensity: 'light',
    exercises: [
      { id: 'm1', name: 'ПРЕСС КАЧАТ', duration: 45 },
      { id: 'm2', name: 'БЕГИТ', duration: 60 },
      { id: 'm3', name: 'ТУРНИК', duration: 30 },
      { id: 'm4', name: 'АНЖУМАНЯ', duration: 45 },
    ]
  },
  {
    name: 'ВЕЧЕРОМ',
    rounds: 5,
    restDuration: 15,
    intensity: 'light',
    exercises: [
      { id: 'v4', name: 'АНЖУМАНЯ', duration: 60 },
      { id: 'v3', name: 'ТУРНИК', duration: 45 },
      { id: 'v1', name: 'ПРЕСС КАЧАТ', duration: 60 },
      { id: 'v2', name: 'БЕГИТ', duration: 90 },
    ]
  },
  {
    name: 'Office Recharge',
    rounds: 2,
    restDuration: 15,
    intensity: 'light',
    exercises: [
      { id: 'p3', name: 'Разминка шеи/плеч', duration: 45 },
      { id: 'p4', name: 'Приседания у стула', duration: 45 }
    ]
  },
  {
    name: 'AMRAP Starter',
    rounds: 1,
    restDuration: 0,
    intensity: 'standard',
    exercises: [
      { id: 'p5', name: 'Берпи', duration: 60 },
      { id: 'p6', name: 'Приседания', duration: 60 },
      { id: 'p7', name: 'Отжимания', duration: 60 }
    ]
  },
  {
    name: 'Full Body EMOM',
    rounds: 4,
    restDuration: 0,
    intensity: 'standard',
    exercises: [
      { id: 'p9', name: 'Берпи', duration: 60 },
      { id: 'p10', name: 'Приседания', duration: 60 },
      { id: 'p11', name: 'Отжимания', duration: 60 },
      { id: 'p12', name: 'Отдых', duration: 60 }
    ]
  },
  {
    name: 'HIIT 30/30',
    rounds: 10,
    restDuration: 30,
    intensity: 'standard',
    exercises: [{ id: 'p8', name: 'Активная фаза', duration: 30 }]
  },
  {
    name: 'HIIT 45/15',
    rounds: 8,
    restDuration: 15,
    intensity: 'extreme',
    exercises: [{ id: 'p16', name: 'Максимальная работа', duration: 45 }]
  },
  {
    name: 'Maniac 30/30',
    rounds: 10,
    restDuration: 30,
    intensity: 'extreme',
    exercises: [{ id: 'p14', name: 'Активная фаза', duration: 30 }]
  },
  {
    name: 'Death by 10s',
    rounds: 12,
    restDuration: 10,
    intensity: 'extreme',
    exercises: [{ id: 'p15', name: 'Взрывной спринт', duration: 10 }]
  },
];
