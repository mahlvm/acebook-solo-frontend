import { useState, useContext } from "react";
import tokenContext from '../context/tokenContext';
import { PropTypes } from 'prop-types';

import 'bootstrap-icons/font/bootstrap-icons.css';


const PostLike = ({postId}) => {

    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    // const [totalLikes, setTotalLikes] = useState(0);

    const { token } = useContext(tokenContext);

    const fetchLikePost = async () => {
        const response = await fetch (`http://127.0.0.1:8080/posts/${postId}/like`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({likes})
        });
        if (response.status === 200) {
            const data = await response.json();
            setLikes(data);
            setIsLiked(!isLiked);
            console.log("likedPost");
        } else {
            console.error("Failed to like post:", response.status);
        }
        // fetchTotalLikes();

    }

    // const fetchTotalLikes = async () => {
    //     const response = await fetch (`http://127.0.0.1:8080/posts/${postId}/likes`, {
    //         method: "GEt",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "Authorization": `Bearer ${token}`
    //         },
    //     });
    //     if (response.status === 200) {
    //         const data = await response.json();
    //         setTotalLikes(data.likes);
    //         console.log(totalLikes);
    //     } else {
    //         console.error("Failed to like post:", response.status);
    //     }
    // }



    
    return (
    <div>
        <p  onClick={fetchLikePost} >
        {isLiked ? (
            <i className="bi bi-heart-fill" style={{ cursor: 'pointer', fontSize: '15px', color: '#A303A0' }}></i>
        ) : (
            <i className="bi bi-heart" style={{ cursor: 'pointer', fontSize: '15px', color: '#A303A0' }}></i>
        )}
        </p>

    </div>

        
    )
};

PostLike.propTypes = {
    postId: PropTypes.string.isRequired,
};

export default PostLike;