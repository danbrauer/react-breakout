import React from "react";
import Portal from './portal';

const Status = (props) => {
    return (
        <Portal>
            <table style={{
                position: 'absolute',
                top: 10,
                left: 410,
            }} >
                <tr>
                    <th colSpan={2}>
                        Status
                    </th>
                </tr>
                <tr>
                    <td>
                        game restarts
                    </td>
                    <td>
                        {props.gameRestarts}
                    </td>
                </tr>
                <tr>
                    <td>
                        bricks broken
                    </td>
                    <td>
                        {props.bricksBroken}
                    </td>
                </tr>
            </table>
        </Portal>
    );
};

export {
    Status
}