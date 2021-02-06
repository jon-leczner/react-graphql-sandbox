import React from 'react'

const ToDo = (props) => {
    const { toDo } = props

    return (
        <div>
            <div>
                {toDo.id} -
                {toDo.description} -
                {toDo.priority} -
                {toDo.dueDate.toDateString()}
            </div>
        </div>
    )
}

export default ToDo
