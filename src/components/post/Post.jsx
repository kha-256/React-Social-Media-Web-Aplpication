import "./Post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Post() {
    return (
<div className="post">
<div className="postWrapper">

<div className="postTop">
    <div className="postTopLeft">
        <img className="postProfileImg" src="/assets/person/1.jpeg" />
        <span className="postUserName">Khadija Noor Hashmi</span>
        <span className="postDate">5 min ago</span>
    </div>
    <div className="postTopRight">
        <MoreVertIcon/>
    </div>
</div>
<div className="postCenter">
    <span className="postText">Hey It's my first post</span>
    <img className="postImg" src="/assets/post/1.jpeg" alt=""/>
</div>
<div className="postBottom">
    <div className="postBottomLeft">
    <img className="likeIcon" src="/assets/heart.png" alt=""/>
    <img className="likeIcon" src="/assets/like.png" alt=""/>
    <span className="postLikeCounter">32 people like it</span>

    </div>
    <div className="postBottomRight">
    <span className="postCommentText">8 commnets</span>

    </div>

</div>


</div>

</div>
    );
}
