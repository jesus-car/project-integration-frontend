import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Button from './Button';
import InputField from './InputField';

const Searcher = () => {
    const navigate = useNavigate(); 
    const [search, setSearch] = useState({
        city: "",
        country: ""
    });

    const handleChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = () => {
        navigate(`/properties?city=${search.city}&country=${search.country}`);
    };

    return (
        <div className='flex flex-col items-end shadow-md p-5 rounded-lg'>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
                <InputField
                    label="Ciudad"
                    name="city"
                    type="text"
                    value={search.city}
                    onChange={handleChange}
                    placeholder="Busca por ciudad"
                />
                <InputField
                    label="País"
                    name="country"
                    type="text"
                    value={search.country}
                    onChange={handleChange}
                    placeholder="Busca por país"
                />
            </div>
            {/* <Button type="primary" label="Buscar" icon={FaSearch} onClick={handleSearch} /> Añade onClick */}
            <button className='flex items-center justify-center gap-2 px-4 rounded font-semibold transition duration-300 h-10 w-32 bg-primary text-white hover:bg-primaryHover' onClick={handleSearch}>Buscar</button>
        </div>
    );
};

export default Searcher;
