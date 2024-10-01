import PostFeed from "../components/PostFeed";
import PostForm from "../components/PostForm";
import './FeedPage.css';
import tokenContext from '../context/tokenContext'
import { useContext } from 'react'

const FeedPage = () => {
    const {logout} = useContext(tokenContext);

    return (
        <div>
            <div className="feed-container">
                <div className="box-left">
                    <div className="navbar">
                        <h1>Acebook</h1>
                        <ul>
                            <div className="li-icon">
                                <i className="bi bi-house-fill"></i>
                                <li><a href="/feed">Feed</a></li>
                            </div>
                            
                            <div className="li-icon">
                                <i className="bi bi-person-fill"></i>
                                <li><a href="/profile">Profile</a></li>
                            </div>

                            <div className="li-icon">
                                <i className="bi bi-gear-fill"></i>
                                <li><a href="/profile">Settings</a></li>
                            </div>

                    
                            <div className="li-icon">
                                <i className="bi bi-door-open-fill"></i>
                                <li><a onClick={logout}href="/">Logout</a></li>
                            </div>
                            
                        </ul>
                    </div>
                </div>
                
                <div className="box-right">
                    <div className="post-form-feed">
                        <PostForm />
                    </div>

                    <div className="post-feed">
                        <PostFeed />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default FeedPage;