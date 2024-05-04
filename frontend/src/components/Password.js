// src/components/PasswordInput.js
import React, { useState } from 'react';
import { InputGroup, Input, InputRightElement, IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Password = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <InputGroup>
            <Input
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                placeholder="パスワードを入力"
            />
            <InputRightElement width="3rem">
                <IconButton
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={toggleShowPassword}
                variant="unstyled"
                aria-label={showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
                size="sm"
                />
            </InputRightElement>
        </InputGroup>
    );
};

export default Password;
