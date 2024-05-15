// pages/api/users/[id].js
import axios from 'axios';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
    // ユーザーデータの取得
        try {
            const response = await axios.get(`http://localhost:3000/users/${id}`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user data' });
        }
    } else if (req.method === 'PUT') {
        // ユーザーデータの更新
        try {
            const response = await axios.put(`http://localhost:3000/users/${id}`, req.body);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Error updating user data' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
