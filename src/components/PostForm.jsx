import { useContext, useState } from 'react'
import tokenContext from '../context/tokenContext';
import { useNavigate } from 'react-router-dom';
import "./PostForm.css";

const PostForm = () => {
    const [message, setMessage] = useState('');
    const { token } = useContext(tokenContext);
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
        <div className='post-form'>
            
            <form onSubmit={fetchPost}>
                <textarea placeholder="Description" 
                    id="message" 
                    value={message} 
                    onChange={(event) => setMessage(event.target.value)}>
                </textarea>
                <button type='submite'>Post</button>
            </form>

        </div>

        </>
    )
};

export default PostForm;