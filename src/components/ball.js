import React, { PureComponent } from "react";
import { Circle } from "react-konva";

export default class Ball extends PureComponent {

    state = {
        x: 0,
        y: 0,
        direction: { x: 0, y: 0 }
    };

    paddleHit = (
        ballX, ballY, deltaY,
        paddleLeft, paddleRight, paddleTop, paddleBottom
    ) => {
        let newDeltaY = deltaY;
        if (ballX >= paddleLeft && ballX <= paddleRight && ballY >= paddleBottom && ballY <= paddleTop ) {
            newDeltaY = -deltaY;
        }
        return newDeltaY;
    };

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

    componentDidMount() {
        const x = this.props.paddleX;
        const y = this.props.paddleY;
        const dirX = Math.floor(Math.random() * this.props.ballSpeed);
        const dirY = this.props.ballSpeed - x;
        this.setState({ x, y, direction: { x: dirX, y: dirY } });
        this.animate();
    }

    animate = () => {
        const { direction, x, y } = this.state;

        if (direction.x !== 0 || direction.y !== 0) {
            const newYDir = this.paddleHit(
                x, y, direction.y,
                this.props.paddleX, (this.props.paddleX + this.props.paddleWidth),
                (this.props.paddleY + this.props.paddleHeight), this.props.paddleY
            );

            const newX = this.newCoord(x, direction.x, this.props.ballMaxX, this.props.ballMinY);
            const newY = this.newCoord(y, newYDir, this.props.ballMaxY, this.props.ballMinY);

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

    renderBall = (x, y, color) => {
        return (
            <Circle
                ref={comp => {
                    this.ball = comp;
                }}
                x={x}
                y={y}
                radius={this.props.ballRadius}
                fill={color}
                shadowBlur={1}
            />
        );
    };

    render() {
        const { x, y } = this.state;
        return this.renderBall(x, y, this.props.ballColor );
    }

    componentWillUnmount() {
        clearTimeout(this.animationTimeout);
    }
}
