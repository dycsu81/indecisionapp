import React from 'react';
import Option from './Option';

const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-header__title">Your Options</h3>
            <button 
                className="button button--link"
                onClick={props.handleDeleteOptions}>
                {props.btnTitle}
            </button>
        </div>
        {props.options.length === 0 && <p className="widget__message">Please add an option to get started!</p>}
        
        {
            props.options.map((optionVal, index) => {
                return <Option 
                    key={optionVal} 
                    optionVal={optionVal} 
                    count={index+1}
                    handleDeleteOption={props.handleDeleteOption}
                />
            })
        }
        
    </div>
);

export default Options;