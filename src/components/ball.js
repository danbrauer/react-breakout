import React, { PureComponent } from "react";
import Konva from "konva";
import { Circle } from "react-konva";

export default class Ball extends PureComponent {

    MIN_X = 12;
    MIN_Y = 12;

    state = {
        color: Konva.Util.getRandomColor(),
        MAX_X: this.props.fieldWidth - this.MIN_X,
        MAX_Y: this.props.fieldHeight - this.MIN_Y,
        SPEED: 30,
        x: this.MIN_X,
        y: this.MIN_Y,
        direction: { x: 0, y: 0 }
    };

    componentDidMount() {
        const x = Math.floor(Math.random() * this.state.SPEED);
        const y = this.state.SPEED - x;
        this.setState({ direction: { x, y } });
        this.animate();
    }

    newCoord = (val, delta, max, min) => {
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

    animate = () => {
        const { direction, x, y } = this.state;

        if (direction.x !== 0 || direction.y !== 0) {
            const newX = this.newCoord(x, direction.x, this.state.MAX_X, this.MIN_X);
            const newY = this.newCoord(y, direction.y, this.state.MAX_Y, this.MIN_Y);

            this.setState({
                x: newX.val,
                y: newY.val,
                direction: {
                    x: newX.delta,
                    y: newY.delta
                }
            });
        }

        this.animationTimeout = setTimeout(this.animate, 50);
    };

    render() {
        const { color, x, y } = this.state;

        return (
            <Circle
                ref={comp => {
                    this.ball = comp;
                }}
                x={x}
                y={y}
                radius={20}
                fill={color}
                shadowBlur={1}
            />
        );
    }

    componentWillUnmount() {
        clearTimeout(this.animationTimeout);
    }
}
