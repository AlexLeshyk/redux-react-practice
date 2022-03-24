import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { PostAuthor } from "./postAuthor";
import ReactionButtons from "./reactionButtons";
import TimeAgo from "./timeAgo";

const PostsList = () => {
  const posts = useSelector((state: RootState) => state.posts);
  const orderedPosts = [...posts].sort((a, b) => (b.date > a.date ? 1 : -1));

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>orderedPosts
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
      <div>
        <ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} className="button button__main">
          <div className="inner">View Post</div>
        </Link>
      </div>
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts.length ? renderedPosts : <div>No posts at all</div>}
    </section>
  );
};

export default PostsList;
