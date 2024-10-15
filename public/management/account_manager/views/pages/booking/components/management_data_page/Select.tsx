import React, { ChangeEvent } from 'react';
import { anyObject } from '../../../../../common_types/object';
export interface Props {
    label?: string;
    name: string;
    value?: string | number;
    values: anyObject[];
    readonly?: boolean;
    callback?: (e, value) => void;
}

const Select: React.FC<Props> = ({ label, readonly, name, values, value, callback }: Props) => {
    return (
        <>
            <label>{label ? label : name.replace(/_/g, ' ')}</label>
            <div className="form_elements">
                {
                    readonly ?
                        <div className="form-control">
                            {value}
                            <input type="hidden" defaultValue={value} name={name} />
                        </div>
                        :
                        <select
                            name={name}
                            id={name}
                            defaultValue={value}
                            onChange={(e: any) => callback && callback(e, e.target.value)}>
                            {values.map((i) => (
                                <option value={i.value} key={i.value}>
                                    {i.text ? i.text : i.value}
                                </option>
                            ))}
                        </select>
                }
            </div>
        </>
    );
};

export default Select;
