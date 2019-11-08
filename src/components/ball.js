import React, { PureComponent } from "react";
import Konva from "konva";
import { Circle } from "react-konva";

export default class Ball extends PureComponent {

    state = {
        color: Konva.Util.getRandomColor(),
        x: this.props.paddleX,
        y: this.props.paddleY,
        direction: { x: 0, y: 0 }
    };

    componentDidMount() {
        const x = Math.floor(Math.random() * this.props.ballSpeed);
        const y = this.props.ballSpeed - x;
        this.setState({ direction: { x, y } });
        this.animate();
    }
    
    newDirectionIfPaddleHitOccurs = (
        ballX, deltaX, ballY, deltaY,
        paddleLeft, paddleRight, paddleTop, paddleBottom
    ) => {
        let newDeltaY = deltaY;
        if (ballX >= paddleLeft && ballX <= paddleRight && ballY >= paddleBottom && ballY <= paddleTop ) {
            console.log("************************HIT");
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

    animate = () => {
        const { direction, x, y } = this.state;

        if (direction.x !== 0 || direction.y !== 0) {
            const newYDir = this.newDirectionIfPaddleHitOccurs(
                x, direction.x, y, direction.y,
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

    render() {
        const { color, x, y } = this.state;

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
    }

    componentWillUnmount() {
        clearTimeout(this.animationTimeout);
    }
}
