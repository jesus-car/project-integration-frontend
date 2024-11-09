const Button = ({ type = 'primary', label, icon: Icon, onClick }) => {
  const baseStyles = 'flex items-center justify-center gap-2 px-4 rounded font-semibold transition duration-300 h-10 w-full';
  const primaryStyles = 'bg-primary text-white hover:bg-primaryHover';
  const secondaryStyles = 'bg-secondary text-white hover:bg-secondaryHover';

  const buttonStyles = `${baseStyles} ${type === 'primary' ? primaryStyles : secondaryStyles}`;

  return (
      <button className={buttonStyles} onClick={onClick}>
        {Icon && <Icon size={15} />}
        <span className="text-nowrap">{label}</span>
      </button>
  );
};

export default Button;
