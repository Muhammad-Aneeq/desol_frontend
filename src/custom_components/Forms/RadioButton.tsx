import React from 'react';

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, checked, onChange }) => {
  return (
    <div>
      <label className='flex gap-2'>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}

        />
        {label}
      </label>
    </div>
  );
}

export default RadioButton;
