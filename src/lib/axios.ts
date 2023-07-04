import axios from "axios";

export const api = axios.create({
    baseURL: 'https://ignite-call-ten-tawny.vercel.app/api'
})