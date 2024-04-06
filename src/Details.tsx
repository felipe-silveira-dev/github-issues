import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Markdown from "react-markdown";
import Comments from "./Comments";
 
dayjs.extend(relativeTime);


const Details = () => {
    const params = useParams();

    const {
      isLoading,
      isSuccess,
      data: issue,
    } = useQuery({
        queryKey: ['issue', params.id], 
        queryFn: fetchIssue,
        staleTime: 600000
    });
  
    function fetchIssue() {
      return fetch(
        `https://api.github.com/repos/facebook/create-react-app/issues/${params.id}`
      ).then(response => response.json());
    }

    console.log(issue);
    
    return (
        <div className="comments-container">
        {isLoading && <div>Loading...</div>}
        {isSuccess && (
          <>
            <h2>
              {issue.title} <span>#{issue.number}</span>
            </h2>
            <div className="issue-details">
              <a href={issue.user.html_url}>{issue.user.login}</a> opened this
              issue{' '}
              {dayjs(issue.created_at).fromNow()}
            </div>
          </>
        )}
  
        {isSuccess && (
          <div className="comment-container">
            <a href={issue.user.html_url}>
              <img src={issue.user.avatar_url} alt="avatar" className="avatar" />
            </a>
            <div className="comment">
              <div className="comment-heading">
                <a href={issue.user.html_url}>mdaj06</a> commented{' '}
                {
                    dayjs(issue.created_at).fromNow()
                }
              </div>
              <div className="comment-body markdown-body">
                <Markdown children={issue.body} />
              </div>
            </div>
          </div>
        )}
    
        <div className="border"></div>
        {isSuccess && <Comments issueNumber={issue?.number} />}
      </div>
    );
}

export default Details