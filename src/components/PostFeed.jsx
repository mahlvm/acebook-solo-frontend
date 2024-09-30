import { useEffect, useState, useContext } from "react";
import tokenContext from '../context/tokenContext';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import PostLike from "../components/PostLike";
import PostDelete from "./PostDelete";
import './PostFeed.css';



const PostFeed = () => {
    const [posts, setPosts] = useState([]);
    const { token } = useContext(tokenContext);
    // const avatarUrl = `http://127.0.0.1:8080${post.createdBy}`;



    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://127.0.0.1:8080/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPosts(data.posts); 
            } else {
                console.error("Failed to fetch posts:", response.status);
            }
        };

        fetchPosts();

    }, [token]); 







    return (
        <div>
    <h1>Post Feed</h1>
    <div className="posts-container">
        {posts.map(post => (

            <div className="post" key={post._id}>
                
                <div className="img-message-post">
                    <img src={`http://127.0.0.1:8080${post.avatar}`} alt="Avatar" />
                    <h1>{post.username}</h1>
                </div>
                
                <div className="post-content">
                    <h2>{post.message}</h2>
                    {post.image && <img src={post.image} alt="Post" />}
                    <PostDelete postId={post._id} createdBy={post.createdBy} />
                </div>

                <PostLike postId={post._id} />
            

                <div className="post-icon">
                    <CommentForm postId={post._id}/>  
                    <CommentList postId={post._id} />  
                </div>
            </div>
        ))}
    </div>
</div>

    );
};



export default PostFeed;