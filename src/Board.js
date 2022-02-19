import React from 'react';
import PropTypes from 'prop-types';
import { Square } from './Square';
import './Styles.css';

export function Board(props) {
    const renderSquare = (index) => {
        return <Square value={props.squares[index]}
                    onClick={() => props.onClick(index)} />;
    };

    return (
        <div>
                <div className="status">{props.goal}</div>
                <div className="status">{props.lives}</div>
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
    );
}

Board.prototype = {
    squares: PropTypes.array.isRequired,
    goal: PropTypes.string.isRequired,
    lives: PropTypes.string.isRequired
};

/*
export class Board extends React.Component {       
    renderSquare(index) {
        return <Square value={this.props.squares[index]}
                    onClick={() => this.props.onClick(index)} />;
    }

    render() {   
        return (
            <div>
                <div className="status">{this.props.goal}</div>
                <div className="status">{this.props.lives}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
*/