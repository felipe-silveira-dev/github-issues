import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import IconOpen from "./IconOpen";
import IconClosed from "./IconClosed";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
 
dayjs.extend(relativeTime);

type Issue = {
    number: number;
    title: string;
    state: string;
    created_at: string;
    user: {
        login: string;
    };
    comments: number;
};

const Issues = () => {
    const [filter, setFilter] = useState('open');
    const {
        isLoading,
        isSuccess,
        data: issues,
      } = useQuery({
        queryKey: ['issues', filter],
        queryFn: fetchIssues,
        staleTime: 600000
      });

      const { isSuccess: isSuccessIssuesOpen, data: issuesOpen } = useQuery({
        queryKey: ['issuesOpen'],
        queryFn: fetchIssuesOpen,
        staleTime: 600000
      });
    
      const { isSuccess: isSuccessIssuesClosed, data: issuesClosed } = useQuery({
        queryKey: ['issuesClosed'],
        queryFn: fetchIssuesClosed,
        staleTime: 600000,
      });
    
      function fetchIssues() {
        return fetch(
          `https://api.github.com/repos/facebook/create-react-app/issues?per_page=10`
        ).then(response => response.json());
      }
    
      function fetchIssuesOpen() {
        return fetch(
          `https://api.github.com/search/issues?q=repo:facebook/create-react-app+type:issue+state:open&per_page=1`
        ).then(response => response.json());
      }
    
      function fetchIssuesClosed() {
        return fetch(
          `https://api.github.com/search/issues?q=repo:facebook/create-react-app+type:issue+state:closed&per_page=1`
        ).then(response => response.json());
      }
      
  return (
    <div>
      {isLoading && <div>Loading...</div>}

      {isSuccess && (
        <div className="issues-container">
          <div className="issues-heading">
            <a href="#">facebook / create-react-app</a>
            <div className="open-closed-buttons">
              <button onClick={() => setFilter('open')}>
                <IconOpen />
                <span className={filter === 'open' ? 'font-bold' : ''}>
                  {isSuccessIssuesOpen && (
                    <span>{issuesOpen.total_count} Open</span>
                  )}
                </span>
              </button>
              <button onClick={() => setFilter('closed')}>
                <IconClosed />
                <span className={filter === 'closed' ? 'font-bold' : ''}>
                  {isSuccessIssuesClosed && (
                    <span>{issuesClosed.total_count} Closed</span>
                  )}
                </span>
              </button>
            </div>
          </div>
          <div className="issues-table">
            {issues.map((issue: Issue) => (
              <div key={issue.number} className="issues-entry">
                <div className="issues-entry-title-container">
                  {issue.state === 'open' && <IconOpen />}
                  {issue.state === 'closed' && <IconClosed />}
                  <div className="issues-title">
                  <a href={`/issues/${issue.number}`}>{issue.title}</a>
                    <div className="issues-title-details">
                      #{issue.number} opened{' '}
                      {
                        dayjs(issue.created_at).fromNow()
                      }{' '}
                      by {issue.user.login}
                    </div>
                  </div>
                </div>
                {issue.comments > 0 && (
                  <a href={`/issues/${issue.number}`} className="comments-count-container">
                    
                    <svg
                      className="octicon octicon-comment v-align-middle"
                      viewBox="0 0 16 16"
                      version="1.1"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.75 2.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25H2.75zM1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0113.25 12H9.06l-2.573 2.573A1.457 1.457 0 014 13.543V12H2.75A1.75 1.75 0 011 10.25v-7.5z"
                      ></path>
                    </svg>
                    <div className="comments-count">{issue.comments}</div>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Issues