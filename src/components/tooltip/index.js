import React from 'react';

function Tooltip({title, description}) {
    return (
        <div className="tooltip-container">
            <div className="tooltip-title">{title}</div>
            {description.length > 0 && <div className="tooltip-description">{description}</div>}
        </div>
    );
}

export default Tooltip;
