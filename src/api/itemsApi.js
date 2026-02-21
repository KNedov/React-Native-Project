import api from "./api";

export function getAll() {
    return api.get('/items');
}
export async function getLast() {
    const response= await api.get('/items');
    return response.data[response.data.length - 1]
}

export function getOne(itemId) {
    if (!itemId) {
        throw new Error('No ID provided!');
    }
    return api.get(`/items/${itemId}`);
}
export async function create(item) {
    const result = await api.post('/items', item);

    return result.data;
}

export function getAllByCategoryId(categoryId) {
    if (!categoryId) {
        throw new Error('No Category provided!');
    }

    return api.get(`/items?categoryId=${categoryId}`);
}
export async function deleteItem(itemId) {
    if (!itemId) {
        throw new Error('Cant Delete!');
    }

      const result = await api.delete(`/items/${itemId}`);


    return result.data;
}

export function getFeatured() {
    return api.get('/items?featured=true');
}
