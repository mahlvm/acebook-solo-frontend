import { useState, useContext } from "react";
import tokenContext from '../context/tokenContext';
import { PropTypes } from 'prop-types';


const CommentLike = ({commentId}) => {

    const [likesComment, setLikesComment] = useState(0);
    const [isLikedComment, setIsLikedComment] = useState(false);

    const { token } = useContext(tokenContext);

    const fetchLikeComment = async () => {
        const response = await fetch (`http://localhost:8080/comments/${commentId}/like`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({likesComment})
        });
        if (response.status === 200) {
            const data = await response.json();
            setLikesComment(data);
            setIsLikedComment(!isLikedComment);
            console.log("likedComment");
        } else {
            console.error("Failed to like post:", response.status);
        }
    }


    
    return (
    <div>
        <p  onClick={fetchLikeComment} >
        {isLikedComment ? (
            <p>❤️</p>
        ) : (
            <p>🤍</p>
        )}
        </p>
    </div>

        
    )
};

CommentLike.propTypes = {
    commentId: PropTypes.string.isRequired,
};

export default CommentLike;