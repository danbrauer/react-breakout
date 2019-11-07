import React, { PureComponent } from "react";
import {Rect} from "react-konva";
import Konva from "konva";

export default class Brick extends PureComponent {

    state = {
        color: Konva.Util.getRandomColor(),
        x: 10,
        y: 10,
    };

    componentDidMount() {
        const x = 10;
        const y = 10;
        this.setState({ x, y });
        this.animate();
    }

    animate = () => {
        // this.setState({
        //     x: this.props.paddleX
        // });

        this.animationTimeout = setTimeout(this.animate, 50);
    };

    render() {
        const { x, y, color } = this.state;
        return (
            <Rect
                ref={comp => {
                    this.brick = comp;
                }}
                x={this.props.brickX}
                y={this.props.brickY}
                width={this.props.brickWidth}
                height={this.props.brickHeight}
                fill={color}
            />
        );
    }

    componentWillUnmount() {
        clearTimeout(this.animationTimeout);
    }
}
