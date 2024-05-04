import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Image, Box } from '@chakra-ui/react';

const ImageUpload = ({ label, onChange, previewUrl, alt, size, isRound = false }) => {
    const [image, setImage] = useState(previewUrl);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result); // ローカルのstateを更新
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <Input
                type="file"
                accept="image/*"
                onChange={handleChange}
            />
            {image && (
                <Box width={size.width} height={size.height} overflow="hidden" mt={2}>
                    <Image
                        src={image}
                        alt={alt}
                        objectFit="cover"
                        borderRadius={isRound ? "full" : "none"}
                    />
                </Box>
            )}
        </FormControl>
    );
};

export default ImageUpload;
