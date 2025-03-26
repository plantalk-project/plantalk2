import React from 'react';
import { useAtom, PrimitiveAtom } from 'jotai';
import './InputWithIcon.css';

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
            <img src="/pencilIcon.png" alt="pencil icon" className='pencil-icon'/>
      </div>
    </div>
  );
};

export default InputWithIcon; 