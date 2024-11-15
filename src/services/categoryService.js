const BASE_URL = 'http://100.29.91.166:8080/roomly-services/api/v1';

export const getCategoryById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/categories/${id}`);
        if (!response.ok) throw new Error('Error al obtener la categoría');
        const data = await response.json();
        return {
            id: data.id,
            name: data.title,
            description: data.description,
            imageUrl: data.imageUrl
        };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const getAllCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/categories/all`);
        if (!response.ok) throw new Error('Error al obtener las categorías');
        const data = await response.json();
        return data.map(category => ({
            id: category.id,
            name: category.title,
            description: category.description,
            imageUrl: category.imageUrl
        }));
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const categoryService = {
    getCategoryById,
    getAllCategories
}; 