import React from 'react';
import { FormControl, FormLabel, Textarea, Image } from '@chakra-ui/react';
import ImageUpload from './ImageUpload';  // 画像アップロードコンポーネント

function AdditionalInfoForm({ profile_photo, background_photo, bio, setProfilePhoto, setBackgroundPhoto, setBio }) {
    return (
        <>
            <ImageUpload
                label="プロフィール写真"
                onChange={setProfilePhoto}
                previewUrl={profile_photo}
                alt="Profile Photo Preview"
                mb={4}
                size={{ width: "150px", height: "150px" }}
            />
            <ImageUpload
                label="背景写真"
                onChange={setBackgroundPhoto}
                previewUrl={background_photo}
                alt="Background Photo Preview"
                size={{ width: "1500px", height: "500px" }}
            />
            <FormControl id='bio'>
                <FormLabel>自己紹介</FormLabel>
                <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </FormControl>
        </>
    );
}

export default AdditionalInfoForm;