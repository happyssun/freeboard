// components/Input.tsx
import React, { ChangeEvent } from "react";
import * as styles from "../../../../styles/sign";

interface InputProps {
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ type, placeholder, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.currentTarget.value);
  };

  return (
    <styles.Input
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default Input;
