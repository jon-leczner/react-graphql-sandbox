import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { cloneDeep } from 'lodash';

import ToDoTable from './ToDoTable';

export const FEED_QUERY = gql`
    query FeedQuery($take: Int, $skip: Int, $orderBy: ToDoOrderByInput) {
        feed(take: $take, skip: $skip, orderBy: $orderBy) {
            toDos {
                id
                createdAt
                description
                dueDate
                heuristicPriority
                priority
            }
        }
    }
`;

export const UPDATE_TODO_MUTATION = gql`
    mutation UpdateToDo($id: ID!, $input: ToDoInput!) {
        updateToDo(id: $id, input: $input) {
            id
            description
            dueDate
            priority
        }
    }
`;

const Feed = () => {
    const { loading, error, data } = useQuery(FEED_QUERY, {
        variables: {
            take: 100,
            skip: 0,
            orderBy: { createdAt: 'desc' },
        },
    });

    const [updateToDo] = useMutation(UPDATE_TODO_MUTATION);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {JSON.stringify(error)}</p>;
    }

    const mutableData = cloneDeep(data);

    return (
        <div style={{ width: '90%', padding: 25 }}>
            <ToDoTable toDos={mutableData.feed.toDos} updateToDo={updateToDo} />
        </div>
    );
};

export default Feed;
