import React, { useState, useEffect } from 'react';
import axios from 'axios';

function useAuthRequest() {
    const [authToken, setAuthToken] = useState(null);

    // axiosインスタンスの更新をuseEffect内で行う
    const [authAxios, setAuthAxios] = useState(createAxiosInstance(null));

    useEffect(() => {
        // localStorage からトークンを取得する部分を useEffect 内に移動し、
        // クライアントサイドでのみ実行されるようにする
        const token = localStorage.getItem('token');
        setAuthToken(token);
        setAuthAxios(createAxiosInstance(token)); // authToken 更新時に authAxios も更新
    }, []);

    const updateAxiosInstance = (token) => {
        setAuthAxios(createAxiosInstance(token));
    };

    return { authAxios };  // オブジェクトとして返す
}

// axios インスタンスを生成するヘルパー関数
function createAxiosInstance(token) {
    return axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export default useAuthRequest;
