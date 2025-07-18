
import React from 'react';

interface FormInputProps {
    label: string;
    id: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    placeholder?: string;
    rows?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
                                                        label,
                                                        id,
                                                        type,
                                                        value,
                                                        onChange,
                                                        required = false,
                                                        placeholder = '',
                                                        rows
                                                    }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        {type === 'textarea' ? (
            <textarea
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
            />
        ) : (
            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                placeholder={placeholder}
            />
        )}
    </div>
);
