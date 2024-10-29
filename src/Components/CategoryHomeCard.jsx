import React from 'react'

const CategoryHomeCard = ({img, category}) => {
    return (
        <div
            className="rounded-lg border border-primary relative h-64 w-full bg-cover bg-center text-white flex items-center justify-center"
            style={{ backgroundImage: `url(${img})` }}
        >
            <div className="rounded-lg absolute inset-0 bg-black opacity-30"></div> {/* Fondo oscuro */}
            <h1 className="relative z-10 text-xl font-semibold">{category}</h1>
        </div>
    );
}

export default CategoryHomeCard
