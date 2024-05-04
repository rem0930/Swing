import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Image, Box } from '@chakra-ui/react';

const ImageUpload = ({ label, onChange, previewUrl, alt, size }) => {
    const handleChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            onChange(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <Input
                type="file"
                accept="image/*"
                onChange={handleChange}
            />
            {previewUrl && (
                <Box width={size.width} height={size.height} overflow="hidden">
                    <Image src={previewUrl} alt={alt} objectFit="cover" />
                </Box>
            )}
        </FormControl>
    );
};

export default ImageUpload;
