import "./Post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch,useSelector } from "react-redux";
import { getUser } from "../../store/slices/PostUser";
import { useEffect,  } from "react";
import { useState } from "react";
import {format} from "timeago.js"

export default function Post({post,user}) {

    const [like, setLike]=useState(post.like);
    const [isLiked, setIsLiked]=useState(false)

    
    
 {/*
    // Get the user data from the Redux store
  const user = useSelector(state => state.postUser.postUser[post.userId]);

  useEffect(() => {
    // Dispatch the getUser action when the component mounts
    dispatch(getUser(post.userId));
  }, [dispatch, post.userId]);
  
    console.log("postUser ",user);
*/}

    const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

    const likeHandler=()=>{
        setLike(isLiked ? like-1: like+1)
        setIsLiked(!isLiked)
    }

   


   // const user= Users.filter((u)=> u.id === post.userId)[0].username;
   // console.log(user)
    return (
<div className="post">
{user&&
<div className="postWrapper">

<div className="postTop">
    <div className="postTopLeft">
       <img className="postProfileImg" src={user.profilePicture || PF+"person/Default_Profile_Picture.jpg"} /> 
        <span className="postUserName"> {user.username} </span>
        <span className="postDate">{format(post.createdAt)}</span>
    </div>
    <div className="postTopRight">
        <MoreVertIcon/>
    </div>
</div>
<div className="postCenter">
    <span className="postText">{post.desc}</span>
    <img className="postImg" src={`${PF}${post.img}`}  alt=""/>
</div>
<div className="postBottom">
    <div className="postBottomLeft">
    <img className="likeIcon" src={`${PF}like.png`} alt="" onClick={likeHandler}/>
    <img className="likeIcon" src={`${PF}heart.png`} alt="" onClick={likeHandler}/>
    <span className="postLikeCounter">{post.likes.length} people like it</span>

    </div>
    <div className="postBottomRight">
    <span className="postCommentText">{post.comments} comments</span>

    </div>

</div>


</div>

}

</div>
    );
}
