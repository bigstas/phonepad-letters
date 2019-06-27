import React from 'react';
import { rows } from './utils';

function Keyrow(props) {
    return (
        <div className="keypad-row">
            {Object.keys(props.row).map(digit => {
                return <div className="keypad-key" 
                            key={digit} 
                            onClick={() => { props.handleClick(digit) }}>
                                <span className="key-digit">{digit}</span>
                                <span className="key-letters">{props.row[digit]}</span>
                        </div>
            })}
        </div>
    )
}

function Keypad(props) {
    return (
        <div id="keypad">
            {rows.map((row,index) => {
                return <Keyrow key={index} row={row} handleClick={props.handleClick} />
            })}
        </div>
    )
}

export default Keypad