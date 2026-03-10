import { useEffect, useState, createContext, useCallback, useMemo } from "react";
import { productService } from "../../services";
import Toast from "react-native-toast-message";
import { handleFirebaseError } from "../../utils/errorHandler";

export const ProductContext = createContext({

    products: [],
    loading: false,
    featuredItems: [],
    lastProduct: null,

    createProduct: async (productData) => { },
    getProductById: (productId) => { },
    deleteProduct: async (productId) => { },
    updateProduct: async (productId, updatedData) => { },

    getProductsByCategory: (categoryId) => [],
    getLastProduct: () => null,
    getLatestProducts: (count) => [],
    loadProduct: (productId) => [],

    refreshProducts: async () => { },
    clearProducts: () => { },
});

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = async () => {
        setLoading(true);
        try {

            const data = await productService.getAll();
            if (!data || data.length === 0) {
                Toast.show({
                    type: 'info',
                    text1: 'No internet connection',
                });
            }
            setProducts(data);
            return { success: true, products: data };
        } catch (error) {
          
            const message = handleFirebaseError(error);
            Toast.show({
                type: 'error',
                text1: 'Load Products Failed',
                text2: message || 'Please try again'
            });
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    };


    const createProduct = async (productData) => {
        setLoading(true);
        try {
            const newProduct = await productService.create(productData);
            setProducts(prev => [newProduct, ...prev]);
            return { success: true, product: newProduct };
        } catch (err) {
            const message = handleFirebaseError(err);
           throw new Error(message)
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (productId, imageUrl) => {
        setLoading(true)

        try {
            await productService.deleteProduct(productId, imageUrl);

            setProducts(prev => prev.filter(p => p.id !== productId));
            return { success: true };
        } catch (err) {
            const message = handleFirebaseError(err);
            throw new Error(message);
        } finally {
            setLoading(false)
        }
    };

    const updateProduct = async (productId, updatedData) => {
        setLoading(true);
        try {

            const updatedProduct = await productService.update(productId, updatedData);



            setProducts(prev => prev.map(p =>
                p.id === productId ? updatedProduct : p
            ));

            return { success: true, products: products };
        } catch (err) {
            const message = handleFirebaseError(err);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    const featuredItems = useMemo(() => {
        return products.filter(p => p.featured === true);
    }, [products]);

    const lastProduct = useMemo(() => {
        if (products.length === 0) return null;
        return [...products].sort((a, b) =>
            new Date(b.created_at) - new Date(a.created_at)
        )[0];
    }, [products]);

    const productsByCategory = useMemo(() => {
        return products.reduce((acc, p) => {
            (acc[p.categoryId] = acc[p.categoryId] || []).push(p);
            return acc;
        }, {});
    }, [products]);

    const getProductsByCategory = useCallback((categoryId) => {
        return productsByCategory[categoryId] || [];
    }, [productsByCategory]);


    const productsById = useMemo(() => {
        return products.reduce((acc, p) => {
            acc[p.id] = p;
            return acc;
        }, {});
    }, [products]);

    const getProductById = useCallback((productId) => {
        return productsById[productId] || null;
    }, [productsById]);




    const contextValue = {
        products,
        loading,
        featuredItems,
        lastProduct,
        getProductById,
        getProductsByCategory,
        createProduct,
        deleteProduct,
        updateProduct,
        refreshProducts: loadAllProducts,
    };

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
}
