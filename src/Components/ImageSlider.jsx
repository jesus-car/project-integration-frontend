import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const ImageSlider = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Manejar teclas de flecha
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Manejo de gestos táctiles
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Contenedor principal */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/90 hover:text-white z-50 bg-black/30 p-2 rounded-full transition-all duration-300 hover:bg-black/50"
          aria-label="Cerrar"
        >
          <IoClose size={24} />
        </button>
        
        {/* Botones de navegación */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-4 md:left-8 text-white/90 hover:text-white z-50 bg-black/30 p-3 rounded-full transition-all duration-300 hover:bg-black/50 hover:scale-110"
          aria-label="Anterior"
        >
          <IoIosArrowBack size={24} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 md:right-8 text-white/90 hover:text-white z-50 bg-black/30 p-3 rounded-full transition-all duration-300 hover:bg-black/50 hover:scale-110"
          aria-label="Siguiente"
        >
          <IoIosArrowForward size={24} />
        </button>

        {/* Imagen actual */}
        <div 
          className="w-full h-full flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="max-h-[85vh] w-full md:w-auto object-contain transition-transform duration-500 ease-out"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Indicadores de posición */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-4' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>

        {/* Contador de imágenes */}
        <div className="absolute top-4 left-4 bg-black/30 px-3 py-1 rounded-full text-white/90 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider; 