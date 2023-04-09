import axios from 'axios';

const PRODUCTS_API = 'http://localhost:4000/api/buyers';

export const createBuyer = async (buyer) => {
    console.log(buyer)
    const response = await axios.post(PRODUCTS_API, buyer)
    return response.data;
}

export const findBuyers  = async () => {
    const response = await axios.get(PRODUCTS_API);
    return response.data;
}

export const findBuyersById  = async (pid)     => {
    const response = await axios.get(`${PRODUCTS_API}/${pid}`)
    return response.data;
}

export const findBuyerByUsernameAndPassword = async (username, password) => {
    console.log(username)
    console.log(password)
    const response = await axios.get(`${PRODUCTS_API}/authenticate?username=${username}&password=${password}`);
    console.log(response.data)
    return response.data;
}

export const updateBuyer = async (buyer) => {
    const response = await axios
        .put(`${PRODUCTS_API}/${buyer.buyer_id}`, buyer);
    return buyer;
}
