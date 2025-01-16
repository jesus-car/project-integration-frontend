import { useState, useEffect } from 'react';

const InputField = ({
                        label,
                        name,
                        type = 'text',
                        value,
                        onChange,
                        placeholder,
                        required = false,
                        minLength,
                        maxLength,
                        onValidChange, // Prop para informar al componente padre sobre la validez
                    }) => {
    const [error, setError] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    // Validación del input
    const validateInput = (value) => {
        let errorMessage = '';

        if (required && !value) {
            errorMessage = `${label} es requerido`;
        } else if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMessage = 'Ingresa un correo electrónico válido';
        } else if (type === 'number' && value && isNaN(value)) {
            errorMessage = 'Ingresa un número válido';
        } else if (minLength && value.length < minLength) {
            errorMessage = `${label} debe tener al menos ${minLength} caracteres`;
        } else if (maxLength && value.length > maxLength) {
            errorMessage = `${label} no debe tener más de ${maxLength} caracteres`;
        }

        setError(errorMessage);
        return !errorMessage;
    };

    // Efecto para informar al componente padre si el valor es válido
    useEffect(() => {
        const isValid = validateInput(value);
        onValidChange && onValidChange(isValid);
    }, [value]); // Se ejecuta cada vez que cambia `value`

    // Manejador de cambios
    const handleChange = (e) => {
        const newValue = e.target.value;
        setIsTouched(true);
        onChange(e);
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm" htmlFor={name}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${error && isTouched ? 'border-red-500' : 'focus:border-gray-500'}`}
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                onBlur={() => validateInput(value)}
                placeholder={placeholder}
            />
            {error && isTouched && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default InputField;
