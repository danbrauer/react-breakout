import React, { Component } from "react";
import {Layer, Group} from "react-konva";
import Field from "./field";
import Ball from "./ball";
import Paddle from "./paddle";
import Konva from "konva";
import Brick from "./brick";

export default class Game extends Component {

    FIELD_WIDTH = 400;
    FIELD_HEIGHT = 400;

    PADDLE_WIDTH = 60;
    PADDLE_HEIGHT = 10;
    PADDLE_OFFSET = 50;

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
            // paddle X coordinate matches mouse X coordinate
            paddleX: evt.clientX
        });
    };

    ballInvertYDirectionOnPaddleHit = (
        ballX, ballY, deltaY,
        paddleLeft, paddleRight, paddleTop, paddleBottom
    ) => {
        let newDeltaY = deltaY;
        if (ballX >= paddleLeft && ballX <= paddleRight && ballY >= paddleBottom && ballY <= paddleTop ) {
            newDeltaY = -deltaY;
        }
        return newDeltaY;
    };

    ballNewCoord = (val, delta, max, min) => {
        let newVal = val + delta;
        let newDelta = delta;

        if (newVal > max || newVal < min) {
            newDelta = -delta;
        }

        if (newVal < min) {
            newVal = min - newVal;
        }
        if (newVal > max) {
            newVal = newVal - (newVal - max);
        }

        return { val: newVal, delta: newDelta };
    };

    ballAnimate = () => {
        const { ballDirection, ballXCoord, ballYCoord } = this.state;

        if (ballDirection.x !== 0 || ballDirection.y !== 0) {
            const newYDir = this.ballInvertYDirectionOnPaddleHit(
                ballXCoord, ballYCoord, ballDirection.y,
                this.state.paddleX, (this.state.paddleX + this.PADDLE_WIDTH),
                (this.state.paddleY + this.PADDLE_HEIGHT), this.state.paddleY
            );

            const newX = this.ballNewCoord(ballXCoord, ballDirection.x, this.BALL_MAX_X, this.BALL_MIN_X);
            const newY = this.ballNewCoord(ballYCoord, newYDir, this.BALL_MAX_Y, this.BALL_MIN_Y);

            this.setState({
                ...this.state,
                ballDirection: {
                    x: newX.delta,
                    y: newY.delta
                },
                ballXCoord: newX.val,
                ballYCoord: newY.val
            });
        }

        this.animationTimeout = setTimeout(this.ballAnimate, 50);
    };

    //////////////// BALL ANIMATION END










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
                    fieldWidth={this.FIELD_WIDTH}
                    fieldHeight={this.FIELD_HEIGHT}
                />
                <Ball
                    color={this.BALL_COLOR}
                    radius={this.BALL_RADIUS}
                    x={this.state.ballXCoord}
                    y={this.state.ballYCoord}
                />
                <Paddle
                    fieldWidth={this.state.fieldWidth}
                    fieldHeight={this.state.fieldHeight}
                    paddleX={this.state.paddleX}
                    paddleY={this.state.paddleY}
                    paddleWidth={this.PADDLE_WIDTH}
                    paddleHeight={this.PADDLE_HEIGHT}
                />
                <Group>{bricks}</Group>
            </Layer>
        );
    }
}

