import React, { ChangeEvent } from 'react';
import { anyObject } from '../../../../../common_types/object';
import InputImage from './InputImage';
export interface Props {
    label?: string;
    name: string;
    placeholder?: string;
    type: string;
    value?: string | number;
    readonly?: true | false,
    callback?: (e: ChangeEvent, value: string) => void;
}

const Input: React.FC<Props> = ({
    label,
    name,
    placeholder,
    type,
    value,
    callback,
    readonly,
}: Props) => {
    function convertToValidNumber(input) {
        try {
            if (typeof input == 'number') return input;
            const extractedNumber = input.match(/-?\d+(\.\d+)?/g);
            return extractedNumber ? parseFloat(extractedNumber.join('')) : '';
        } catch (error) {
            // console.error(error);
            return '';
        }
    }

    function format_value(type: string, value) {
        if (type == 'date') {
            try {
                return new Date(value).toISOString().substring(0, 10)
            } catch (error) {
                // console.error(error);
                return new Date().toISOString().substring(0, 10)
            }
        }
        else if (type == 'number') {
            return convertToValidNumber(value);
        }
        else {
            return value;
        }
    }

    function input_onchange_handler(e: ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        if (e.target.type == 'number') {
            if (value) {
                value = format_value('number', e.target.value);
            } else {
                value = "";
            }
            e.target.value = value;
        }
        if (callback) {
            callback(e, value);
        }
    }
    return (
        <>
            {
                type != 'file' && (
                    <div>
                        <label htmlFor={name}>
                            {label ? label : name.replaceAll('_', ' ')}
                        </label>
                        {
                            readonly == true ?
                                <div className="form_elements">
                                    <div className="form-control">
                                        {format_value(type, value)}
                                        <input
                                            name={name}
                                            id={name}
                                            type="hidden"
                                            onChange={(e) => input_onchange_handler(e)}
                                            defaultValue={format_value(type, value)}
                                        />
                                    </div>
                                </div>
                                :
                                <div className="form_elements">
                                    <input
                                        type={type ? type : 'text'}
                                        placeholder={
                                            placeholder ? placeholder : name.replaceAll('_', ' ')
                                        }
                                        name={name}
                                        id={name}
                                        onChange={(e) => input_onchange_handler(e)}
                                        defaultValue={format_value(type, value)}
                                    />
                                </div>
                        }
                    </div>
                )
            }
            {
                type == 'file' &&
                (
                    <InputImage
                        name={name}
                        label={label ? label : name.replaceAll('_', ' ')}
                        preview_url={typeof value == 'string' ? value : ''}
                    />
                )
            }
        </>
    );
};

export default Input;
