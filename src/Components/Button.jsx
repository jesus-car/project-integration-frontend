import React from 'react'

const Button = ({ type = 'primary', label, icon: Icon }) => {
  const baseStyles = 'flex items-center justify-center gap-2 px-4 rounded font-semibold transition duration-300 h-10 w-32';
  const primaryStyles = 'bg-primary text-white hover:bg-primaryHover';
  const secondaryStyles = 'bg-secondary text-white hover:bg-secondaryHover';

  const buttonStyles = `${baseStyles} ${type === 'primary' ? primaryStyles : secondaryStyles}`;


  return (
    <button className={buttonStyles}>
      {Icon && <Icon size={15} />}
      {label}
    </button>
  );
}

export default Button
