import React from 'react';
import { useAtom, PrimitiveAtom } from 'jotai';

interface InputWithIconProps {
  type: 'username' | 'password' | 'mail'| 'plantname'| 'planttype';
  atom: PrimitiveAtom<string>;
  placeholder: string;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ type, atom, placeholder }) => {
  const [value, setValue] = useAtom(atom);

  return (
    <div className="input-group">
      <div className="input-with-icon">
        <input 
          type={type} 
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
        <span className="pencil-icon">✎</span>
      </div>
    </div>
  );
};

export default InputWithIcon; 