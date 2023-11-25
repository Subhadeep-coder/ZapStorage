import React from 'react';
import { ProgressBar as Progress } from 'react-bootstrap';

const ProgressBar = ({ percent }) => {
    return (
        <>
            {
                percent > 0 && percent < 100 && (
                    <div>
                        <Progress animated now={percent} label={`${percent}%`} />
                    </div>
                )
            }
        </>
    )
}

export default ProgressBar