import axios from "axios";

export const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Acess-Control-Alow-Origin': '*'
    }
})