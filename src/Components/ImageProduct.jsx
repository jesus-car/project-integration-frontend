import { IoClose } from "react-icons/io5";

const ImageProduct = ({ imgs, onClickClose }) => {
    return (
        <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Todas las fotos</h2>
                <button onClick={onClickClose}>
                    <IoClose className="w-6 h-6" />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {imgs.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Property ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageProduct;