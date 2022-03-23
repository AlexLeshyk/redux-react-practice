import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store";

const PostsList = () => {
  const posts = useSelector((state: RootState) => state.posts);

  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button button__main">
        <div className="inner">View Post</div>
      </Link>
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts.length === 0 && <div>No posts at all</div>}
      {renderedPosts}
    </section>
  );
};

export default PostsList;
