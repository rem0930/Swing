import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

const NameInput = ({ value, onChange, onBlur, touched }) => {
    const isInvalid = touched && value === '';

    return (
        <FormControl isRequired isInvalid={isInvalid}>
            <FormLabel>ユーザー名</FormLabel>
            <Input
                name="user_name"
                placeholder="ユーザー名を入力"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            {touched && value === '' && (
                <Text fontSize="sm" color="red.500">ユーザー名を入力してください。</Text>
            )}
        </FormControl>
    );
};

export default NameInput;