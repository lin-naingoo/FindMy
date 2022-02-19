import React from 'react';
import { Board } from './Board';
import './Styles.css';

const title = "Find My...";
const apple = '🍏';
const bomb = '💣';
const heart = '❤️';
const goal = 3;
const initScore = 0;
const maxSqures = goal * goal;
//const bombs = [1, 3, 7, 8];
const bombs = dropBombs();
const goalStatus = calculateGoal();

function dropBombs () {
    let count = Math.floor(maxSqures / 2);
    let squares = Array(count);

    let index = 0;
    do {
        // get a random from 0 to 8   
        let random = Math.floor(Math.random() * 9);
        // check random number is already in the array
        if (!squares.includes(random)) {
            squares[index] = random;
            index++;
        }
    } while(index < squares.length);

    console.log("Dropped bombs at: " + squares);
    return squares;
}

function calculateGoal () {
    let goalStatus = 'Goal: ';
    for (let i = 0; i < goal; i++){
        goalStatus += apple;
    }

    return goalStatus;  
}

function reloadGame() {
    window.location.reload();
}

export class FindMyGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(maxSqures).fill(null),
                lives: goal,
                scores: initScore
            }],
            stepNumber: 0,
            isTimeTravelOn: true
        };
        this.handleSquareClick = this.handleSquareClick.bind(this);
    }

    handleSquareClick(index) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        // copy a new array
        const squares = current.squares.slice();

        // do nothing if already won, lose or square is defined
        if (this.isWon(current.scores) || this.isLose(current.lives) || squares[index]) {
            return;
        }

        // calculate whether the current is bomb
        let isBomb = false;
        for (let i = 0; i < bombs.length; i++){
            if (index === bombs[i]) {
                isBomb = true;
                break;
            }
        }

        squares[index] = isBomb ? bomb : apple;

        let lives = isBomb ? current.lives - 1 : current.lives;
        let scores = !isBomb ? current.scores + 1 : current.scores;
             
        this.setState({ 
            history: history.concat([{
                squares: squares,
                lives: lives,
                scores: scores
            }]),
            stepNumber: history.length
        });
    }

    isWon(scores) {
        return scores === goal ? true : false;
    }

    isLose(lives) {
        return lives === 0 ? true : false;
    }

    calculateLives(lives) {
        let livesStatus = 'Lives: ';
        for (let i = 0; i < lives; i++){
            livesStatus += heart;
        }

        return livesStatus;
    }

    goToStep(step) {
        this.setState({
            stepNumber: step
        });
    }

    toggleTimeTravelMode() {
        let isTimeTravelOn = !this.state.isTimeTravelOn;
        this.setState({
            isTimeTravelOn: isTimeTravelOn
        });
    }

    render() {       
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        const moves = history.map((move, step) => {
            const desc = step ? 'Go to move #' + step : 'Go to game start';
            return (
                <li key={step}>
                    <button onClick={() => this.goToStep(step)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (this.isWon(current.scores)) {
            status = "You Won!";
        }else if(this.isLose(current.lives)) {
            status = "You Lose!";
        }

        return (
            <div>
                <h1>{title}</h1>
                <p>Game Rule: {apple} - get a score (or) {bomb} - lose a life</p>
                <div className="game">
                    <div className="game-board">
                        <Board squares={current.squares}
                            goal={goalStatus} 
                            lives={this.calculateLives(current.lives)}
                            onClick={(index) => this.handleSquareClick(index)}/>
                        {status &&    
                        <div className="status">{status}<br />
                            <button className="button" onClick={() => reloadGame()}>Play again?</button>
                        </div>
                        }    
                    </div>
                    <div className="game-moves">
                    <label>Time Travel: </label>
                        <input type="checkbox" checked={this.state.isTimeTravelOn}
                            onChange={() => this.toggleTimeTravelMode()} />
                        {this.state.isTimeTravelOn && <ol>{moves}</ol>}
                    </div>  
                </div>         
            </div>           
        );
    }
}