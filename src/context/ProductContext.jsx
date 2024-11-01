import { createContext, useState, useContext, useEffect } from 'react';
import { properties } from '../utils/fakeData'; // Importamos los datos iniciales

const ProductContext = createContext();

export function ProductProvider({ children }) {
  // Inicializamos con los datos de fakeData
  const [products, setProducts] = useState(() => {
    // Convertir los datos iniciales al formato que necesitamos
    return properties.map(property => ({
      id: property.id.toString(),
      name: property.title,
      description: property.description,
      price: property.price,
      category: property.category || 'casa', // valor por defecto
      status: 'Disponible',
      images: property.images, // Asumiendo que ya son URLs
      location: property.location,
      features: property.features,
      // Otros campos que quieras mantener de fakeData
    }));
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const addProduct = async (newProduct) => {
    try {
      // Convertir las imágenes a Base64
      const imagePromises = newProduct.images.map(convertToBase64);
      const base64Images = await Promise.all(imagePromises);

      const productWithId = {
        ...newProduct,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'Disponible',
        images: base64Images,
      };
      setProducts(prevProducts => [...prevProducts, productWithId]);
    } catch (error) {
      console.error('Error al procesar las imágenes:', error);
      throw error;
    }
  };

  const updateProduct = async (productId, updatedData) => {
    try {
      let processedImages = updatedData.images;

      // Si hay nuevas imágenes (File objects), convertirlas a Base64
      if (updatedData.images.some(img => img instanceof File)) {
        const imagePromises = updatedData.images.map(img => 
          img instanceof File ? convertToBase64(img) : img
        );
        processedImages = await Promise.all(imagePromises);
      }

      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId
            ? { ...product, ...updatedData, images: processedImages }
            : product
        )
      );
    } catch (error) {
      console.error('Error al actualizar las imágenes:', error);
      throw error;
    }
  };

  const deleteProduct = (productId) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct, 
      deleteProduct, 
      updateProduct 
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);