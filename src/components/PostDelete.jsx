import { useContext, useEffect, useState } from "react";
import tokenContext from '../context/tokenContext';
import { PropTypes } from 'prop-types';
import 'bootstrap-icons/font/bootstrap-icons.css';


const PostDelete = ({ postId, createdBy }) => {
    const { token, userId } = useContext(tokenContext);
    const [isUser, setIsUser] = useState(false);

    
    useEffect(() => {
        if(createdBy === userId){
            setIsUser(true);
        } else{
            setIsUser(false);
        }
    }, [createdBy, userId]);  

    const fetchPostDele = async () => {
        const response = await fetch(`http://127.0.0.1:8080/posts/${postId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        });

        if (response.status === 200) {
            window.location.reload();
            console.log("Post deleted by:", userId);
        } else {
            console.error("Failed to delete post:", response.status);
        }
    };

    return (
        <div>
    <div className="post-delete">
        {isUser && (
            <i className="bi bi-trash" onClick={fetchPostDele} style={{ cursor: 'pointer', fontSize: '15px', color: '#A303A0' }}></i>
        )}
    </div>
</div>

    );
};

PostDelete.propTypes = {
    postId: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
};

export default PostDelete;
