import api from "./api";

export function getAll() {
    return api.get('/items');
}

export function getOne(mealId) {
    if (!mealId) {
        throw new Error('No ID provided!');
    }

    return api.get(`/items/${mealId}`);
}

export function getAllByCategoryId(categoryId) {
    if (!categoryId) {
        throw new Error('No Category provided!');
    }

    return api.get(`/items?categoryId=${categoryId}`);
}

export function getFeatured() {
    return api.get('/items?featured=true');
}
