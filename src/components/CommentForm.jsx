import { useState, useContext } from 'react'
import tokenContext from '../context/tokenContext';
import { PropTypes } from 'prop-types';
import './CommentForm.css';

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
        <div className='comment-form-box'>
            <form className="comment-form" onSubmit={sendComment}>
                <input 
                    className='comment-input'
                    type="text" 
                    placeholder="What do you think?" 
                    value={comment} 
                    onChange={(event) => setComment(event.target.value)} />
                <div className='comment-button-div'>
                    <button type="submit"><i className="bi bi-arrow-right-square-fill"></i></button>
                </div>
                
            </form>
        </div>
        </>
    )
}

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
};

export default CommentForm;