import React from 'react';

import ToDo from './ToDo';

const Feed = () => {
    const toDos = [
        {
            id: 0,
            description: 'Something',
            priority: 'highest',
            dueDate: new Date(),
        },
        {
            id: 1,
            description: 'Something else',
            priority: 'high',
            dueDate: new Date(),
        },
    ];

    return (
        <div>
            {toDos.map((toDo) => (
                <ToDo key={toDo.id} toDo={toDo} />
            ))}
        </div>
    );
};

export default Feed;
