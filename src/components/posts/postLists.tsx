import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { fetchPosts, selectAllPosts } from "../../store/slices/postsSlice";
import { IPost } from "../../types/posts";
import Spinner from "../spinner/spinner";
import PostAuthor from "./postAuthor";
import ReactionButtons from "./reactionButtons";
import TimeAgo from "./timeAgo";

interface PostExcerptProps {
  post: IPost;
}

let PostExcerpt: FC<PostExcerptProps> = ({ post }) => {
  return (
    <>
      {post && (
        <article className="post-excerpt" key={post.id}>
          <h3>{post.title}</h3>
          <div>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
          </div>
          <p className="post-content">{post.content.substring(0, 100)}</p>
          <ReactionButtons post={post} />
          <Link to={`/posts/${post.id}`} className="button button__main">
            <div className="inner">View Post</div>
          </Link>
        </article>
      )}
    </>
  );
};

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const postStatus = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === "loading") {
    content = <Spinner />;
  } else if (postStatus === "succeeded") {
    const orderedPosts = [...posts].sort((a, b) => (b.date > a.date ? 1 : -1));
    content = orderedPosts.map((post) => <PostExcerpt key={post.id} post={post} />);
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
