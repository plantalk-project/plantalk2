import React from 'react';
import { useAtom, PrimitiveAtom } from 'jotai';

interface InputWithIconProps {
  label: string;
  type: 'text' | 'password' | 'mail';
  atom: PrimitiveAtom<string>;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ label, type, atom }) => {
  const [value, setValue] = useAtom(atom);

  return (
    <div className="input-group">
      <label>{label}</label>
      <div className="input-with-icon">
        <input 
          type={type} 
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span className="pencil-icon">✎</span>
      </div>
    </div>
  );
};

export default InputWithIcon; 