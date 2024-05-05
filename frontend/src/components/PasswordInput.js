import React from 'react';
import { FormControl, FormLabel, InputGroup, Input, InputRightElement, IconButton, Text } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const PasswordInput = ({ password, setPassword, handleBlur, touched, showPassword, toggleShowPassword }) => {
    return (
        <FormControl isRequired>
            <FormLabel>パスワード</FormLabel>
            <InputGroup size="lg">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="パスワードを入力"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur('password')}
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
            {touched.password && (password === '' ? (
                <Text fontSize="sm" color="red.500">パスワードを入力してください。</Text>
            ) : (
                password.length < 8 && <Text fontSize="sm" color="red.500">パスワードは8文字以上で入力してください。</Text>
            ))}
        </FormControl>
    );
}

export default PasswordInput;