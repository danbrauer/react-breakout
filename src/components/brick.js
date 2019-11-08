import React from "react";
import {Rect} from "react-konva";
import Konva from "konva";

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const brickWidths = (totalRowWidth, minBrickWidth, maxBrickWidth ) => {
    let widths = [];
    let remainingWidth = totalRowWidth;
    while (remainingWidth >= minBrickWidth) {
        let newWidth;
        if (remainingWidth >= maxBrickWidth) {
            newWidth = randomNum(minBrickWidth, maxBrickWidth);
        } else {
            newWidth = randomNum(minBrickWidth, remainingWidth);
        }
        widths = [...widths, newWidth ];
        remainingWidth -= newWidth;
    }

    // for the remaining, just add it to a random brick in the row
    // it's an easy way to avoid having tiny bricks (smaller than the min)
    const idx = randomNum(0, widths.length-1);
    widths[idx] = widths[idx] + remainingWidth;

    return widths;
};

const rowOfBricks = (rowYCoord, totalRowWidth,
                     minBrickWidth, maxBrickWidth, bricksOffset, brickHeight,
                     widthsFunc = brickWidths ) => {

    const calculateBrickXCoord = () => {
        let newX = 10; // init value
        if (bricks.length > 0) {
            const priorBrick = bricks[bricks.length-1];
            newX = priorBrick.x + priorBrick.width;
        }
        return newX;
    };

    const widths = widthsFunc(totalRowWidth, minBrickWidth, maxBrickWidth);
    let bricks = [];
    let i = 0;
    while (i < widths.length) {
        const x = calculateBrickXCoord();
        const y = rowYCoord;
        const key = `${y}.${x}`; // key ought to be unique so concat y & x coords
        const brick = {
            key,
            x,
            y,
            width: widths[i],
            height: brickHeight,
            color: Konva.Util.getRandomColor()
        };
        bricks = [...bricks, brick];
        i++;
    }
    return bricks;
};

const bricksInitialize = () => {

    const MIN_WIDTH = 20;
    const MAX_WIDTH = 70;
    const TOTAL_ROW_WIDTH = 380;
    const BRICK_OFFSET = 20;
    const BRICK_HEIGHT = 10;
    const NUMBER_OF_ROWS = 4;

    let bricks = [];
    let i = 1;
    while (i <= NUMBER_OF_ROWS) {
        const rowYCoord = (i * BRICK_HEIGHT) + BRICK_OFFSET;
        bricks = [
            ...bricks,
            ...rowOfBricks(rowYCoord, TOTAL_ROW_WIDTH, MIN_WIDTH, MAX_WIDTH, BRICK_OFFSET, BRICK_HEIGHT)];
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
        shadowBlur={1}
    />);

export {
    Brick,
    bricksInitialize
}