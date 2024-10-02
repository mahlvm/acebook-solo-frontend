import { useContext, useEffect, useState } from "react";
import tokenContext from '../context/tokenContext';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import PostLike from "../components/PostLike";
import PostDelete from "./PostDelete";
import './PostByUser.css';

const PostByUser = () => {
    const [postsByUser, setPostsByUser] = useState([]);
    const { token, userId } = useContext(tokenContext);


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`http://127.0.0.1:8080/posts/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPostsByUser(data.posts);
            } else {
                console.error("Failed to fetch posts:", response.status);
            }
        };

        if (userId) {
            fetchPosts();
        }
    }, [token, userId]);

    return (
    <div>

        <div className="post-feed-header">
            <h1>Post Feed</h1>
        </div>
        <div className="postsByUser-container">
            {postsByUser.map(postByUser => (
                <div className="postByUser" key={postByUser._id}>
                    
                    <div className="img-message-postByUser">
                        <img src={`http://127.0.0.1:8080${postByUser.avatar}`} alt="Avatar" />
                        <h1>{postByUser.username}</h1>
                    </div>
                    
                    <div className="postByUser-content">
                        <h2>{postByUser.message}</h2>
                        {postByUser.image && <img src={postByUser.image} alt="Post" />}
                    </div>
    
                    <div className="postByUser-likes">
                        <PostDelete postId={postByUser._id} createdBy={postByUser.createdBy} />
                        <PostLike postId={postByUser._id} />
                    </div>
    
                    <div className="postByUser-icon">
                        <CommentForm postId={postByUser._id} />  
                        <CommentList postId={postByUser._id} />  
                    </div>
                </div>
            ))}

        </div>
    </div>
    

    );
};

export default PostByUser;
