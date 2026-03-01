import { useState, useCallback } from "react";

const initialFormState = {
    name: "",
    color: "",
    description: "",
    price: "",
    discount: "",
    featured: false,
    imageUrl: "",
    categoryId: "Phones",
};

export const useFormValidation = (initialErrors = {}) => {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState(initialErrors);

    const handleFieldChange = useCallback((field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));

        setErrors((prev) => {
            if (!prev[field]) return prev;
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    }, []);

    const resetForm = useCallback(() => {
        setFormData(initialFormState);
        setErrors({});
    }, []);

      const loadProductForm = useCallback((product) => {
        if (!product) return;
        
        setFormData({
            name: product.name || '',
            color: product.color || '',
            description: product.description || '',
            price: product.price?.toString() || '',
            discount: product.discount?.toString() || '0',
            featured: product.featured || false,
            imageUrl: product.imageUrl || '',
            categoryId: product.categoryId || 'Phones',
        });
        
        setErrors({});
    }, []);

    const validateProductForm = useCallback((formData, image = null) => {
        const newErrors = {};

        if (!formData.name?.trim()) {
            newErrors.name = "Product name is required";
        } else if (formData.name.length < 3) {
            newErrors.name = "Product name must be at least 3 characters";
        } else if (formData.name.length > 50) {
            newErrors.name = "Product name must be less than 50 characters";
        }

        if (!formData.color?.trim()) {
            newErrors.color = "Color is required";
        } else if (formData.color.length < 3) {
            newErrors.color = "Color must be at least 3 characters";
        }

        if (!formData.description?.trim()) {
            newErrors.description = "Description is required";
        } else if (formData.description.length < 20) {
            newErrors.description =
                "Description must be at least 20 characters";
        } else if (formData.description.length > 500) {
            newErrors.description =
                "Description must be less than 500 characters";
        }

        if (!formData.price) {
            newErrors.price = "Price is required";
        } else if (isNaN(formData.price)) {
            newErrors.price = "Price must be a valid number";
        } else if (parseFloat(formData.price) <= 0) {
            newErrors.price = "Price must be greater than 0";
        }

       
        const discountValue = formData.discount?.trim() || "";

        if (!discountValue) {
            newErrors.discount = "Discount is required";
        } else {
            const discountFloat = parseFloat(discountValue);
            const discountInt = parseInt(discountValue, 10);

            if (isNaN(discountFloat)) {
                newErrors.discount = "Discount must be a valid number";
            } else if (discountFloat !== discountInt) {
                newErrors.discount =
                    "Discount must be a whole number (no decimals)";
            } else if (discountInt < 0 || discountInt > 100) {
                newErrors.discount = "Discount must be between 0 and 100";
            }
        }

        if (!formData.categoryId) {
            newErrors.categoryId = "Please select a category";
        }

        if (!formData.imageUrl && !image) {
            newErrors.imageUrl = "Image URL is required";
            newErrors.image = "Please select an image";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, []);

    const clearError = useCallback((fieldName) => {
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[fieldName];
            return newErrors;
        });
    }, []);

    const clearAllErrors = useCallback(() => {
        setErrors({});
    }, []);

    return {
        formData,
        handleFieldChange,
        resetForm,
        loadProductForm,
        errors,
        validateProductForm,
        clearError,
        clearAllErrors,
      
    };
};
