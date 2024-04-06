import React from 'react'
import Markdown from 'react-markdown';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useQuery } from '@tanstack/react-query';

dayjs.extend(relativeTime);

type Comment = {
    id: number;
    user: {
        login: string;
        html_url: string;
        avatar_url: string;
    };
    created_at: string;
    body: string;
};


const Comments = ({ issueNumber }: { issueNumber: number }) => {
    const {
        isLoading,
        isSuccess,
        data: comments,
    } = useQuery({
        queryKey: ['comments', issueNumber],
        queryFn: fetchComments,
        staleTime: 600000 * 10,
    });

    function fetchComments() {
        return fetch(
            `https://api.github.com/repos/facebook/create-react-app/issues/${issueNumber}/comments`
        ).then(response => response.json());
    }
    return (
        <>
            {isLoading && <div>Loading...</div>}
            {isSuccess && (
                <>
                    {comments?.map((comment: Comment) => (
                        <div key={comment?.id} className="comment-container">
                            <a href={comment.user.html_url}>
                                <img
                                    src={comment.user.avatar_url}
                                    alt="avatar"
                                    className="avatar"
                                />
                            </a>
                            <div className="comment">
                                <div className="comment-heading">
                                    <a href={comment.user.html_url}>{comment.user.login}</a>{' '}
                                    commented{' '}
                                    {
                                        dayjs(comment.created_at).fromNow()
                                    }
                                </div>
                                <div className="comment-body markdown-body">
                                    <Markdown children={comment.body} />
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default Comments