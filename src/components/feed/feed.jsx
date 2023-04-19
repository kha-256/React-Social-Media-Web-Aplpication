import "./feed.css";
import Share from "../share/share";
import Post from "../post/Post";

export default function Feed() {
    return (
<div className="feed">
<div className="feedWrapper">
<Share/>
<Post/>
<Post/>
<Post/>
<Post/>
<Post/>
<Post/>
</div>
    
</div>
    );
}
