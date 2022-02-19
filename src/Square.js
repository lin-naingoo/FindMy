import React from 'react';
import PropTypes from 'prop-types';
import './Styles.css';

export function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

Square.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired
};