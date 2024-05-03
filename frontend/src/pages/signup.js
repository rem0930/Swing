import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, useToast, Textarea } from '@chakra-ui/react';

function Signup() {
    const [user_name, setUser_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile_photo, setProfilePhoto] = useState('');
    const [background_photo, setBackgroundPhoto] = useState('');
    const [bio, setBio] = useState('');
    const toast = useToast('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: {
                        user_name,
                        email,
                        password,
                        profile_photo,
                        background_photo,
                        bio
                    }
                }),
            });

            const data = await response.json(); // JSON レスポンスを取得

            if (!response.ok) {
                throw new Error(data.message ||'Signup failed');
            }

            // Signup success login here
            toast({
                title: 'Signup success',
                description: 'Welcome to the platform!',
                status:'success',
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Signup failed',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={user_name} onChange={(e) => setUser_name(e.target.value)} />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <FormControl id='profile_photo'>
                <FormLabel>Profile Photo URL</FormLabel>
                <Input type="text" value={profile_photo} onChange={(e) => setProfilePhoto(e.target.value)} />
            </FormControl>
            <FormControl id='background_photo'>
                <FormLabel>Background Photo URL</FormLabel>
                <Input type="text" value={background_photo} onChange={(e) => setBackgroundPhoto(e.target.value)} />
            </FormControl>
            <FormControl id='bio'>
                <FormLabel>Bio</FormLabel>
                <Textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            </FormControl>
            <Button mt={4} colorScheme="blue" type="submit">Sign up</Button>
        </form>
    );
}

export default Signup;