import axios from "axios";

const API_URL = 'https://devsuperior-sds2.herokuapp.com/';
//const API_URL = 'http://10.0.0.103:8080';

export default function fetchOrders() {
    return axios(`${API_URL}/orders`);
}

export function confirmDelivery(orderId: number) {
    return axios.put(`${API_URL}/orders/${orderId}/delivered`);
}