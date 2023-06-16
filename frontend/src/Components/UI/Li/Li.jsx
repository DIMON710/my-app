import React from 'react';
import './Li.scss'
import {Link} from "react-router-dom";

const Li = (props) => {
    return (
        <li>
            <Link className='link' {...props} ref={props.myref} to={props.link}>{props.children}</Link>
        </li>
    );
};

export default Li;