import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

const Feed = () => {
    const { loading, error, data } = useQuery(FEED_QUERY, {
        variables: {
            take: 100,
            skip: 0,
            orderBy: { createdAt: 'desc' },
        },
    });

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {JSON.stringify(error)}</p>;
    }

    return (
        <div style={{ width: '90%', padding: 25 }}>
            <ToDoTable toDos={data.feed.toDos} />
        </div>
    );
};

export default Feed;
