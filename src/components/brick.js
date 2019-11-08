import React from "react";
import {Rect} from "react-konva";

const Brick = (props) => (
    <Rect
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        fill={props.color}
    />);

export {
    Brick
}