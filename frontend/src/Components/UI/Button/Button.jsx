import React from 'react';
import cl from './Button.module.scss'
const Button = (props) => {
    return (
        <button className={cl.button} {...props}>{props.children}</button>
    );
};

export default Button;