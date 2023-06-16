import React from 'react';
import cl from './TextArea.module.scss'

const TextArea = (props) => {
    return (
        <textarea className={cl.textArea} {...props}>{props.children}</textarea>
    );
};

export default TextArea;