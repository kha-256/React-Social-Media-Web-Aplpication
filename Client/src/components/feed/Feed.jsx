import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { getTimelinePost } from "../../store/slices/PostSlice";
import { getUser } from "../../store/slices/PostUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Feed({ username }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;
  
  const posts = useSelector(state => state.post.posts);
  const users = useSelector(state => state.postUser.postUser);

  useEffect(() => {
    dispatch(getTimelinePost(userId));
  }, [dispatch, userId]);
  
  useEffect(() => {
    posts && posts.forEach((post) => {
      dispatch(getUser(post.userId));
    });
  }, [dispatch, posts]);
  

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
      </div>
      {posts && posts.map((post) => (
        <Post key={post._id} post={post} user={users[post.userId]} />
      ))}
    </div>
  );
}
