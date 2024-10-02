import { useContext, useEffect, useState } from "react";
import tokenContext from '../context/tokenContext';
import { PropTypes } from 'prop-types';

const CommentDelete = ({ postId, createdBy }) => {
    const { token, userId } = useContext(tokenContext);
    const [isUser, setIsUser] = useState(false);

    
    useEffect(() => {
        if(createdBy === userId){
            setIsUser(true);
        } else{
            setIsUser(false);
        }
    }, [createdBy, userId]);  

    const fetchCommentDele = async () => {
        const response = await fetch(`http://127.0.0.1:8080/comments/${postId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        });

        if (response.status === 200) {
            window.location.reload();
            console.log("Comment deleted by:", userId);
        } else {
            console.error("Failed to delete post:", response.status);
        }
    };

    return (
        <div>
            {isUser && 
                <i className="bi bi-trash" onClick={fetchCommentDele} style={{ cursor: 'pointer', fontSize: '10px', color: '#A303A0' }}></i>
            }
        </div>
    );
};

CommentDelete.propTypes = {
    postId: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
};

export default CommentDelete;
