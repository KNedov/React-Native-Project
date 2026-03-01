
import { useEffect } from 'react';

export const useLoadProductForEdit = (
    productId,
    isEditMode,
    getProductById,
    loadProductForm
) => {
    useEffect(() => {
        if (!isEditMode || !productId) return;

        const product = getProductById(productId);
        loadProductForm(product);

    }, [isEditMode, productId,]);
};