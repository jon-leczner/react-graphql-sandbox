import React, { useState } from 'react';

const ActionButtons = ({ toggleEdit, save, node }) => {
    const [isEditEnabled, setIsEditEnabled] = useState(false);

    const handleToggleEdit = (event) => {
        setIsEditEnabled((isEditEnabled) => !isEditEnabled);
        toggleEdit(node, isEditEnabled);
    };

    const handleSave = (event) => {
        setIsEditEnabled(false);
        save(node);
    };

    return (
        <div>
            <button onClick={handleToggleEdit}>
                {isEditEnabled ? 'Cancel' : 'Edit'}
            </button>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default ActionButtons;
