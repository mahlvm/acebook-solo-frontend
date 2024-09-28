import { useContext, useEffect, useState } from "react";
import tokenContext from '../context/tokenContext';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import PostLike from "../components/PostLike";
import PostDelete from "./PostDelete";

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
            <h1>Post Feed</h1>
            {postsByUser.map(postByUser => (
                <div key={postByUser._id}>
                    <h2>{postByUser.message}</h2>
                    {postByUser.image && <img src={postByUser.image} alt="Post" />}
                    <PostDelete postId={postByUser._id} createdBy={postByUser.createdBy} />
                    <PostLike postId={postByUser._id} />
                    <CommentForm postId={postByUser._id} />
                    <CommentList postId={postByUser._id} />
                </div>
            ))}
        </div>
    );
};

export default PostByUser;
