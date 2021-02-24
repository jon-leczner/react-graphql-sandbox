import React, { useEffect, useState } from 'react';

const ActionButtons = ({ toggleEdit, save, deleteToDo, node, api }) => {
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(false);

    useEffect(() => {
        api.addEventListener('rowEditingStarted', onEditStart);
        api.addEventListener('rowEditingStopped', onEditStop);

        return () => {
            api.removeEventListener('rowEditingStarted', onEditStart);
            api.removeEventListener('rowEditingStopped', onEditStop);
        };
    });

    const onEditStart = (params) => {
        if (params.node === node) {
            setIsEditEnabled(true);
        } else {
            setAreButtonsDisabled(true);
        }
    };

    const onEditStop = (params) => {
        if (params.node === node) {
            if (!node.data.description) {
                api.applyTransaction({ remove: [node] });
            } else {
                setIsEditEnabled(false);
            }
        } else {
            setAreButtonsDisabled(false);
        }
    };

    const handleToggleEdit = (event) => {
        setIsEditEnabled((isEditEnabled) => !isEditEnabled);
        toggleEdit(node, isEditEnabled);
    };

    const handleSave = (event) => {
        setIsEditEnabled(false);
        save(node);
    };

    const handleDelete = (event) => {
        setIsEditEnabled(false);
        deleteToDo(node);
    };

    return (
        <div className="action-buttons-container">
            <button onClick={handleToggleEdit} disabled={areButtonsDisabled}>
                {isEditEnabled ? 'Cancel' : 'Edit'}
            </button>
            {isEditEnabled ? (
                <button onClick={handleSave} disabled={areButtonsDisabled}>
                    Save
                </button>
            ) : null}
            <button onClick={handleDelete} disabled={areButtonsDisabled}>
                Delete
            </button>
        </div>
    );
};

export default ActionButtons;
