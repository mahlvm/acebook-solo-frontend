import { useEffect, useState, useContext } from "react";
import tokenContext from '../context/tokenContext';
import { PropTypes } from 'prop-types';
import CommentLike from "./CommentLike";
import CommentDelete from "./CommentDelete";
import './CommentList.css';

const CommentList = ({postId}) => {

    const [comments, setComments] = useState([]);
    const { token } = useContext(tokenContext);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`http://localhost:8080/comments/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setComments(data.comments); 
            } else {
                console.error("Failed to fetch posts:", response.status);
            }
        };

        fetchComments();
    }, [token, postId]); 


    return (
        <div>
            <div className="comment-list-div">
            {comments.map(comment => (
                <div className="comment-list-each"key={comment._id}>
                    <div className="comment-owner">
                        <img src={`http://127.0.0.1:8080${comment.avatar}`} alt="Avatar"/>
                        <p>{comment.username} </p>
                    </div>
                    <div className="comment-message">
                        <p>{comment.message}</p>
                        <div>
                        <CommentDelete postId={comment._id} createdBy={comment.createdBy} />
                        </div>
                    </div>
                        <div className="comment-icons">
                        <CommentLike commentId={comment._id}/>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

CommentList.propTypes = {
    postId: PropTypes.string.isRequired,
    
};


export default CommentList;