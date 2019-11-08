import React from "react";
import { Circle } from "react-konva";

export const Ball = (props) => {
    return (
        <Circle
            x={props.x}
            y={props.y}
            radius={props.radius}
            fill={props.color}
            shadowBlur={1}
        />
    );
};
