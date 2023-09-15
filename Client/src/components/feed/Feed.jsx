import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { Posts } from "../../dummyData";
import { getTimelinePost } from "../../store/slices/PostSlice";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,  } from "react";

export default function Feed({username}) {

    const dispatch=useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;
  
    
    useEffect(()=>{
        dispatch(getTimelinePost(userId))

    },[dispatch,userId])


    
const posts = useSelector(state => state.post.posts);


    return (
<div className="feed">
<div className="feedWrapper">
<Share/>
</div>
   {posts && posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
</div>
    );
}
