import React from 'react';

interface WorkoutNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const WorkoutNameInput: React.FC<WorkoutNameInputProps> = ({ value, onChange }) => {
  return (
    <section className="">
      <div className="">
        <label className="">
          Название тренировки
        </label>
      </div>
      
      <div className="">
        <div className="" />
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Напр. Взрывной HIIT"
          className=""
        />
        
        <div className="" />
      </div>
    </section>
  );
};
