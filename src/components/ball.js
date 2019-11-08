import React, { PureComponent } from "react";
import { Circle } from "react-konva";

export default class Ball extends PureComponent {

    renderBall = (x, y, color) => {
        return (
            <Circle
                ref={comp => {
                    this.ball = comp;
                }}
                x={x}
                y={y}
                radius={this.props.radius}
                fill={color}
                shadowBlur={1}
            />
        );
    };

    render() {
        return this.renderBall(this.props.x, this.props.y, this.props.color );
    }

}
