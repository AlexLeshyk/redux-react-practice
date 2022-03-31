import { FC } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { selectPostById } from "../../store/slices/postsSlice";
import { PostAuthor } from "../posts/postAuthor";
import ReactionButtons from "../posts/reactionButtons";
import TimeAgo from "../posts/timeAgo";

const SinglePostPage: FC = () => {
  const match = useParams();
  const { postId = "" } = match;

  const post = useSelector((state: RootState) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <div>
          <ReactionButtons post={post} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to={`/editPost/${post.id}`} className="button button__main">
              <div className="inner">Edit Post</div>
            </Link>
            <Link to={`/posts`}>back to posts!</Link>
          </div>
        </div>
      </article>
    </section>
  );
};

export default SinglePostPage;
