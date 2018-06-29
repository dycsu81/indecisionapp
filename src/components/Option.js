import React from 'react';

const Option = (props) => (
    <div className="option">
        <p className="option__text">{props.count}. {props.optionVal}</p>
        <button 
            className="button button--link"
            onClick={(e) => {
                props.handleDeleteOption(props.optionVal);
            }}
        > 
        Remove
        </button>
    </div>
);

export default Option;