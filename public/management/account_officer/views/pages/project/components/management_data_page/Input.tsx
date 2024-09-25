import React from 'react';

export interface Props {
    label?: string;
    name: string;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({
    label,
    name,
    placeholder,
    type,
    value,
    onChange,
}: Props) => {
    return (
        <>
            <label htmlFor={name}>
                {label ? label : name.replaceAll('_', ' ')}
            </label>
            <div className="form_elements">
                <input
                    type={type ? type : 'text'}
                    placeholder={
                        placeholder ? placeholder : name.replaceAll('_', ' ')
                    }
                    name={name}
                    id={name}
                    defaultValue={value}
                    onChange={onChange}
                />
            </div>
        </>
    );
};

export default Input;
