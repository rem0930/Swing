import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

function useAuthRequest() {
    // axiosインスタンスの更新をuseEffect内で行う
    const [authAxios, setAuthAxios] = useState(axios.create({ baseURL: `${apiUrl}` }));

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const newAuthAxios = axios.create({
                baseURL: `${apiUrl}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAuthAxios(newAuthAxios);
        }
    }, []);

    return { authAxios };  // オブジェクトとして返す
}

export default useAuthRequest;
