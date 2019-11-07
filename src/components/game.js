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
            paddleWidth: 40,
            paddleHeight: 10,
            paddleX: 0,
            paddleY: 50,
        }
    };

    _onMouseMove = ({ evt }) => {
        console.log("event e.evt.clientX", evt.clientX);
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
                    fieldWidth={this.state.fieldWidth}
                    fieldHeight={this.state.fieldHeight}
                />
                <Paddle
                    fieldWidth={this.state.fieldWidth}
                    fieldHeight={this.state.fieldHeight}
                    paddleX={this.state.paddleX}
                    paddleY={this.state.paddleY}
                    paddleWidth={this.state.paddleWidth}
                    paddleHeight={this.state.paddleHeight}
                />
            </Layer>
        );
    }
}

