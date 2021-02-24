import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { cloneDeep } from 'lodash';

import ToDoTable from './ToDoTable';

import './Feed.css';

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

export const CREATE_TODO_MUTATION = gql`
    mutation CreateToDo($id: ID!, $input: ToDoInput!) {
        createToDo(id: $id, input: $input) {
            id
            description
            dueDate
            priority
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

export const DELETE_TODO_MUTATION = gql`
    mutation DeleteToDo($id: ID!) {
        deleteToDo(id: $id) {
            id
        }
    }
`;

const Feed = () => {
    const { loading, error, data, refetch } = useQuery(FEED_QUERY, {
        variables: {
            take: 100,
            skip: 0,
            orderBy: { createdAt: 'desc' },
        },
    });

    const [createToDo] = useMutation(CREATE_TODO_MUTATION);
    const [updateToDo] = useMutation(UPDATE_TODO_MUTATION);
    const [deleteToDo] = useMutation(DELETE_TODO_MUTATION);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {JSON.stringify(error)}</p>;
    }

    const mutableData = cloneDeep(data);

    return (
        <div className="feed-container">
            <ToDoTable
                toDos={mutableData.feed.toDos}
                createToDo={createToDo}
                updateToDo={updateToDo}
                deleteToDo={deleteToDo}
                refreshToDos={() => refetch()}
            />
        </div>
    );
};

export default Feed;
