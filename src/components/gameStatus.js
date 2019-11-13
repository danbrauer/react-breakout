import React from "react";
import Portal from './portal';

// I acknowledge that the layout and "styling" here
// might cause pain to people who actually know how to
// work on the front-end.

const Status = (props) => {
    return (
        <Portal>
            <table style={{
                position: 'absolute',
                top: 410,
                left: 5,
                width: '395px'
            }}>
                <tr>
                    <td >game restarts</td>
                    <td >{props.gameRestarts}</td>
                    <td >bricks broken</td>
                    <td >{props.bricksBroken}</td>
                </tr>
                <tr />
                <tr>
                    <th colSpan='4'><i>about this page</i></th>
                </tr>
                <tr>
                    <td colSpan='4'>
                        As a small, personal challenge, I wanted to build a web app in <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer"> React</a>.  I spend most of my time on back-end work, and what front-end experience I do have is old and mostly not browser-based, so I was starting almost from scratch.
                        <br/><br/>
                        The source code, plus some background and technical details, are on <a href="https://github.com/danbrauer/react-breakout" target="_blank" rel="noopener noreferrer">Github</a>.
                    </td>
                </tr>
            </table>
        </Portal>
    );
};

export {
    Status
}