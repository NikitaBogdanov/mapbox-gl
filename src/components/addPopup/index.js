import React, {useState} from 'react';
import { Input, Button } from '@material-ui/core';

function AddPopup({addInfo, onChange, onAdd, onCancel}) {
    const [isValid, setIsValid] = useState({
        title: true,
    });

    const handleOnAdd = () => {
        const checkValid = {
            title: addInfo.title.length
        };
        setIsValid(checkValid);
        if (checkValid.title) onAdd();
    };

    return (
        <div className="popup-bg">
            <div className="popup-container">
                <div className="popup-header">Add new point</div>
                <div className="input-container">
                    <span className="input-label">Title:</span>
                    <Input
                        onChange={(e) => onChange(e.target.value, "title")}
                        className="popup-title"
                    />
                    <span className="warning-message-text">{!isValid.title && "Title is required"}</span>
                </div>
                <div className="input-container">
                    <span className="input-label">Description:</span>
                    <Input
                        onChange={(e) => onChange(e.target.value, "description")}
                        className="popup-description"
                    />
                </div>
                <div className="popup-buttons-container">
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={handleOnAdd} variant="contained" color="primary">Add</Button>
                </div>
            </div>
        </div>
    );
}

export default AddPopup;
