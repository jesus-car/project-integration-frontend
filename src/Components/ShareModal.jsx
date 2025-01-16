import { Dialog } from '@headlessui/react'
import { IoClose } from 'react-icons/io5'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { MdContentCopy, MdEmail } from 'react-icons/md'
import { FaXmark } from 'react-icons/fa6'
import { RiMessengerLine } from 'react-icons/ri'
import { useToast } from '../contexts/ToastContext'
import { useState } from 'react'
import { formatPrice } from '../utils/formatters'

const ShareModal = ({ isOpen, onClose, property }) => {
    const toast = useToast();
    const [customMessage, setCustomMessage] = useState('');
    
    const getDefaultMessage = () => {
        return `¡Mira esta increíble propiedad en ${property.city.name}! ${property.numRooms} habitaciones, ${property.numBathrooms} baños por ${formatPrice(property.pricePerNight)} la noche.`;
    };

    const getShareMessage = () => {
        return customMessage || getDefaultMessage();
    };
    
    const shareButtons = [
        {
            icon: <MdContentCopy className="w-6 h-6" />,
            label: 'Copiar enlace',
            action: () => {
                const message = `${getShareMessage()}\n${window.location.href}`;
                navigator.clipboard.writeText(message);
                toast.success('Enlace copiado al portapapeles');
            }
        },
        {
            icon: <MdEmail className="w-6 h-6" />,
            label: 'Email',
            action: () => {
                const subject = encodeURIComponent(`Propiedad en ${property.city.name}: ${property.name}`);
                const body = encodeURIComponent(`${getShareMessage()}\n\n${window.location.href}`);
                window.location.href = `mailto:?subject=${subject}&body=${body}`;
            }
        },
        {
            icon: <FaWhatsapp className="w-6 h-6" />,
            label: 'WhatsApp',
            action: () => {
                const text = encodeURIComponent(`${getShareMessage()}\n${window.location.href}`);
                window.open(`https://wa.me/?text=${text}`);
            }
        },
        {
            icon: <RiMessengerLine className="w-6 h-6" />,
            label: 'Messenger',
            action: () => {
                const text = encodeURIComponent(getShareMessage());
                window.open(`https://www.facebook.com/share/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${text}`);
            }
        },
        {
            icon: <FaFacebook className="w-6 h-6" />,
            label: 'Facebook',
            action: () => {
                const text = encodeURIComponent(getShareMessage());
                window.open(`https://www.facebook.com/share/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${text}`);
            }
        },
        {
            icon: <FaTwitter className="w-6 h-6" />,
            label: 'Twitter',
            action: () => {
                const text = encodeURIComponent(getShareMessage());
                const url = encodeURIComponent(window.location.href);
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
            }
        }
    ];

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6">
                    <div className="flex items-center justify-between mb-6">
                        <button
                            onClick={onClose}
                            className="rounded-full p-1 hover:bg-gray-100 transition-colors"
                        >
                            <IoClose className="w-5 h-5" />
                        </button>
                        <Dialog.Title className="text-lg font-semibold text-center flex-1">
                            Compartir este lugar
                        </Dialog.Title>
                        <div className="w-5"></div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <img
                                src={property.mainPhotoUrl}
                                alt={property.name}
                                className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="font-medium">{property.name}</h3>
                                <p className="text-sm text-gray-500 mb-1">
                                    {property.city.name}, {property.city.country.name}
                                </p>
                                <p className="text-sm text-gray-700">
                                    {property.numRooms} habitaciones · {property.numBathrooms} baños
                                </p>
                                <p className="text-sm font-medium">
                                    {formatPrice(property.pricePerNight)} por noche
                                </p>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mensaje personalizado
                            </label>
                            <textarea
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                                placeholder={getDefaultMessage()}
                                className="w-full p-3 border rounded-lg text-sm min-h-[100px] focus:ring-2 focus:ring-[#91b07c] focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 mt-4">
                            {shareButtons.map((button, index) => (
                                <button
                                    key={index}
                                    onClick={button.action}
                                    className="flex items-center gap-3 w-full p-3 hover:bg-gray-100 rounded-lg transition-colors text-left"
                                >
                                    {button.icon}
                                    <span className="text-sm">{button.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ShareModal; 