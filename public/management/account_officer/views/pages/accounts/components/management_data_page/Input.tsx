import React from 'react';
export interface Props {
    label?: string;
    name: string;
    placeholder?: string;
    type?: string;
    value?: string;
    callback?: (e) => void;
    onChange?: (e) => void;
}

const Input: React.FC<Props> = ({
    label,
    name,
    placeholder,
    type,
    value,
    callback,

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
                    onChange={(e) => callback? callback(e) : ''}
                />
            </div>
        </>
    );
};

export default Input;
