import { useEffect, useState, useContext } from "react";
import tokenContext from '../context/tokenContext';
import { PropTypes } from 'prop-types';
import CommentLike from "./CommentLike";
import CommentDelete from "./CommentDelete";

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
            {comments.map(comment => (
                <div key={comment._id}>
                    <p>{comment.message}</p>
                    <CommentDelete postId={comment._id} createdBy={comment.createdBy} />
                    <CommentLike commentId={comment._id}/>
                </div>
            ))}
        </div>
    )
}

CommentList.propTypes = {
    postId: PropTypes.string.isRequired,
    
};


export default CommentList;