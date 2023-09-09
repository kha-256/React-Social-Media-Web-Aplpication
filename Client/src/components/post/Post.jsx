import "./Post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Users } from "../../dummyData";
import { useState } from "react";

export default function Post({post}) {

    const [like, setLike]=useState(post.like);
    const [isLiked, setIsLiked]=useState(false)

    const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
    console.log('these are', PF);

    const likeHandler=()=>{
        setLike(isLiked ? like-1: like+1)
        setIsLiked(!isLiked)
    }
    const user= Users.filter((u)=> u.id === post.userId)[0].username;
    console.log(user)
    return (
<div className="post">
<div className="postWrapper">

<div className="postTop">
    <div className="postTopLeft">
        <img className="postProfileImg" src={Users.filter((u)=> u.id === post.userId)[0].profilePicture} />
        <span className="postUserName">
            {Users.filter((u)=> u.id === post.userId)[0].username}
        </span>
        <span className="postDate">{post?.date}</span>
    </div>
    <div className="postTopRight">
        <MoreVertIcon/>
    </div>
</div>
<div className="postCenter">
    <span className="postText">{post.desc}</span>
    <img className="postImg" src={`${PF}${post.photo}`}  alt=""/>
</div>
<div className="postBottom">
    <div className="postBottomLeft">
    <img className="likeIcon" src={`${PF}like.png`} alt="" onClick={likeHandler}/>
    <img className="likeIcon" src={`${PF}heart.png`} alt="" onClick={likeHandler}/>
    <span className="postLikeCounter">{like} people like it</span>

    </div>
    <div className="postBottomRight">
    <span className="postCommentText">{post.comments} comments</span>

    </div>

</div>


</div>

</div>
    );
}
