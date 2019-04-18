import React from 'react';
import '../styles/button.css';

export interface IButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export const Button = (props: IButtonProps) => {
  return (
    <button className='button'
            onClick={props.onClick} 
            disabled={props.disabled}>{props.label}</button>

  );
}