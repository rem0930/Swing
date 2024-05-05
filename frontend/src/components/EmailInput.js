import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

const EmailInput = ({ email, setEmail, handleBlur, touched, validateEmail }) => {
    return (
        <FormControl isRequired>
            <FormLabel>メールアドレス</FormLabel>
            <Input
                type="email"
                placeholder="メールアドレスを入力"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                size="lg"
                borderColor="gray.300"
            />
            {touched.email && (email === '' ? (
                <Text fontSize="sm" color="red.500">メールアドレスを入力してください。</Text>
            ) : (
                !validateEmail(email) && <Text fontSize="sm" color="red.500">メールアドレスを正しく入力してください。</Text>
            ))}
        </FormControl>
    );
}

export default EmailInput;