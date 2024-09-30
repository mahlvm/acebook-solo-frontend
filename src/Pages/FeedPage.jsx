import PostFeed from "../components/PostFeed";
import PostForm from "../components/PostForm";
import './FeedPage.css';
const FeedPage = () => {
    return (
        <div>
            <div className="feed-container">
                <div className="box-left">
                    <div className="navbar">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/profile">Profile</a></li>
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