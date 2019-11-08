import React from "react";
import {Rect} from "react-konva";
import Konva from "konva";

const BRICK_OFFSET = 20;
const BRICK_WIDTH = 42;
const BRICK_HEIGHT = 10;
const NUMBER_OF_ROWS = 4;


// const MIN_WIDTH = 20;
// const MAX_WIDTH = 70;
// const width = () => Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH + 1) + MIN_WIDTH);
//
// // returns a row of bricks
// const rowOfBricks = (rowMaxWidth, brickWidthFunc = this.width) => {
//
// };


const rowOfBricks = (rowNum) => {
    let bricks = [];
    let i = 0;
    const x = () => bricks.length > 0 ? bricks[bricks.length-1].x + BRICK_WIDTH : 10;

    while (i < 9) {
        const brick = {
            key: (rowNum * 10) + i,
            x: x(),
            y: (rowNum * BRICK_HEIGHT) + BRICK_OFFSET,
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
    let bricks = [];
    let i = 1;
    while (i <= NUMBER_OF_ROWS) {
        bricks = [...bricks, ...rowOfBricks(i)];
        i++;
    }
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