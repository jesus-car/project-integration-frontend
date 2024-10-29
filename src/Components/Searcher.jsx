import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import Button from './Button';
import InputField from './InputField';

const Searcher = () => {

    const [search, setSearch] = useState({
        city: "",
        country: ""
    });

    const handleChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div className='flex flex-col items-end shadow-primary shadow-sm p-5 rounded-lg'>
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
            <Button type="primary" label="Buscar" icon={FaSearch} />
        </div>
    )
}

export default Searcher
