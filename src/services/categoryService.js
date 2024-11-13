const BASE_URL = 'http://100.29.91.166:8080/roomly-services/api/v1';

export const getAllCategories = async () => {
    try {
        const response = await fetch(`${BASE_URL}/categories/all`);
        if (!response.ok) throw new Error('Error fetching categories');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export const categoryService = {
    getAllCategories
}; 