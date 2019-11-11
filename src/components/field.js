import React from "react";
import { Group, Rect } from "react-konva";

const Field = (props) => {
    return (
        <Group>
            <Rect
                x={0}
                y={0}
                width={props.width}
                height={props.height}
                fill="rgb(0,0,0)"
                shadowBlur={2}
            />
            <Rect
                x={props.borderWidth}
                y={props.borderWidth}
                width={props.width - (props.borderWidth * 2)}
                height={props.height - (props.borderWidth * 2)}
                fill="rgb(255,255,255)"
            />
        </Group>
    );
};

export {
    Field
}