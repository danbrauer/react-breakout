import React, { Component } from "react";
import { Layer, Circle, Rect } from "react-konva";
import Field from "./field";
import Ball from "./ball";
import Paddle from "./paddle";
import Konva from "konva";

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fieldWidth: 400,
            fieldHeight: 400,
            paddleWidth: 60,
            paddleHeight: 10,
            paddleX: 0,
            paddleY: 50,
            paddleOffset: 50,
            ballSpeed: 15,
            ballRadius: 10
        }
    };

    _onMouseMove = ({ evt }) => {
        // console.log("event e.evt.clientX", evt.clientX);
        this.setState({
            paddleX: evt.clientX
        });
    };

    render() {
        return (
            <Layer
                onMouseMove={(e) => this._onMouseMove(e)}
            >
                <Field
                    fieldWidth={this.state.fieldWidth}
                    fieldHeight={this.state.fieldHeight}
                />
                <Ball
                    ballSpeed={this.state.ballSpeed}
                    ballRadius={this.state.ballRadius}
                    fieldWidth={this.state.fieldWidth}
                    fieldHeight={this.state.fieldHeight}
                    paddleX={this.state.paddleX}
                    paddleY={this.state.fieldHeight - this.state.paddleOffset}
                    paddleWidth={this.state.paddleWidth}
                    paddleHeight={this.state.paddleHeight}
                />
                <Paddle
                    fieldWidth={this.state.fieldWidth}
                    fieldHeight={this.state.fieldHeight}
                    paddleX={this.state.paddleX}
                    paddleY={this.state.fieldHeight - this.state.paddleOffset}
                    paddleWidth={this.state.paddleWidth}
                    paddleHeight={this.state.paddleHeight}
                />
            </Layer>
        );
    }
}

