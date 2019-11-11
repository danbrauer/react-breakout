import React from "react";
import { Circle } from "react-konva";

const ballInvertYDirectionOnPaddleHit = (
    ballX, ballY, deltaY,
    paddleLeft, paddleRight, paddleTop, paddleBottom
) => {
    let newDeltaY = deltaY;
    if (ballX >= paddleLeft && ballX <= paddleRight && ballY >= paddleBottom && ballY <= paddleTop ) {
        newDeltaY = -deltaY;
    }
    return newDeltaY;
};

const ballNewCoord = (val, delta, max, min) => {
    let newVal = val + delta;
    let newDelta = delta;

    if (newVal > max || newVal < min) {
        newDelta = -delta;
    }

    if (newVal < min) {
        newVal = newVal + (min - newVal);
    }

    if (newVal > max) {
        newVal = newVal - (newVal - max);
    }

    return { val: newVal, delta: newDelta };
};

const updateBallLocation = ({ballDirection, ballXCoord, ballYCoord, paddleX, paddleY},
                         paddleWidth, paddleHeight,
                         ballMaxX, ballMinX, ballMaxY, ballMinY) => {

    const newYDir = ballInvertYDirectionOnPaddleHit(
        ballXCoord, ballYCoord, ballDirection.y,
        paddleX, (paddleX + paddleWidth),
        (paddleY + paddleHeight), paddleY
    );

    const newX = ballNewCoord(ballXCoord, ballDirection.x, ballMaxX, ballMinX);
    const newY = ballNewCoord(ballYCoord, newYDir, ballMaxY, ballMinY);

    return {
        ballDirection: {
            x: newX.delta,
            y: newY.delta
        },
        ballXCoord: newX.val,
        ballYCoord: newY.val
    };
};

const Ball = (props) => {
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

export {
    Ball,
    updateBallLocation,
};