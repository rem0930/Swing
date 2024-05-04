import React, { useState } from 'react';
import { Input, FormControl, FormLabel } from '@chakra-ui/react'

function LocationForms({ onSave }) {
    const [address, setAddress] = useState('');

    const handleSave = async (event) => {
        const apiKey = 'YOUR_API_KEY';
        try {
            const response = await fetch('https://maps.google.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}');
            const data = await response.json();
            if (data.status == 'OK') {
                const { lat, lng } = data.results[0].geometry.location;
                onSave(lat, lng, address); // 緯度、経度、住所を親コンポーネントに渡す
                // ここでサーバーにlatitude, longitude, addressを送る処理を行う
            } else {
                throw new Error ('Geocoding failed:');
            }
        }  catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSave}>
            <FormControl>
                <FormLabel>地域名</FormLabel>
                <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="都市名、地域を入力"
                />
            </FormControl>
        </form>
        );
    }

export default LocationForms;