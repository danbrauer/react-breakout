import React from "react";
import { Group, Rect } from "react-konva";

export const Field = (props) => {
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
                x={2}
                y={2}
                width={props.width - props.borderWidth}
                height={props.height - props.borderWidth}
                fill="rgb(255,255,255)"
            />
        </Group>
    );
};
