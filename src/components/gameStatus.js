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
                top: 10,
                left: 410,
                width: '25%',
            }} >
                <tr>
                    <th colSpan={5}>
                        <i>breakout</i>
                    </th>
                </tr>
                <tr>
                    <td colSpan={1}>
                        game restarts
                    </td>
                    <td colSpan={1}>
                        {props.gameRestarts}
                    </td>
                    <td colSpan={3} />
                </tr>
                <tr>
                    <td colSpan={1}>
                        bricks broken
                    </td>
                    <td colSpan={1}>
                        {props.bricksBroken}
                    </td>
                    <td colSpan={3} />
                </tr>
                <tr>
                    <th colSpan={5}>
                        <p/>
                    </th>
                </tr>
                <tr>
                    <th colSpan={5}>
                        <i>about this page</i>
                    </th>
                </tr>
                <tr>
                    <td colSpan={5}>
                        <p>As a small, personal challenge, I wanted to build a web app in <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer"> React</a>.  I spend most of my time on back-end work, and what front-end experience I do have is old and mostly not browser-based, so I was starting almost from scratch.</p>
                        <p>I chose to build a version of <a href="https://en.wikipedia.org/wiki/Breakout_(video_game)" target="_blank" rel="noopener noreferrer">Breakout</a> because I hazily remembered doing this a long time ago in <a href="https://en.wikipedia.org/wiki/Swing_(Java)" target="_blank" rel="noopener noreferrer">Java Swing</a>, and that it was a good exercise.</p> 
                        <p>The source code, plus more technical details, are on <a href="https://github.com/danbrauer/react-breakout" target="_blank" rel="noopener noreferrer">Github</a>.</p>
                    </td>
                </tr>
            </table>
        </Portal>
    );
};

export {
    Status
}