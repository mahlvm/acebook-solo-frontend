import { useState, useContext } from 'react'
import tokenContext from '../context/tokenContext';
import { PropTypes } from 'prop-types';

const CommentForm = ({ postId }) => {
    const [comment, setComment] = useState('');
    const { token } = useContext(tokenContext);

    const sendComment = async () => {

        const response = await fetch(`http://localhost:8080/comments/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ comment })
        });
        const data = await response.json();
        console.log(data);
        setComment('');
    }


    return (
        <>
        <form onSubmit={sendComment}>
            <input type="text" 
                placeholder="Enter your comment" 
                value={comment} 
                onChange={(event) => setComment(event.target.value)} />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
};

export default CommentForm;