import React from "react";
import { Rect } from "react-konva";

const updatePaddleLocation = (mouseXCoord, paddleMaxX) =>
    (mouseXCoord > paddleMaxX) ? paddleMaxX : mouseXCoord;

const Paddle = (props) => {
    return (
        <Rect
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            fill={props.color}
        />
    );
};

export {
    Paddle,
    updatePaddleLocation
};
