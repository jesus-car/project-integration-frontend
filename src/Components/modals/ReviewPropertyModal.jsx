import { Dialog } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import Button from '../Button';
import { useToast } from '../../contexts/ToastContext';

const ReviewPropertyModal = ({ isOpen = false, onClose = () => {}, onSubmit, propertyName }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const toast = useToast();

    const handleSubmit = () => {
        if (rating === 0) {
            toast.error('Por favor, selecciona una calificación');
            return;
        }
        if (!comment.trim()) {
            toast.error('Por favor, escribe un comentario');
            return;
        }
        onSubmit({ rating, comment });
        setRating(0);
        setComment('');
        onClose();
    };

    return (
        <Dialog 
            open={isOpen} 
            onClose={onClose} 
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6">
                    <div className="flex items-center justify-between mb-6">
                        <Dialog.Title className="text-lg font-semibold">
                            Valorar propiedad
                        </Dialog.Title>
                        <button
                            onClick={onClose}
                            className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                        >
                            <IoClose className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                            {propertyName}
                        </h3>
                        <div className="flex gap-2 mb-4 justify-center">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <FaStar
                                        key={index}
                                        className={`w-8 h-8 cursor-pointer transition-colors ${
                                            ratingValue <= (hover || rating)
                                                ? 'text-[#91b07c]'
                                                : 'text-gray-300'
                                        }`}
                                        onClick={() => setRating(ratingValue)}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    />
                                );
                            })}
                        </div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Cuéntanos tu experiencia..."
                            className="w-full p-3 border rounded-lg text-sm min-h-[100px] focus:ring-2 focus:ring-[#91b07c] focus:border-transparent"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <Button
                            label="Enviar reseña"
                            type="primary"
                            onClick={handleSubmit}
                        />
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ReviewPropertyModal;
