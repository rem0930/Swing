import React from 'react';
import { FormControl, FormLabel, InputGroup, Input, InputRightElement, IconButton, Text } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const PasswordInput = ({ value, onChange, onBlur, touched, showPassword, toggleShowPassword }) => {
    const isInvalid = touched && (value === '' || value.length < 8);
        return (
            <FormControl isRequired isInvalid={isInvalid}>
                <FormLabel>パスワード</FormLabel>
                <InputGroup size="lg">
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="パスワードを入力"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        borderColor="gray.300"
                    />
                    <InputRightElement>
                    <IconButton
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={toggleShowPassword}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        size="sm"
                    />
                </InputRightElement>
            </InputGroup>
            {touched && (
                <>
                    {value === '' && (
                        <Text fontSize="sm" color="red.500">パスワードを入力してください。</Text>
                    )}
                    {value.length < 8 && value !== '' && (
                        <Text fontSize="sm" color="red.500">パスワードは8文字以上で入力してください。</Text>
                    )}
                </>
            )}
        </FormControl>
    );
};

export default PasswordInput;