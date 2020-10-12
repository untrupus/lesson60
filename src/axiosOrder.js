import axios from "axios";

const axiosOrder = axios.create({
    baseURL: "http://localhost:8000/messages"
});

export default axiosOrder;