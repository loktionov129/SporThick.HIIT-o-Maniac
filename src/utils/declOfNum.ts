/**
 * Склоняет слова в зависимости от числа (русский язык).
 * @param value - Числовое значение
 * @param words - Массив из трех форм: [1, 2, 5] 
 * @example declOfNum(5, ['яблоко', 'яблока', 'яблок']) => 'яблок'
 */
export const declOfNum = (value: number, words: [string, string, string]): string => {
  const absValue = Math.abs(value) % 100;
  const lastDigit = absValue % 10;

  if (absValue > 10 && absValue < 20) return words[2];
  if (lastDigit > 1 && lastDigit < 5) return words[1];
  if (lastDigit === 1) return words[0];

  return words[2];
};
