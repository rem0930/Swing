import React from 'react';
import { Select } from '@chakra-ui/react';

const TemplateSelector = ({ onChange }) => {
    return (
        <Select placeholder="テンプレートを選択" onChange={onChange}>
            {Object.entries(templates).map(([key, description]) => (
                <option key={key} value={key}>
                {description || `${key.charAt(0).toUpperCase() + key.slice(1)} (詳細なし)`}
                </option>
            ))}
        </Select>
    );
};

export default TemplateSelector;