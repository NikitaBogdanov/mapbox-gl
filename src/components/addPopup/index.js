import React from 'react';

function AddPopup({onChange, onAdd}) {
    return (
        <div className="popup-bg">
            <div className="popup-container">
                <input
                    onChange={(e) => onChange(e.target.value, "title")}
                    className="popup-title"
                />
                <input
                    onChange={(e) => onChange(e.target.value, "description")}
                    className="popup-description"
                />
                <button onClick={onAdd}>Add</button>
            </div>
        </div>
    );
}

export default AddPopup;
