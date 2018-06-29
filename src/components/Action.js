import React from 'react';

const Action = (props) => (
    <div>
        <button 
            className="big-button"
            onClick={props.handlePick}
            disabled={!props.hasOptions}
        >
            {props.title}
        </button>
    </div>
);

export default Action;