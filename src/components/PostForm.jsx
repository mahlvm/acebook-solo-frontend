import { useContext, useState } from 'react'
import tokenContext from '../context/tokenContext';
import { useNavigate } from 'react-router-dom';
import "./PostForm.css";

const PostForm = () => {
    const [message, setMessage] = useState('');
    const { token, avatar } = useContext(tokenContext);
    const navigate = useNavigate();

    const fetchPost = async () => {
        const response = await fetch('http://127.0.0.1:8080/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        console.log(data);

        if (response.status === 201) {
            console.log('Post created successfully');
            setMessage('');
        } else {
            console.log('Failed to create post');
            alert("Failed to create post, try login again");
            navigate('/login');
        }
    }

    return (
        <>
        <div className='post-container'>
            
            <div className='post-form-div'>
                <form className='post-form'onSubmit={fetchPost}>
                <div className='post-avatar-textarea'>
                    <img src={`http://127.0.0.1:8080${avatar}`} alt="Avatar" />
                    <textarea placeholder="What are you thinking?" 
                        className='post-textarea'
                        id="message" 
                        value={message} 
                        onChange={(event) => setMessage(event.target.value)}>
                    </textarea>
                </div>
                <div className='post-button-div'>
                    <button className="post-button" type='submite'>Send</button>
                </div>
                
            </form>

            </div>
            

        </div>

        </>
    )
};

export default PostForm;