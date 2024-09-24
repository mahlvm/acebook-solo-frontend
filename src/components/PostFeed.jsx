
import { useEffect, useState, useContext } from "react";
import tokenContext from '../context/tokenContext';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';



const PostFeed = () => {
    const [posts, setPosts] = useState([]);
    const { token } = useContext(tokenContext);

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
            {posts.map(post => (
                <div key={post._id}>
                    <h2>{post.message}</h2>
                    {post.image && <img src={post.image} alt="Post" />}
                    <CommentForm postId={post._id}/>  
                    <CommentList postId={post._id} />  
                </div>
            ))}
        </div>
    );
};



export default PostFeed;