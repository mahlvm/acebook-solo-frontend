import { useContext } from 'react';
import tokenContext from '../context/tokenContext';
import ProfileUpdate from '../components/ProfileUpdate';
import PostByUser from '../components/PostByUser';
import FriendsByUser from '../components/FriendsByUser';
import './ProfilePage.css';
import capa from '../assets/capa.svg';

const ProfilePage = () => {
    const { username, email, avatar, logout } = useContext(tokenContext); 
    const avatarUrl = `http://127.0.0.1:8080${avatar}`; // Avatar vem com o caminho "/uploads/filename.jpeg"


    return (
        <div className='div-profile'>
            <div className='profile-container-profile'> 

                <div className="box-left-profile">
                    <div className="navbar-profile">
                        <h1>Acebook</h1>
                        <ul>
                            <div className="li-icon-profile">
                                <i className="bi bi-house-fill"></i>
                                <li><a href="/feed">Feed</a></li>
                            </div>
                            
                            <div className="li-icon-profile">
                                <i className="bi bi-person-fill"></i>
                                <li><a href="/profile">Profile</a></li>
                            </div>

                            <div className="li-icon-profile">
                                <i className="bi bi-gear-fill"></i>
                                <li><a href="/profile">Settings</a></li>
                            </div>

                    
                            <div className="li-icon-profile">
                                <i className="bi bi-door-open-fill"></i>
                                <li><a onClick={logout}href="/">Logout</a></li>
                            </div>
                            
                        </ul>
                    </div>
                </div>

                <div className="box-right-profile"> 

                    <div className='capa'>
                        <img src={capa} alt="capa profile" />
                        <img 
                            src={avatarUrl} 
                            alt="Avatar"
                            onError={(e) => {
                                e.target.onerror = null;
                                console.error("Failed to load avatar image");
                            }}
                            className='avatar'
                        />
                    </div>

                    <div className='profile-user'>
                        <div className='profile-data'>
                            <p className='profile-username'>{username}</p>
                            <div className='profile-email-div'>
                                <i className="bi bi-envelope-fill"></i>
                                <p className='profile-email'>{email}</p>
                            </div>    
                        </div>

                        <div className='profile-update'>
                            <ProfileUpdate />
                        </div>
                    </div>

                    <div className='feed-profile-div'>
                        <div className='feed-profile-friends'>
                            <FriendsByUser />
                        </div>
                        <div className='feed-profile-posts'>
                            post
                            <PostByUser/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
