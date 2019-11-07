import React, { PureComponent } from "react";
import {Circle, Group, Rect} from "react-konva";
import Konva from "konva";

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
        this.setState({
            x: this.props.paddleX
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
                y={this.props.fieldHeight - 50}
                width={this.props.paddleWidth}
                height={this.props.paddleHeight}
                fill={color}
            />
        );
    }

    componentWillUnmount() {
        clearTimeout(this.animationTimeout);
    }
}
