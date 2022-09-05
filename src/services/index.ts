import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const service = axios.create({ baseURL });

export { service };
