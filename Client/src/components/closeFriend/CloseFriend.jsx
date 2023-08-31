import "./closeFriend.css";



export default function CloseFriend({user}) {
    return (
    <li className="sidebarFriendListItems">
<img className="sidebarFriendImg" src={user.profilePicture} alt="friend Image"/>
<span className="sidebarFriendName">{user.username}</span>

</li>
   
    );
}
