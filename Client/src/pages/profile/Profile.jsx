import React from "react";
import "./profile.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";


export default function Profile() {

  const user = JSON.parse(localStorage.getItem('user'));
    const userName = user.username;
    console.log('userName : ', userName)

  const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
    return (
      <>
<Topbar/>
<div className="profile">
<Sidebar/>
<div className="profileRight">
<div className="profileRightTop">
<div className="profileCover">
<img className="profileCoverImg" src={`${PF}post/3.jpeg` }alt=""/>
 <img className="profileUserImg" src={`${PF}person/7.jpeg`} alt=""/>
</div>

<div className="profileInfo">
    <h4 className="profileInfoName">Khadija Noor Hashmi</h4>
    <span className="profileInfoDesc">Hello my friends!</span>

</div>

</div>
<div className="profileRightBottom">

{/*since we have differnt feed for profile and home page so we pass username in this feed  */}
<Feed username={userName}/>
<Rightbar profile/> {/* this profile is a prop which indicates this righbar is from profile page */}
</div>
</div>
</div>


      </>
    
    );
  }
  
  