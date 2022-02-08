import { connect } from "socket.io-client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const s = connect('http://localhost:4000', { query: Cookies.get('token') });

export const useSocket = () => {
    const [socket, setSocket] = useState(s);

    useEffect(() => {
        socket.on('user_connected', (userId) => {
            // do something
        });
        socket.on('user_disconnected', (userId) => {
            // do something
        })
    }, []);
    return [socket, setSocket];
}