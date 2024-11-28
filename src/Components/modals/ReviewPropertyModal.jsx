import Button from "../Button.jsx";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

const ReviewPropertyModal = ({ onConfirm, onCancel, isOpen }) => {
    const maxCommentLength = 500;

    const [reviewForm, setReviewForm] = useState({
        rating: 0,
        comment: ""
    });

    const [error, setError] = useState("");

    const handleStarClick = (rating) => {
        setReviewForm({ ...reviewForm, rating });
        setError("");
    };

    const handleConfirm = () => {
        if (reviewForm.rating === 0) {
            setError("Por favor selecciona al menos una estrella para calificar");
            return;
        }

        onConfirm(reviewForm);
    };

    useEffect(() => {
        if (!isOpen) {
            setReviewForm({
                rating: 0,
                comment: ""
            });
            setError("");
        }
    }, [isOpen]);

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
                isOpen ? "" : "hidden"
            }`}
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-96">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Califica tu experiencia en este lugar
                </h2>
                <div className="mt-6">
                    <div className="flex justify-center items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => handleStarClick(star)}
                                className={`text-3xl ${
                                    reviewForm.rating >= star
                                        ? "text-yellow-500"
                                        : "text-gray-400"
                                }`}
                            >
                                <FaStar />
                            </button>
                        ))}
                    </div>
                    {error && (
                        <p className="text-sm text-red-500 mt-2 text-center">
                            {error}
                        </p>
                    )}
                </div>
                <div className="mt-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Comentarios
                    </label>
                    <textarea
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                        name="comment"
                        placeholder="Escribe aquí tus comentarios si lo deseas"
                        maxLength={maxCommentLength}
                        value={reviewForm.comment}
                        onChange={(e) =>
                            setReviewForm({ ...reviewForm, comment: e.target.value })
                        }
                    />
                    <p className="text-sm text-gray-500 mt-1 text-right">
                        {reviewForm.comment.length}/{maxCommentLength}
                    </p>
                </div>
                <div className="flex gap-10 mt-6">
                    <Button onClick={onCancel} type="secondary" label="Cancelar" />
                    <Button
                        onClick={handleConfirm}
                        type="primary"
                        label="Confirmar"
                    />
                </div>
            </div>
        </div>
    );
};

export default ReviewPropertyModal;
