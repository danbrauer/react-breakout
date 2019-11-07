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
            mouseX: 10
        }
    };

    _onMouseMove = ({ evt }) => {
        console.log("event e.evt.clientX", evt.clientX);
        this.setState({
            mouseX: evt.clientX
        });
    };

    render() {
        return (
            <Layer
                onMouseMove={(e) => this._onMouseMove(e)}
            >
                <Field />
                <Ball />
                <Paddle
                    xCoord={this.state.mouseX}
                />
            </Layer>
        );
    }
}

