import React from "react";
import { Rect } from "react-konva";

const updatePaddleLocation = (mouseXCoord, paddleMinX, paddleMaxX) => {
    let xCoord = mouseXCoord;
    if (mouseXCoord > paddleMaxX) {
        xCoord = paddleMaxX;
    } else if (mouseXCoord < paddleMinX) {
        xCoord = paddleMinX
    }
    return xCoord;
};

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
