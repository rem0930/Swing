import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useAuthRequest() {
    // axiosインスタンスの更新をuseEffect内で行う
    const [authAxios, setAuthAxios] = useState(axios.create({ baseURL: 'http://localhost:3000' }));

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const newAuthAxios = axios.create({
                baseURL: 'http://localhost:3000',
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
