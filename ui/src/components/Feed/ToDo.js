import React from 'react';

import './ToDo.css';

const ToDo = (props) => {
    const { toDo } = props;

    return (
        <div className="toDo">
            {toDo.description} - {toDo.priority} - {toDo.dueDate.toISOString()}
        </div>
    );
};

export default ToDo;
