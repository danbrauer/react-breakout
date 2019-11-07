import React, { PureComponent } from "react";
import {Circle, Group, Rect} from "react-konva";
import { WIDTH, HEIGHT } from "./field";
import Konva from "konva";

export const PADDLE_WIDTH = 40;
export const PADDLE_HEIGHT = 10;
export const PADDLE_Y = HEIGHT - 50;

export default class Paddle extends PureComponent {

    state = {
        color: Konva.Util.getRandomColor(),
        x: 10,
    };

    componentDidMount() {
        const x = 10;
        this.setState({ x });
        this.animate();
    }

    animate = () => {
        const { x } = this.state;
        let newX = x + 1; // default, move one pixel...
        if (this.props.xCoord)
            newX = this.props.xCoord

        this.setState({
            x: newX
        });

        this.animationTimeout = setTimeout(this.animate, 50);
    };

    render() {
        const { color, x } = this.state;
        return (
            <Rect
                // onMouseMove={(e) => this._onMouseMove(e)}
                ref={comp => {
                    this.paddle = comp;
                }}
                x={x}
                y={PADDLE_Y}
                width={PADDLE_WIDTH}
                height={PADDLE_HEIGHT}
                fill={color}
            />
        );
    }

    componentWillUnmount() {
        clearTimeout(this.animationTimeout);
    }
}
