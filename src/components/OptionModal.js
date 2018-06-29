import React from 'react';
import Modal from 'react-modal';

const OptionalModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        contentLabel="Selected Option"
        onRequestClose={props.handleSelectOptionClear}
        closeTimeoutMS={200}
        className="modal"
    >
        <h3 className="modal__title">Selected Option</h3>
        {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
        <button 
            className="button"
            onClick={props.handleSelectOptionClear}>OK</button>
    </Modal>
);

export default OptionalModal;