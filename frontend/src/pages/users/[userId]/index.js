import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const { userId } = router.query;

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:3000/users/${userId}`, {
                method: 'GET',
                credentials: 'include', // クッキーを含めるため
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                setUser(data);
            })
            .catch(err => {
                setError(err.message);
            });
        }
    }, [userId]);

    return (
        <div>
            {user ? (
                <div>
                    <h1>User Profile</h1>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>{error || "Loading..."}</p>
            )}
        </div>
    );
}

export default UserProfile;
