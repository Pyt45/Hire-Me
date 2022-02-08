import axios from "axios"

export const setTokenHeader = (token) => {
    if (token) {
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['authorization'];
    }
}