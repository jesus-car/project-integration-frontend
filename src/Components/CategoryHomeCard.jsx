import React from 'react'
import { useNavigate } from 'react-router-dom';

const CategoryHomeCard = ({img, category, categoryId}) => {
    const navigate = useNavigate();

    const handleCategoryClick = () => {
        navigate('/properties', {
            state: {
                appliedFilters: {
                    categoryId: categoryId
                }
            }
        });
    };

    return (
        <div
            onClick={handleCategoryClick}
            className="rounded-lg border border-primary relative h-64 w-full bg-cover bg-center text-white overflow-hidden group cursor-pointer"
            style={{ 
                backgroundImage: `url(${img})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
        >
            <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="relative z-10 text-xl font-semibold text-center px-4 transform group-hover:scale-105 transition-transform">
                    {category}
                </h1>
            </div>
        </div>
    );
}

export default CategoryHomeCard
