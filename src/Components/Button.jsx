const Button = ({ type = 'primary', label, icon: Icon, onClick, disabled }) => {
  const baseStyles = 'flex items-center justify-center gap-2 px-4 text-sm md:text-base rounded font-semibold transition duration-300 h-10 w-full';
  const primaryStyles = 'bg-primary text-white hover:bg-primaryHover';
  const secondaryStyles = 'bg-secondary text-white hover:bg-secondaryHover';

  const disabledStyles = 'bg-gray-300 text-gray-500 cursor-not-allowed';
  const buttonStyles = `${baseStyles} ${type === 'primary' ? primaryStyles : secondaryStyles} ${disabled ? disabledStyles : ''}`;


  return (
      <button className={buttonStyles}
              onClick={onClick}
              disabled={disabled}
      >
        {Icon && <Icon size={15} />}
        <span className="text-nowrap">{label}</span>
      </button>
  );
};

export default Button;
