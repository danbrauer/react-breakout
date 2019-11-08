import React from "react";
import { Rect } from "react-konva";

export const Paddle = (props) => {
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

