import React, { Component } from "react";
import {Layer, Group} from "react-konva";
import { Field } from "./field";
import { Ball, updateBallLocation } from "./ball";
import { Paddle, updatePaddleLocation } from "./paddle";
import Konva from "konva";
import { Brick, bricksInitialize } from "./brick";

export default class Game extends Component {

    FIELD_WIDTH = 400;
    FIELD_HEIGHT = 400;
    FIELD_BORDER_WIDTH = 4;
    FIELD_MIN_X = this.FIELD_BORDER_WIDTH;
    FIELD_MIN_Y = this.FIELD_BORDER_WIDTH;
    FIELD_MAX_X = this.FIELD_WIDTH - this.FIELD_BORDER_WIDTH;
    FIELD_MAX_Y = this.FIELD_HEIGHT - this.FIELD_BORDER_WIDTH;

    PADDLE_WIDTH = 60;
    PADDLE_HEIGHT = 10;
    PADDLE_OFFSET = 50;
    PADDLE_COLOR = Konva.Util.getRandomColor();
    PADDLE_MIN_X = this.FIELD_MIN_X;
    PADDLE_MAX_X = this.FIELD_MAX_X - this.PADDLE_WIDTH;

    BALL_COLOR = Konva.Util.getRandomColor();
    BALL_SPEED = 10;
    BALL_RADIUS = 10;
    BALL_MIN_X = this.FIELD_MIN_X + this.BALL_RADIUS;
    BALL_MIN_Y = this.FIELD_MIN_Y + this.BALL_RADIUS;
    BALL_MAX_X = this.FIELD_MAX_X - this.BALL_RADIUS;
    BALL_MAX_Y = this.FIELD_MAX_Y - this.BALL_RADIUS;


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

            bricks: bricksInitialize()
        }
    };

    _onMouseMove = ({ evt }) => {
        this.setState({
            ...this.state,
            paddleX: updatePaddleLocation(evt.clientX, this.PADDLE_MIN_X, this.PADDLE_MAX_X)
        });
    };

    ballAnimate = () => {
        if (this.state.ballDirection.x !== 0 || this.state.ballDirection.y !== 0) {
            const newState = updateBallLocation(this.state, this.BALL_RADIUS, this.PADDLE_WIDTH, this.PADDLE_HEIGHT, this.BALL_MAX_X, this.BALL_MIN_X, this.BALL_MAX_Y, this.BALL_MIN_Y);
            this.setState({
                ...this.state,
                ...newState
            });
            this.ballBrickAnimate();
        }
        this.animationTimeout = setTimeout(this.ballAnimate, 50);
    };

    // returns one brick, if collision occured; null otherwise
    determineBallBrickCollision = (bricks, ballX, ballY) => {
        for (let i=0; i < bricks.length; i++) {
            const brick = bricks[i];
            const brickLeft = brick.x;
            const brickRight = brick.x + brick.width;
            const brickTop = brick.y + brick.height;
            const brickBottom = brick.y;
            if (ballX >= brickLeft && ballX <= brickRight && ballY >= brickBottom && ballY  <= brickTop) {
                // if found, break loop, return early
                return brick;
            }
        }
        return null;
    };

    ballBrickAnimate = () => {
        const collidedBrick = this.determineBallBrickCollision(this.state.bricks, this.state.ballXCoord, this.state.ballYCoord);
        if (collidedBrick) {
            // update ball direction
            const ballDirection = {
                x: this.state.ballDirection.x,
                y: -this.state.ballDirection.y
            };

            // remove brick from list (note filter creates a copy of the array, so state is not mutated here
            const bricks = this.state.bricks.filter( (val) => val.key !== collidedBrick.key);

            this.setState({
                ...this.state,
                bricks,
                ballDirection
            })
        }
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
                key={b.key}
                width={b.width}
                height={b.height}
                x={b.x}
                y={b.y}
                color={b.color}
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

