import axios from 'axios';

const PRODUCTS_API = 'http://localhost:4000/api/products';

export const createProduct = async (product) => {
    console.log(product)
    const response = await axios.post(PRODUCTS_API, product)
    debugger
    return response.data;
}

export const findProducts  = async () => {
    const response = await axios.get(PRODUCTS_API);
    return response.data;
}

export const findProductsById  = async (pid)     => {
    const response = await axios.get(`${PRODUCTS_API}/${pid}`)
    return response.data;
}

export const updateProduct = async (product) => {
    const response = await axios
        .put(`${PRODUCTS_API}/${product.product_id}`, product);
    return product;
}
