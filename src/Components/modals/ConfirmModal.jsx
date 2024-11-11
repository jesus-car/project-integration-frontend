import Button from "../Button.jsx";

const ConfirmModal = ({ question, onConfirm, onCancel, isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-96">
                <h2 className="text-xl font-semibold mb-4 text-center">{question}</h2>
                <div className="flex justify-around mt-6">
                    <Button onClick={onCancel} type="secondary" label="Cancelar" />
                    <Button onClick={onConfirm} type="primary" label="Confirmar" />
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
