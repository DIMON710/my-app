import React from 'react';
import cl from './Select.module.scss'
const Select = ({options, ...props}) => {
    return (
        <select {...props} className={cl.select}>
            {options.map(item => (
                <option key={item.value} value={item.value}>{item.name}</option>
            ))}
        </select>
    );
};

export default Select;