import React, { Component } from "react";
import {Layer, Group} from "react-konva";
import { Field } from "./field";
import { Ball, updateBallLocation } from "./ball";
import { Paddle, updatePaddleLocation } from "./paddle";
import Konva from "konva";
import Brick from "./brick";

export default class Game extends Component {

    FIELD_WIDTH = 400;
    FIELD_HEIGHT = 400;
    FIELD_BORDER_WIDTH = 4;

    PADDLE_WIDTH = 60;
    PADDLE_HEIGHT = 10;
    PADDLE_OFFSET = 50;
    PADDLE_COLOR = Konva.Util.getRandomColor();
    PADDLE_MAX_X = this.FIELD_WIDTH - this.PADDLE_WIDTH;

    BALL_MIN_X = 12;
    BALL_MIN_Y = 12;
    BALL_MAX_X = this.FIELD_WIDTH - this.BALL_MIN_X;
    BALL_MAX_Y = this.FIELD_HEIGHT - this.BALL_MIN_Y;
    BALL_COLOR = Konva.Util.getRandomColor();
    BALL_SPEED = 10;
    BALL_RADIUS = 10;

    constructor(props) {
        super(props);
        this.state = {
            paddleX: 0,
            paddleY: this.FIELD_HEIGHT - this.PADDLE_OFFSET,

            ballXCoord: 0,
            ballYCoord: 0,
            ballDirection: {
                x: 0,
                y: 0
            },

            brickWidth: 380,
            brickHeight: 10,
            bricks: [
                { key: 1, x: 10, y: 10 },
                { key: 2, x: 10, y: 20 }
            ]
        }
    };

    _onMouseMove = ({ evt }) => {
        this.setState({
            ...this.state,
            paddleX: updatePaddleLocation(evt.clientX, this.PADDLE_MAX_X)
        });
    };

    ballAnimate = () => {
        if (this.state.ballDirection.x !== 0 || this.state.ballDirection.y !== 0) {
            const newState = updateBallLocation(this.state, this.PADDLE_WIDTH, this.PADDLE_HEIGHT, this.BALL_MAX_X, this.BALL_MIN_X, this.BALL_MAX_Y, this.BALL_MIN_Y);
            this.setState({
                ...this.state,
                ...newState
            });
        }
        this.animationTimeout = setTimeout(this.ballAnimate, 50);
    };

    componentDidMount() {
        const x = this.state.paddleX;
        const y = this.state.paddleY;
        const dirX = Math.floor(Math.random() * this.BALL_SPEED);
        const dirY = this.BALL_SPEED - x;

        this.setState({
            ...this.state,
            ballDirection: {
                x: dirX,
                y: dirY
            },
            ballXCoord: x,
            ballYCoord: y,
        });

        this.ballAnimate();
    }

    componentWillUnmount() {
        clearTimeout(this.animationTimeout);
    }



    render() {

        const bricks = this.state.bricks.map(b => {
            return <Brick
                brickWidth={this.state.brickWidth}
                brickHeight={this.state.brickHeight}
                brickX={b.x}
                brickY={b.y}
            />
        });

        return (
            <Layer
                onMouseMove={(e) => this._onMouseMove(e)}
            >
                <Field
                    width={this.FIELD_WIDTH}
                    height={this.FIELD_HEIGHT}
                    borderWidth={this.FIELD_BORDER_WIDTH}
                />
                <Ball
                    color={this.BALL_COLOR}
                    radius={this.BALL_RADIUS}
                    x={this.state.ballXCoord}
                    y={this.state.ballYCoord}
                />
                <Paddle
                    color={this.PADDLE_COLOR}
                    x={this.state.paddleX}
                    y={this.state.paddleY}
                    width={this.PADDLE_WIDTH}
                    height={this.PADDLE_HEIGHT}
                />
                <Group>{bricks}</Group>
            </Layer>
        );
    }
}

