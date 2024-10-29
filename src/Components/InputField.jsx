import React from 'react'

const InputField = ({ label, name, type = 'text', value, onChange, placeholder }) => {
    return (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm" htmlFor={name}>
            {label}
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-gray-500 focus:outline-none"
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
      );
}

export default InputField
