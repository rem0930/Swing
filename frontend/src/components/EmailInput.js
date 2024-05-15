import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

const EmailInput = ({ value, onChange, onBlur, touched, validateEmail }) => {
    const isInvalid = touched && (value === '' || !validateEmail(value));

    return (
        <FormControl isRequired isInvalid={isInvalid}>
            <FormLabel>メールアドレス</FormLabel>
            <Input
                type="email"
                name='email'
                placeholder="メールアドレスを入力"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                size="lg"
                borderColor="gray.300"
            />
            {touched && (
                <>
                    {value === '' && (
                        <Text fontSize="sm" color="red.500">メールアドレスを入力してください。</Text>
                    )}
                    {!validateEmail(value) && value !== '' && (
                        <Text fontSize="sm" color="red.500">メールアドレスを正しく入力してください。</Text>
                    )}
                </>
            )}
        </FormControl>
    );
}

export default EmailInput;