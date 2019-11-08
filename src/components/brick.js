import React from "react";
import {Rect} from "react-konva";
import Konva from "konva";

const BRICK_WIDTH = 42;
const BRICK_HEIGHT = 10;


// const MIN_WIDTH = 20;
// const MAX_WIDTH = 70;
// const width = () => Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH + 1) + MIN_WIDTH);
//
// // returns a row of bricks
// const rowOfBricks = (rowMaxWidth, brickWidthFunc = this.width) => {
//
// };


const rowOfBricks = () => {
    let bricks = [];
    let i = 0;
    const x = () => bricks.length > 0 ? bricks[bricks.length-1].x + BRICK_WIDTH : 10;

    while (i < 9) {
        const brick = {
            key: i,
            x: x(),
            y: 10,
            width: BRICK_WIDTH,
            height: BRICK_HEIGHT,
            color: Konva.Util.getRandomColor()
        };
        bricks = [...bricks, brick];
        i++;
    }
    return bricks;
};

const bricksInitialize = () => {
    const bricks = rowOfBricks();
    return bricks;
};

const Brick = (props) => (
    <Rect
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        fill={props.color}
    />);

export {
    Brick,
    bricksInitialize
}